import Card from "@mui/material/Card";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";
import Header from "layouts/profile/components/Header";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Button } from "@mui/material";  // Unified Button import
import { Modal, Form,ListGroup  } from 'react-bootstrap';
import styled from "styled-components";  // Import styled from styled-components
import { setModelStatus } from "shared/slice/Model/ModelSlice";

// Sample background image URL
const bgImage =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/profile-layout-header.jpg";

// Inside the Files component
function Files() {
  const dispatch = useDispatch();

  // Define modal states
  const [modalAddFile, setModalAddFile] = useState(false);
  const [modalUpdateFile, setModalUpdateFile] = useState(false);
  const [modalViewFile, setModalViewFile] = useState(false);  // Modal for viewing full file details

  // Define form data
  const [formData, setFormData] = useState([
    {
      name: "files Oussama",
      Status: "Ajouter les documentation nécessaire",
      Client: "Harrag Oussama",
      NbSession: "3",
      Session: [
        { _id: "0000000001", Service: "Strategic Business Planning", idService: "1000000002" },
        { _id: "0000000002", Service: "Strategic Business Planning", idService: "1000000002" },
        { _id: "0000000003", Service: "Digital Transformation Consulting", idService: "1000000003" },
      ],
      Document: [
        { name: "cin", lien: "cin.pdf" },
        { name: "passport", lien: "passport.pdf" },
      ],
    },
    {
      name: "files chikh ",
      Status: "Sbn",
      Client: "Aymen ben yedder",
      NbSession: "1",
      Session: [
        { _id: "0000000011", Service: "Digital Transformation Consulting", idService: "1000000005 " },
      ],
      Document: [
        { name: "cin", lien: "cin.pdf" },
        { name: "passport", lien: "passport.pdf" },
      ],
    },
  ]);

  // Define search query state
  const [searchQuery, setSearchQuery] = useState("");

  // Filter rows based on search query
  const filteredData = formData.filter(file =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    file.Status.toLowerCase().includes(searchQuery.toLowerCase()) ||
    file.Client.toLowerCase().includes(searchQuery.toLowerCase()) ||
    file.NbSession.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Define columns for table
  const columns = [
    { name: "name", align: "left" },
    { name: "Status", align: "center" },
    { name: "Client", align: "center" },
    { name: "NbSession", align: "center" },
    { name: "action", align: "center" },
  ];

  // Map the filtered data for table rows
  const rows = filteredData.map((file, index) => ({
    name: (
      <ArgonTypography variant="button" fontWeight="medium">
        {file.name}
      </ArgonTypography>
    ),
    Status: (
      <ArgonTypography variant="caption" color="text" fontWeight="medium">
        {file.Status}
      </ArgonTypography>
    ),
    Client: (
      <ArgonTypography variant="caption" color="text" fontWeight="medium">
        {file.Client}
      </ArgonTypography>
    ),
    NbSession: (
      <ArgonTypography variant="caption" color="text" fontWeight="medium">
        {file.NbSession}
      </ArgonTypography>
    ),
    action: (
      <>
        <Tooltip title="Edit File" placement="top" onClick={() => handleEdit(file)}>
          <Icon style={{ fontSize: "1.5rem", cursor: "pointer", color: "#0056b3" }}>edit</Icon>
        </Tooltip>
        <Tooltip title="View Details" placement="top" onClick={() => handleView(file)}>
          <Icon style={{ fontSize: "1.5rem", cursor: "pointer", color: "#28a745", marginLeft: "10px" }}>visibility</Icon>
        </Tooltip>
      </>
    ),
  }));

  // Function to handle adding a new file (open modal)
  const handleAdd = () => {
    dispatch(setModelStatus({ modelOpen: true }));

    setModalAddFile(true);
  };

  // Function to handle editing an existing file (open modal)
  const handleEdit = (file) => {
    setSelectedFile(file); // Store the selected file data for editing
    setModalUpdateFile(true); 
        dispatch(setModelStatus({ modelOpen: true }));
    // Open the update modal
  };

  // Function to handle viewing full file details (open modal)
  const handleView = (file) => {
    setSelectedFile(file); // Store the selected file data for viewing
    setModalViewFile(true);
     dispatch(setModelStatus({ modelOpen: true }));
     // Open the view details modal
  };

  // Function to close modals
  const handleClose = () => {
   dispatch(setModelStatus({ modelOpen: false }));
    
    setModalAddFile(false);
    setModalUpdateFile(false);
    setModalViewFile(false); // Close view modal as well
    setSelectedFile(null); // Reset selected file
  };

  // Modal states and handlers
  const [selectedFile, setSelectedFile] = useState(null);
  const [newFile, setNewFile] = useState(null);  // File input state

  // Function to handle adding a new file
  const handleAddFile = () => {
    // Add file logic (e.g., add selectedFile to formData)
    setFormData([...formData, { ...selectedFile, Document: [...selectedFile.Document, newFile] }]);
    handleClose(); // Close modal after adding
  };

  // Function to handle updating the file
  const handleUpdateFile = () => {
    if (selectedFile) {
      // Update the status of the selected file
      setFormData(formData.map(file =>
        file.name === selectedFile.name
          ? { ...file, Status: selectedFile.Status } // Only update the status
          : file
      ));
    }
    handleClose(); // Close modal after updating
  };

  // Function to handle deleting the file
  const handleDeleteFile = () => {
    // Delete file logic
    setFormData(formData.filter(file => file.name !== selectedFile.name));
    handleClose(); // Close modal after deleting
  };

  // Function to handle file input change (add new file)
  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      setNewFile(file);  // Update the new file state
    }
  };

  return (
    <DashboardLayout
      sx={{
        backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
          `${linearGradient(rgba(gradients.info.main, 0.6), rgba(gradients.info.state, 0.6))}, url(${bgImage})`,
        backgroundPositionY: "50%",
      }}
    >
      <Header />
      <ArgonBox py={3}>
        <Card>
          <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
            <ArgonTypography variant="h6">Files Table</ArgonTypography>
            <Button variant="contained" color="info" onClick={handleAdd}>
              Add File
            </Button>
          </ArgonBox>

          {/* Search Bar */}
          <ArgonBox py={2} display="flex" justifyContent="center">
            <Form.Control
              type="text"
              placeholder="Search Files"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: "50%" }}
            />
          </ArgonBox>

          <ArgonBox
            sx={{
              "& .MuiTableRow-root": {
                height: "60px",
              },
              "& .MuiTableRow-root:not(:last-child)": {
                "& td": {
                  borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                    `${borderWidth[1]} solid ${borderColor}`,
                },
              },
            }}
          >
            <Table columns={columns} rows={rows} />
          </ArgonBox>
        </Card>
      </ArgonBox>
      <Footer />

      {/* Add File Modal */}
      <Modal show={modalAddFile} onHide={handleClose} centered backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Add File</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Add appropriate input fields for "Status", "Client", etc. */}
            <Form.Control
              type="text"
              placeholder="File Name"
              onChange={(e) => setSelectedFile({ ...selectedFile, name: e.target.value })}
            />
            <Form.Control
              type="text"
              placeholder="Status"
              onChange={(e) => setSelectedFile({ ...selectedFile, Status: e.target.value })}
            />
            <Form.Control
              type="text"
              placeholder="Client"
              onChange={(e) => setSelectedFile({ ...selectedFile, Client: e.target.value })}
            />
            <Form.Control
              type="text"
              placeholder="NbSession"
              onChange={(e) => setSelectedFile({ ...selectedFile, NbSession: e.target.value })}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <StyledButton variant="primary" onClick={handleAddFile}>
            Add
          </StyledButton>
          <StyledButton variant="secondary" onClick={handleClose}>
            Close
          </StyledButton>
        </Modal.Footer>
      </Modal>

      {/* Update File Modal */}
      <Modal show={modalUpdateFile} onHide={handleClose} centered backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Update File</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Control
              type="text"
              value={selectedFile?.name || ""}
              placeholder="File Name"
              onChange={(e) => setSelectedFile({ ...selectedFile, name: e.target.value })}
            />
            <Form.Control
              type="text"
              value={selectedFile?.Status || ""}
              placeholder="Status"
              onChange={(e) => setSelectedFile({ ...selectedFile, Status: e.target.value })}
            />
          
            {/* File upload field */}
            <Form.Control
              type="file"
              onChange={handleFileChange}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <StyledButton variant="primary" onClick={handleUpdateFile}>
            Update
          </StyledButton>
          <StyledButton variant="danger" onClick={handleDeleteFile}>
            Delete
          </StyledButton>
          <StyledButton variant="secondary" onClick={handleClose}>
            Close
          </StyledButton>
        </Modal.Footer>
      </Modal>

      {/* View File Modal */}
      <ModalContainer show={modalViewFile} onHide={handleClose} centered backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>View File Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedFile && (
            <>
              {/* Name */}
              <SectionTitle>Name:</SectionTitle>
              <TextDetail>{selectedFile.name}</TextDetail>

              {/* Status */}
              <SectionTitle>Status:</SectionTitle>
              <TextDetail>{selectedFile.Status}</TextDetail>

              {/* Client */}
              <SectionTitle>Client:</SectionTitle>
              <TextDetail>{selectedFile.Client}</TextDetail>

              {/* NbSession */}
              <SectionTitle>NbSession:</SectionTitle>
              <TextDetail>{selectedFile.NbSession}</TextDetail>

              {/* Sessions */}
              <SectionTitle>Sessions:</SectionTitle>
              <FileList variant="flush">
                {selectedFile.Session.map((session, index) => (
                  <ListGroup.Item key={index}>
                    {session.Service}
                  </ListGroup.Item>
                ))}
              </FileList>

              {/* Documents */}
              <SectionTitle>Documents:</SectionTitle>
              <FileList variant="flush">
                {selectedFile.Document.map((doc, index) => (
                  <ListGroup.Item key={index}>
                    <a href={`/docs/${doc.lien}`} target="_blank" rel="noopener noreferrer">
                      {doc.name} ({doc.lien})
                    </a>
                  </ListGroup.Item>
                ))}
              </FileList>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <StyledButton className="secondary" onClick={handleClose}>
            Close
          </StyledButton>
        </Modal.Footer>
      </ModalContainer>

    </DashboardLayout>
  );
}

