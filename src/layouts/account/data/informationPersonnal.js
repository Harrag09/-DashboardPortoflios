import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";
import { Button, Modal, Form } from 'react-bootstrap';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import { useDispatch, useSelector } from "react-redux";
import { setModelStatus } from "shared/slice/Model/ModelSlice";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Styled Components
const CustomModal = styled(Modal)`
  .modal-content {
    border-radius: 16px;
    box-shadow: 0 15px 60px rgba(0, 0, 0, 0.2);
    background-color: #ffffff;
  }
  
  .modal-backdrop {
    background-color: rgba(0, 0, 0, 0.5); /* Darker backdrop */
  }

  @media (max-width: 768px) {
    .modal-dialog {
  

      max-width: 500px;
    }
  }
`;

const ModalHeader = styled(Modal.Header)`
  background-color: #0056b3;
  color: white;
  border-bottom: none;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  padding: 20px;
`;

const ModalTitle = styled(Modal.Title)`
  font-weight: bold;
  font-size: 1.75rem; /* Increased font size */
`;

const ModalBody = styled(Modal.Body)`
  padding: 30px;
  border: 1px solid #e0e0e0; /* Add border for distinction */
  border-radius: 8px; /* Rounded corners */
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1); /* Subtle shadow */
`;

const StyledFormControl = styled(Form.Control)`
  border-radius: 8px;
  border: 1px solid #ced4da;
  margin-bottom: 20px;
  padding: 12px 15px;
  transition: border-color 0.3s, box-shadow 0.3s;
  
  &:focus {
    border-color: #0056b3;
    box-shadow: 0 0 0 0.2rem rgba(0, 86, 179, 0.25);
  }
`;

const StyledButton = styled(Button)`
  border-radius: 50px; /* Rounded corners */
  padding: 10px 20px;
  font-weight: bold;
  background: linear-gradient(90deg, #007bff, #0056b3);
  border: none;
  transition: background 0.3s, transform 0.2s;
  
  &:hover {
    background: linear-gradient(90deg, #0056b3, #003f7f);
    transform: translateY(-2px);
  }
`;

const FormLabel = styled(Form.Label)`
  font-weight: bold;
  margin-bottom: 10px;
  color: #0056b3;
`;

const FormGroup = styled(Form.Group)`
  display: flex;
  flex-direction: column;
`;

const DatePickerWrapper = styled.div`
  position: relative;
  width: 100%;

  .react-datepicker {
    border-radius: 8px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }
`;

const IconWrapper = styled.span`
  margin-right: 10px;
  color: #0056b3;
`;

