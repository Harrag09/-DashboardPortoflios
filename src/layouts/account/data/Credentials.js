import React, { useState } from "react";
import Card from "@mui/material/Card";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";
import { Button, Modal, Form } from "react-bootstrap";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import { useDispatch } from "react-redux";
import { setModelStatus } from "shared/slice/Model/ModelSlice";

// Styled Components for better design
const CustomModal = styled(Modal)`
  .modal-content {
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    background-color: #ffffff;
  }

  .modal-backdrop {
    background-color: rgba(0, 0, 0, 0.7);
  }

  @media (max-width: 768px) {
    .modal-dialog {
      max-width: 500px;
    }
  }
`;

const StyledButton = styled(Button)`
  background: #007bff;
  color: white;
  border-radius: 50px;
  padding: 10px 25px;
  font-weight: bold;
  transition: all 0.3s ease-in-out;

  &:hover {
    background: #0056b3;
    transform: translateY(-3px);
  }
`;

const DeleteButton = styled(Button)`
  background: #e74c3c;
  color: white;
  border-radius: 50px;
  padding: 8px 20px;
  font-weight: bold;
  transition: all 0.3s ease-in-out;
  margin-left: 15px;

  &:hover {
    background: #c0392b;
    transform: translateY(-3px);
  }
`;

const EditButton = styled(Button)`
  background: #f39c12;
  color: white;
  border-radius: 50px;
  padding: 8px 20px;
  font-weight: bold;
  transition: all 0.3s ease-in-out;
  margin-left: 15px;

  &:hover {
    background: #e67e22;
    transform: translateY(-3px);
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
margin-top:5px;
  &:focus {
    border-color: #007bff; // Change border color on focus
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5); // Add shadow on focus
  }
`;

const InputContainer = styled.div`

  margin: 20px auto; // Centering the container with vertical margin
  max-width: 600px; // Restrict the width to prevent stretching on large screens
`;


const HeaderContainer = styled(ArgonBox)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px 20px;
  background-color: #f7f8fa;
  border-radius: 8px;
`;

const ContentContainer = styled(ArgonBox)`
  padding: 25px;
`;

const ListItem = styled(ArgonBox)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 12px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f1f3f5;
  }
`;

const SmallerTypography = styled(ArgonTypography)`
  font-size: 0.95rem;
  color: #6c757d;
`;

