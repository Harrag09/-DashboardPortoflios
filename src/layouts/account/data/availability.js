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
import Calendar from 'react-calendar'; // Calendar Component
import Select from 'react-select'; // Multi-select Dropdown
import "react-calendar/dist/Calendar.css";

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
      max-width: 600px;
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
  width: 100%;
  border-radius: 25px;
  padding: 10px 18px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  font-size: 1rem;
  border: 1px solid #ced4da;
  transition: border-color 0.3s ease;
  margin-top: 5px;
  
  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
`;

const InputContainer = styled.div`
  margin: 20px auto;
  max-width: 600px;
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

const Availability = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [formData, setFormData] = useState([
    { 
      days: "Mon-Fri", 
      timeSlots: [{ time: "9:00 AM - 12:00 PM", remote: true }],
      languages: ["English"], 
    },
  ]);
  const [newItem, setNewItem] = useState({
    days: "",
    timeSlots: [{ time: "", remote: false }],
    languages: [],
    date: new Date(),
  });
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

  const handleDateChange = (date) => {
    setNewItem({ ...newItem, date });
  };

  const handleAddItem = () => {
    if (newItem.days && newItem.timeSlots.length > 0 && newItem.languages.length > 0) {
      setFormData([...formData, newItem]);
      setNewItem({
        days: "",
        timeSlots: [{ time: "", remote: false }],
        languages: [],
        date: new Date(),
      });
    }
  };

  const handleAddTimeSlot = () => {
    setNewItem({
      ...newItem,
      timeSlots: [...newItem.timeSlots, { time: "", remote: false }],
    });
  };

  const handleTimeSlotChange = (index, field, value) => {
    const updatedTimeSlots = newItem.timeSlots.map((slot, i) =>
      i === index ? { ...slot, [field]: value } : slot
    );
    setNewItem({ ...newItem, timeSlots: updatedTimeSlots });
  };

  const handleLanguageChange = (selectedOptions) => {
    const selectedLanguages = selectedOptions.map(option => option.value);
    setNewItem({ ...newItem, languages: selectedLanguages });
  };

  const handleDeleteItem = (indexToDelete) => {
    const updatedData = formData.filter((_, index) => index !== indexToDelete);
    setFormData(updatedData);
  };

  const handleEditItem = (indexToEdit) => {
    const itemToEdit = formData[indexToEdit];
    setSelectedItem({ ...itemToEdit, index: indexToEdit });
    setModalOpen(false);
    setEditModalOpen(true);
    dispatch(setModelStatus({ modelOpen: true }));
  };

  const handleUpdateItem = () => {
    if (selectedItem) {
      const updatedData = [...formData];
      updatedData[selectedItem.index] = selectedItem;
      setFormData(updatedData);
      setEditModalOpen(false);
      dispatch(setModelStatus({ modelOpen: false }));
    }
  };

  return (
    <>
      <Card sx={{ height: "100%", borderRadius: "12px", boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)" }}>
        <HeaderContainer>
          <ArgonTypography variant="h5" fontWeight="bold" textTransform="capitalize">
            Availability
          </ArgonTypography>
          <Tooltip placement="top" onClick={handleModifier}>
            <Icon style={{ fontSize: "1.5rem", cursor: "pointer", color: "#007bff" }}>edit</Icon>
          </Tooltip>
        </HeaderContainer>

        <ContentContainer>
          {formData.map((item, index) => (
            <ListItem key={index} onClick={() => handleEditItem(index)}>
              <SmallerTypography>
                {item.days} | 
                {item.timeSlots.map((slot, idx) => (
                  <span key={idx}>{`${slot.time} ${slot.remote ? "(Remote)" : ""}`}</span>
                ))} 
                | Languages: {item.languages.join(", ")}
              </SmallerTypography>
            </ListItem>
          ))}
        </ContentContainer>
      </Card>

      {/* Modal for adding/updating availability */}
      <CustomModal show={modalOpen} onHide={handleClose} centered backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Add Availability</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Calendar onChange={handleDateChange} value={newItem.date} />

            <AddInput
              type="text"
              placeholder="Days"
              value={newItem.days}
              onChange={(e) => setNewItem({ ...newItem, days: e.target.value })}
            />
            
            <div style={{ margin: '20px 0' }}>
              <Select
                isMulti
                name="languages"
                options={[
                  { value: 'English', label: 'English' },
                  { value: 'Spanish', label: 'Spanish' },
                  { value: 'French', label: 'French' },
                  { value: 'German', label: 'German' },
                ]}
                onChange={handleLanguageChange}
                value={newItem.languages.map(lang => ({ value: lang, label: lang }))}
              />
            </div>

            {newItem.timeSlots.map((slot, index) => (
              <div key={index}>
                <AddInput
                  type="text"
                  placeholder="Time Slot"
                  value={slot.time}
                  onChange={(e) => handleTimeSlotChange(index, "time", e.target.value)}
                />
                <Form.Check
                  type="checkbox"
                  label="Remote"
                  checked={slot.remote}
                  onChange={(e) => handleTimeSlotChange(index, "remote", e.target.checked)}
                />
              </div>
            ))}

            <StyledButton variant="primary" onClick={handleAddTimeSlot}>Add Another Time Slot</StyledButton>

            <StyledButton variant="primary" onClick={handleAddItem}>Add Availability</StyledButton>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <StyledButton variant="secondary" onClick={handleClose}>Close</StyledButton>
        </Modal.Footer>
      </CustomModal>

      {/* Modal for editing/deleting availability */}
      <CustomModal show={editModalOpen} onHide={() => { setEditModalOpen(false); dispatch(setModelStatus({ modelOpen: false })); }} centered backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Edit or Delete Availability</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedItem && (
            <Form>
              <Calendar onChange={handleDateChange} value={selectedItem.date} />

              <AddInput
                type="text"
                placeholder="Days"
                value={selectedItem.days}
                onChange={(e) => setSelectedItem({ ...selectedItem, days: e.target.value })}
              />

              <div style={{ margin: '20px 0' }}>
                <Select
                  isMulti
                  name="languages"
                  options={[
                    { value: 'English', label: 'English' },
                    { value: 'Spanish', label: 'Spanish' },
                    { value: 'French', label: 'French' },
                    { value: 'German', label: 'German' },
                  ]}
                  onChange={handleLanguageChange}
                  value={selectedItem.languages.map(lang => ({ value: lang, label: lang }))}
                />
              </div>

              {selectedItem.timeSlots.map((slot, index) => (
                <div key={index}>
                  <AddInput
                    type="text"
                    placeholder="Time Slot"
                    value={slot.time}
                    onChange={(e) => handleTimeSlotChange(index, "time", e.target.value)}
                  />
                  <Form.Check
                    type="checkbox"
                    label="Remote"
                    checked={slot.remote}
                    onChange={(e) => handleTimeSlotChange(index, "remote", e.target.checked)}
                  />
                </div>
              ))}
              <StyledButton variant="primary" onClick={handleUpdateItem}>Update</StyledButton>
              <DeleteButton variant="danger" onClick={handleDeleteItem}>Delete</DeleteButton>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <StyledButton variant="secondary" onClick={() => { setEditModalOpen(false); dispatch(setModelStatus({ modelOpen: false })); }}>Close</StyledButton>
        </Modal.Footer>
      </CustomModal>
    </>
  );
};

export default Availability;