const StyledIcon = styled(Icon)`
  font-size: 1.5rem;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;

function InformationPersonnal() {
  const [modalOpen, setModalOpen2] = useState(false);
  const [formData, setFormData] = useState({
    UserName: "Lwess",
    Gmail: "Harragousssama10@gmail.com",
    Nom: "Harrag",
    Prenom: "Oussama",
    DateNai: new Date("1999-06-08"),
    specialite: "Développeur full stack",
  });
  const dispatch = useDispatch();
  // useEffect(() => {
  //   setModalOpen2(false);
    
  // }, []);


  const handleModifier = () => {
    setModalOpen2(true);
    dispatch(setModelStatus({ modelOpen: true }));
  };

  const handleClose = () => {
    setModalOpen2(false);
    dispatch(setModelStatus({ modelOpen: false }));
  };

  const handleUpdate = () => {
    handleClose();
    alert("User info updated!");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setFormData((prevData) => ({
      ...prevData,
      DateNai: date,
    }));
  };

  return (
    <>
      <Card sx={{ height: "100%" }}>
        <ArgonBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
          <ArgonTypography variant="h6" fontWeight="medium" textTransform="capitalize">
            Account Personal
          </ArgonTypography>
          <ArgonTypography variant="body2" color="secondary" style={{ fontSize: '1.5rem', padding: '10px' }}>
            <Tooltip placement="top" onClick={handleModifier}>
              <StyledIcon style={{ fontSize: '1.5rem' }}>edit</StyledIcon>
            </Tooltip>
          </ArgonTypography>
        </ArgonBox>
        <ArgonBox>
          <ArgonBox p={2}>
            <ArgonBox display="flex" py={1} pr={2}>
              <ArgonTypography variant="button" fontWeight="bold" textTransform="capitalize">UserName</ArgonTypography>
              <ArgonTypography variant="button" fontWeight="regular" color="text">&nbsp;{formData.UserName}</ArgonTypography>
            </ArgonBox>
            <ArgonBox display="flex" py={1} pr={2}>
              <ArgonTypography variant="button" fontWeight="bold" textTransform="capitalize">Gmail</ArgonTypography>
              <ArgonTypography variant="button" fontWeight="regular" color="text">&nbsp;{formData.Gmail}</ArgonTypography>
            </ArgonBox>
            <ArgonBox display="flex" py={1} pr={2}>
              <ArgonTypography variant="button" fontWeight="bold" textTransform="capitalize">Nom</ArgonTypography>
              <ArgonTypography variant="button" fontWeight="regular" color="text">&nbsp;{formData.Nom}</ArgonTypography>
            </ArgonBox>
            <ArgonBox display="flex" py={1} pr={2}>
              <ArgonTypography variant="button" fontWeight="bold" textTransform="capitalize">Prenom</ArgonTypography>
              <ArgonTypography variant="button" fontWeight="regular" color="text">&nbsp;{formData.Prenom}</ArgonTypography>
            </ArgonBox>
            <ArgonBox display="flex" py={1} pr={2}>
              <ArgonTypography variant="button" fontWeight="bold" textTransform="capitalize">Date de Naissance</ArgonTypography>
              <ArgonTypography variant="button" fontWeight="regular" color="text">&nbsp;{formData.DateNai.toLocaleDateString()}</ArgonTypography>
            </ArgonBox>
            <ArgonBox display="flex" py={1} pr={2}>
              <ArgonTypography variant="button" fontWeight="bold" textTransform="capitalize">Specialité</ArgonTypography>
              <ArgonTypography variant="button" fontWeight="regular" color="text">&nbsp;{formData.specialite}</ArgonTypography>
            </ArgonBox>
          </ArgonBox>
        </ArgonBox>
      </Card>

      {/* Modal for updating user information */}
      <CustomModal 
        show={modalOpen} 
        onHide={handleClose} 
        centered 
        backdrop="static"
      >
        <ModalHeader closeButton>
          <ModalTitle>Update Information</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup controlId="formUserName">
              <FormLabel>UserName</FormLabel>
              <StyledFormControl
                type="text"
                name="UserName"
                value={formData.UserName}
                onChange={handleChange}
                placeholder="Enter your username"
              />
            </FormGroup>
            <FormGroup controlId="formGmail">
              <FormLabel>Gmail</FormLabel>
              <StyledFormControl
                type="email"
                name="Gmail"
                value={formData.Gmail}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </FormGroup>
            <FormGroup controlId="formNom">
              <FormLabel>Nom</FormLabel>
              <StyledFormControl
                type="text"
                name="Nom"
                value={formData.Nom}
                onChange={handleChange}
                placeholder="Enter your last name"
              />
            </FormGroup>
            <FormGroup controlId="formPrenom">
              <FormLabel>Prenom</FormLabel>
              <StyledFormControl
                type="text"
                name="Prenom"
                value={formData.Prenom}
                onChange={handleChange}
                placeholder="Enter your first name"
              />
            </FormGroup>
            <FormGroup controlId="formDateNai">
              <FormLabel>Date de Naissance</FormLabel>
              <DatePickerWrapper>
                <DatePicker
                  selected={formData.DateNai}
                  onChange={handleDateChange}
                  dateFormat="dd/MM/yyyy"
                  className="form-control"
                  placeholderText="Select date"
                  onKeyDown={(e) => e.preventDefault()} // Prevent keyboard input
                />
              </DatePickerWrapper>
            </FormGroup>
            <FormGroup controlId="formSpecialite">
              <FormLabel>Specialité</FormLabel>
              <StyledFormControl
                type="text"
                name="specialite"
                value={formData.specialite}
                onChange={handleChange}
                placeholder="Enter your specialty"
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <Modal.Footer>
          <StyledButton variant="primary" onClick={handleUpdate}>Update</StyledButton>
          <StyledButton variant="secondary" onClick={handleClose}>Cancel</StyledButton>
        </Modal.Footer>
      </CustomModal>
    </>
  );
}

export default InformationPersonnal;
  
