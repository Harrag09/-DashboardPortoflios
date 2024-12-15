import Card from "@mui/material/Card";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";
import Header from "layouts/profile/components/Header";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";  // Unified Button import
import { useDispatch } from "react-redux";
import { setModelStatus } from "shared/slice/Model/ModelSlice";
import { Modal, Form } from 'react-bootstrap';
import styled from "styled-components";  // Import styled from styled-components
import { useMediaQuery } from "@mui/material"; // Import media query hook

const bgImage =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/profile-layout-header.jpg";


  // Inside the Service component
  function Service() {
    const dispatch = useDispatch();

    const [modalAddService, setmodalAddService] = useState(false);
    const [modalUpdateService, setmodalUpdateService] = useState(false);
    const [newItemName, setNewItemName] = useState(""); // Service name
    const [newItemPrice, setNewItemPrice] = useState(""); // Service price
    const [newItemDuration, setNewItemDuration] = useState(""); // Service duration
    const [newItemDescription, setNewItemDescription] = useState(""); // Service description
    const [formData, setFormData] = useState([
      {
        name: "Strategic Business Planning",
        price: 350,
        duration: 90,
        description:
          "Develop comprehensive business strategies aligned with your company's vision and goals. Includes market analysis, competitive positioning, and implementation roadmap.",
      },
      {
        name: "Digital Transformation Consulting",
        price: 400,
        duration: 120,
        description:
          "Navigate your organization's digital transformation journey with expert guidance on technology adoption, process automation, and change management.",
      },
    ]);
  
    const [selectedService, setSelectedService] = useState(null); // State for selected service to edit
    const [windowWidth, setWindowWidth] = useState(window.innerWidth); // Track window width
  
    useEffect(() => {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };
  
      window.addEventListener("resize", handleResize); // Attach resize event listener
  
      return () => {
        window.removeEventListener("resize", handleResize); // Cleanup listener
      };
    }, []);
  
    const handleAdd = () => {
      setmodalAddService(true);
      dispatch(setModelStatus({ modelOpen: true }));
    };
  
    const handleEdit = (service) => {
      setSelectedService(service); // Set selected service for editing
      setmodalUpdateService(true); // Open edit modal
      dispatch(setModelStatus({ modelOpen: true }));
    };
  
    const handleClose = () => {
      setmodalAddService(false);
      setmodalUpdateService(false);
      setSelectedService(null); // Reset selected service
      dispatch(setModelStatus({ modelOpen: false }));
    };
  
  
  
    const handleAddItem = () => {
      const newService = {
        name: newItemName,
        price: newItemPrice,
        duration: newItemDuration,
        description: newItemDescription,
      };
  
      setFormData([...formData, newService]);
  
      setNewItemName("");
      setNewItemPrice("");
      setNewItemDuration("");
      setNewItemDescription("");
  
      handleClose();
    };
  
    const handleUpdateItem = () => {
      if (selectedService) {
        const updatedData = formData.map((service) =>
          service.name === selectedService.name ? selectedService : service
        );
        setFormData(updatedData);
        handleClose();
      }
    };
  
    const handleDeleteService = () => {
      const updatedData = formData.filter(
        (service) => service.name !== selectedService.name
      );
      setFormData(updatedData);
      handleClose();
    };
  
    const columns = [
      { name: "name", align: "left" },
      { name: "price", align: "center" },
      { name: "duration", align: "center" },
      { name: "description", align: "left" },
      { name: "action", align: "center" },
    ];
  
    const rows = formData.map((service, index) => ({
      name: (
        <ArgonTypography variant="button" fontWeight="medium">
          {service.name}
        </ArgonTypography>
      ),
      price: (
        <ArgonTypography variant="caption" color="text" fontWeight="medium">
          ${service.price}
        </ArgonTypography>
      ),
      duration: (
        <ArgonTypography variant="caption" color="text" fontWeight="medium">
          {service.duration} mins
        </ArgonTypography>
      ),
        description: (
          <DivD>
          <DescriptionWrapper>
          <ArgonTypography variant="caption" color="text">
            {service.description}
          </ArgonTypography>
          </DescriptionWrapper>
          </DivD>
        ),
      action: (
        <Tooltip title="Edit Service" placement="top" onClick={() => handleEdit(service)}>
          <Icon style={{ fontSize: "1.5rem", cursor: "pointer", color: "#0056b3" }}>edit</Icon>
        </Tooltip>
      ),
    }));
  
    // Conditionally display only name and action columns if the window width is less than 780px
    const filteredColumns = windowWidth < 1250? columns.filter(col => col.name === 'name' || col.name === 'action') : columns;
  
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
              <ArgonTypography variant="h6">Services Table</ArgonTypography>
              <Button variant="contained" color="info" onClick={handleAdd}>
                Add Service
              </Button>
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
              <Table columns={filteredColumns} rows={rows} />
            </ArgonBox>
          </Card>
        </ArgonBox>
        <Footer />
  
        {/* Add Service Modal */}
        <Modal show={modalAddService} onHide={handleClose} centered backdrop="static">
          <Modal.Header closeButton>
            <Modal.Title>Add Service</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <AddInput
                type="text"
                placeholder="Service Name"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
              />
              <AddInput
                type="number"
                placeholder="Price"
                value={newItemPrice}
                onChange={(e) => setNewItemPrice(e.target.value)}
              />
              <AddInput
                type="number"
                placeholder="Duration (minutes)"
                value={newItemDuration}
                onChange={(e) => setNewItemDuration(e.target.value)}
              />
              <StyledTextarea
              as="textarea"
                  name="formDescription"
                placeholder="Description"
                value={newItemDescription}
                onChange={(e) => setNewItemDescription(e.target.value)}
              />
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <StyledButton variant="primary" onClick={handleAddItem}>
              Add
            </StyledButton>
            <StyledButton variant="secondary" onClick={handleClose}>
              Close
            </StyledButton>
          </Modal.Footer>
        </Modal>
  
        {/* Edit Service Modal */}
        <Modal show={modalUpdateService} onHide={handleClose} centered backdrop="static">
          <Modal.Header closeButton>
            <Modal.Title>Edit Service</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <InputContainer>
                <AddInput
                  type="text"
                  placeholder="Service Name"
                  value={selectedService?.name || ""}
                  onChange={(e) =>
                    setSelectedService({ ...selectedService, name: e.target.value })
                  }
                />
                <AddInput
                  type="number"
                  placeholder="Price"
                  value={selectedService?.price || ""}
                  onChange={(e) =>
                    setSelectedService({ ...selectedService, price: e.target.value })
                  }
                />
                <AddInput
                  type="number"
                  placeholder="Duration (min)"
                  value={selectedService?.duration || ""}
                  onChange={(e) =>
                    setSelectedService({ ...selectedService, duration: e.target.value })
                  }
                />
                <StyledTextarea
                  as="textarea"
                  name="formDescription"
                  placeholder="Description"
                  value={selectedService?.description || ""}
                  onChange={(e) =>
                    setSelectedService({ ...selectedService, description: e.target.value })
                  }
                />
              </InputContainer>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <StyledButton variant="primary" onClick={handleUpdateItem}>
              Update
            </StyledButton>
            <StyledButton variant="danger" onClick={handleDeleteService}>
              Delete
            </StyledButton>
            <StyledButton variant="secondary" onClick={handleClose}>
              Close
            </StyledButton>
          </Modal.Footer>
        </Modal>
      </DashboardLayout>
    );
  }
  const DivD = styled(ArgonBox)`
width:450px;
`;
  const DescriptionWrapper = styled(ArgonBox)`
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  margin-top:-6px;
  &:hover {
    overflow: visible;
    white-space: normal;
    background-color: #f8f9fa;
    padding: 10px;
    z-index: 10;
  }
`;
// Styled Components for UI Elements
const InputContainer = styled.div`
  margin: 20px auto; // Centering the container with vertical margin
  max-width: 600px; // Restrict the width to prevent stretching on large screens
`;