const Credentials = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [formData, setFormData] = useState([
    { certif: "MBA", School: "Harvard Business School", year: "2015" },
    { certif: "Certified Management Consultant", School: "IMC", year: "2016" },
  ]);
  const [newItem, setNewItem] = useState({ certif: "", School: "", year: "" });
  const [selectedItem, setSelectedItem] = useState(null);

  const dispatch = useDispatch();

  const handleModifier = () => {
    setModalOpen(true);
    dispatch(setModelStatus({ modelOpen: true }));
  };

  const handleClose = () => {
    setModalOpen(false);
    dispatch(setModelStatus({ modelOpen: false }));
  };

  // Handle adding a new item to formData
  const handleAddItem = () => {
    if (newItem.certif && newItem.School && newItem.year) {
      setFormData([...formData, newItem]);
      setNewItem({ certif: "", School: "", year: "" });
    }
  };

  // Handle deleting an item from formData
  const handleDeleteItem = (indexToDelete) => {
    const updatedData = formData.filter((_, index) => index !== indexToDelete);
    setFormData(updatedData);
  };

  // Handle editing an item in formData
  const handleEditItem = (indexToEdit) => {
    const itemToEdit = formData[indexToEdit];
    setSelectedItem({ ...itemToEdit, index: indexToEdit });
    setModalOpen(false);
    setEditModalOpen(true);
    dispatch(setModelStatus({ modelOpen: true }));
  };

  // Handle modification of the selected item
  const handleUpdateItem = () => {
    if (selectedItem.certif && selectedItem.School && selectedItem.year) {
      const updatedData = [...formData];
      updatedData[selectedItem.index] = selectedItem;
      setFormData(updatedData);
      setEditModalOpen(false);
      dispatch(setModelStatus({ modelOpen: false }));
    }
  };

  // Handle deletion of the selected item
  const handleDeleteSelectedItem = () => {
    const updatedData = formData.filter((_, index) => index !== selectedItem.index);
    setFormData(updatedData);
    setEditModalOpen(false);
    dispatch(setModelStatus({ modelOpen: false }));
  };

  return (
    <>
      <Card sx={{ height: "100%", borderRadius: "12px", boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)" }}>
        <HeaderContainer>
          <ArgonTypography variant="h5" fontWeight="bold" textTransform="capitalize">
            Credentials
          </ArgonTypography>
          <Tooltip placement="top" onClick={handleModifier}>
            <Icon style={{ fontSize: "1.5rem", cursor: "pointer", color: "#007bff" }}>edit</Icon>
          </Tooltip>
        </HeaderContainer>

        <ContentContainer>
          {/* Display formData items */}
          {formData.map((item, index) => (
            <ListItem key={index} onClick={() => handleEditItem(index)}>
              <SmallerTypography>{`${item.certif} - ${item.School} (${item.year})`}</SmallerTypography>
            </ListItem>
          ))}
        </ContentContainer>
      </Card>

      {/* Modal for adding/updating item */}
      <CustomModal show={modalOpen} onHide={handleClose} centered backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>{newItem.certif ? "Edit Credentials" : "Add Credentials"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          {formData.map((item, index) => (
            <ListItem key={index} onClick={() => handleEditItem(index)}>
              <SmallerTypography>{`${item.certif} - ${item.School} (${item.year})`}</SmallerTypography>
            </ListItem>
          ))}
              <div style={{
  width: '80%', // Controls the width of the line
  height: '3px', // Thickness of the line
  backgroundColor: '#3498db', // Line color (blue)
  borderRadius: '2px', // Rounded edges for a smoother look
  margin: '20px auto', // Center the line and add some spacing
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Add a subtle shadow
}}></div>

<InputContainer>
  <AddInput
    type="text"
    placeholder="Certification"
    value={newItem.certif}
    onChange={(e) => setNewItem({ ...newItem, certif: e.target.value })}
  />
  <AddInput
    type="text"
    placeholder="School"
    value={newItem.School}
    onChange={(e) => setNewItem({ ...newItem, School: e.target.value })}
  />
  <AddInput
    type="text"
    placeholder="Year"
    value={newItem.year}
    onChange={(e) => setNewItem({ ...newItem, year: e.target.value })}
  />
</InputContainer>

<div style={{
  display: 'flex',
  justifyContent: 'center', // Centers the button horizontally
  margin: '5px', // Spacing around the button
}}>
  <StyledButton variant="primary" onClick={handleAddItem} style={{
    padding: '10px 20px', // Adds padding for button size
    borderRadius: '5px', // Rounded edges for the button
    backgroundColor: '#3498db', // Blue background for the button
    color: '#fff', // White text color
    border: 'none', // Removes default border
    cursor: 'pointer', // Changes the cursor to pointer on hover
    fontSize: '16px', // Slightly larger text
    transition: 'background-color 0.3s', // Smooth transition effect on hover
  }}>
    Add
  </StyledButton>
</div>

       

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <StyledButton variant="secondary" onClick={handleClose}>
            Close
          </StyledButton>
        </Modal.Footer>
      </CustomModal>

      {/* Modal for editing/deleting an item */}
      <CustomModal 
  show={editModalOpen} 
  onHide={() => {
    setEditModalOpen(false); 
    dispatch(setModelStatus({ modelOpen: false }));
  }}
 centered backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Edit or Delete Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedItem && (
            <Form>
              <InputContainer>
                <AddInput
                  type="text"
                  placeholder="Certification"
                  value={selectedItem.certif}
                  onChange={(e) => setSelectedItem({ ...selectedItem, certif: e.target.value })}
                />
                <AddInput
                  type="text"
                  placeholder="School"
                  value={selectedItem.School}
                  onChange={(e) => setSelectedItem({ ...selectedItem, School: e.target.value })}
                />
                <AddInput
                  type="text"
                  placeholder="Year"
                  value={selectedItem.year}
                  onChange={(e) => setSelectedItem({ ...selectedItem, year: e.target.value })}
                />
              </InputContainer>
              <StyledButton variant="primary" onClick={handleUpdateItem}>
                Update
              </StyledButton>
              <DeleteButton variant="danger" onClick={handleDeleteSelectedItem}>
                Delete
              </DeleteButton>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
            
          <StyledButton variant="secondary" onClick={() =>{
    setEditModalOpen(false); 
    dispatch(setModelStatus({ modelOpen: false }));
  }}>
            Close
          </StyledButton>
        </Modal.Footer>
      </CustomModal>
    </>
  );
};

export default Credentials;