const ModalContainer = styled(Modal)`
  .modal-content {
    border-radius: 12px;
    background-color: #f9fafb;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }

  .modal-header {
    background-color: #1c3d5a;
    color: white;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    padding: 20px;
    text-align: center;
  }

  .modal-title {
    font-size: 1.5rem;
    font-weight: 600;
    text-transform: uppercase;
  }

  .modal-body {
    padding: 25px;
    background-color: #ffffff;
    border-radius: 8px;
  }

  .modal-footer {
    background-color: #f1f5f9;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
    padding: 15px;
    display: flex;
    justify-content: center;
  }

  .close {
    color: #ff5e57;
    font-size: 1.5rem;
  }
`;

const StyledButton = styled(Button)`
  background-color: #1c3d5a;
  color: #fff;
  border-radius: 50px;
  padding: 12px 30px;
  font-weight: 500;
  border: none;
  transition: all 0.3s ease;

  &:hover {
    background-color: #14314b;
    transform: translateY(-2px);
  }

  &.secondary {
    background-color: #6c757d;
  }

  &:hover.secondary {
    background-color: #5a6268;
  }
`;

const SectionTitle = styled.h5`
  font-size: 1.2rem;
  font-weight: 600;
  color: #1c3d5a;
  margin-bottom: 12px;
`;

const TextDetail = styled.p`
  font-size: 1rem;
  color: #555;
  margin: 5px 0;
`;

const FileList = styled(ListGroup)`
  margin-top: 12px;

  .list-group-item {
    background-color: transparent;
    border: none;
    padding: 8px 15px;
    font-size: 1rem;
    color: #007bff;
    font-weight: 500;
    cursor: pointer;

    &:hover {
      background-color: #f1f5f9;
    }
  }
`;

export default Files;