const StyledTextarea = styled(Form.Control)`
  border-radius: 8px;
  border: 1px solid #ced4da;
  margin-top: 9px;
  padding: 12px 15px;
  transition: border-color 0.3s, box-shadow 0.3s;
  resize: none;
   height: 20rem;
   width: 99%;

  &:focus {
    border-color: #0056b3;
    box-shadow: 0 0 0 0.2rem rgba(0, 86, 179, 0.25);
  }
`;
const AddInput = styled(Form.Control)`
  width: 100%; // Makes the input take up the full width of the container
  border-radius: 25px; // Rounded borders
  padding: 10px 18px; // Padding for the input
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1); // Subtle shadow for input
  font-size: 1rem; // Adjust the font size
  border: 1px solid #ced4da; // Border color
  transition: border-color 0.3s ease; // Smooth transition when focused
  margin-top: 5px;
  &:focus {
    border-color: #007bff; // Change border color on focus
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5); // Add shadow on focus
  }
`;

const StyledButton = styled(Button)`
  background: #007bff;
  color: white;
  border-radius: 50px;
  padding: 8px 20px;
  font-weight: bold;
  transition: background 0.3s, transform 0.2s;

  &:hover {
    background: #0056b3;
    transform: translateY(-2px);
  }
`;

export default Service;
