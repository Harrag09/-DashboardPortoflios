import React, { useState } from "react";
import Card from "@mui/material/Card";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";
import { Button, Modal, Form } from 'react-bootstrap';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import { useDispatch } from "react-redux";
import { setModelStatus } from "shared/slice/Model/ModelSlice";

// Styled Components for better design
const CustomModal = styled(Modal)`
  .modal-content {
    border-radius: 16px;
    box-shadow: 0 15px 60px rgba(0, 0, 0, 0.1);
    background-color: #ffffff;
  }

  .modal-backdrop {
    background-color: rgba(0, 0, 0, 0.5);
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
  padding: 8px 20px;
  font-weight: bold;
  transition: background 0.3s, transform 0.2s;

  &:hover {
    background: #0056b3;
    transform: translateY(-2px);
  }
`;

const DeleteButton = styled(Button)`
  background: #e74c3c;
  color: white;
  border-radius: 50px;
  padding: 6px 15px;
  font-weight: bold;
  transition: background 0.3s, transform 0.2s;
  margin-left: 10px;

  &:hover {
    background: #c0392b;
    transform: translateY(-2px);
  }
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
`;

const AddInput = styled(Form.Control)`
  flex: 1;
  border-radius: 50px;
  padding: 8px 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-size: 1rem;
`;

const HeaderContainer = styled(ArgonBox)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const ContentContainer = styled(ArgonBox)`
  padding: 20px;
`;

const ListItem = styled(ArgonBox)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px; /* Reduced margin */
  padding: 5px 10px; /* Reduced padding */
  background-color: #f8f9fa;
  border-radius: 6px; /* Reduced border radius */
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1); /* Lighter shadow */
`;

const SmallerTypography = styled(ArgonTypography)`
  font-size:1rem; /* Smaller font size */
  color: #555; /* Optional: lighter text color */
`;

const Domaine = () => {
  const [modalOpen, setModalOpen2] = useState(false);
  const [formData, setFormData] = useState([
    "Strategic Planning",
    "Market Analysis",
    "Project Management",
    "Business Development",
    "Risk Management",
    "Financial Planning"
  ]);
  const [newItem, setNewItem] = useState(""); // To add a new item

  const dispatch = useDispatch();

  const handleModifier = () => {
    setModalOpen2(true);
    dispatch(setModelStatus({ modelOpen: true }));
  };

  const handleClose = () => {
    setModalOpen2(false);
    dispatch(setModelStatus({ modelOpen: false }));
  };

  // Handle adding a new item to formData
  const handleAddItem = () => {
    if (newItem && !formData.includes(newItem)) {
      setFormData([...formData, newItem]);
      setNewItem(""); // Clear input field after adding
    }
  };

  // Handle deleting an item from formData
  const handleDeleteItem = (itemToDelete) => {
    setFormData(formData.filter(item => item !== itemToDelete));
  };

  return (
    <>
      <Card sx={{ height: "100%" }}>
        <HeaderContainer>
          <ArgonTypography variant="h6" fontWeight="medium" textTransform="capitalize">
            Areas of Expertise
          </ArgonTypography>
          <Tooltip placement="top" onClick={handleModifier}>
            <Icon style={{ fontSize: '1.5rem', cursor: 'pointer', color: '#0056b3' }}>edit</Icon>
          </Tooltip>
        </HeaderContainer>

        <ContentContainer>
          {/* Display formData items */}
          {formData.map((item, index) => (
            <ListItem key={index}>
              <SmallerTypography>{item}</SmallerTypography>
            </ListItem>
          ))}
        </ContentContainer>
      </Card>

      {/* Modal for updating user information */}
      <CustomModal show={modalOpen} onHide={handleClose} centered backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Update Areas of Expertise</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            

            {/* Display formData items in the modal with delete button */}
            {formData.map((item, index) => (
              <ListItem key={index}>
                <ArgonTypography variant="body1">{item}</ArgonTypography>
                <DeleteButton onClick={() => handleDeleteItem(item)}>
                  Delete
                </DeleteButton>
              </ListItem>
            ))}

            {/* Input to add new item */}
            <InputContainer>
              <AddInput
                type="text"
                placeholder="Add new expertise"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
              />
              <StyledButton variant="primary" onClick={handleAddItem}>
                Add
              </StyledButton>
            </InputContainer>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <StyledButton variant="secondary" onClick={handleClose}>
            Close
          </StyledButton>
        </Modal.Footer>
      </CustomModal>
    </>
  );
};

export default Domaine;
