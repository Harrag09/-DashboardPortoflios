import React, { useState } from "react";
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

// Styled Components
const CustomModal = styled(Modal)`
  .modal-content {
    border-radius: 16px;
    box-shadow: 0 15px 60px rgba(0, 0, 0, 0.2);
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
  font-size: 1.75rem;
`;

const ModalBody = styled(Modal.Body)`
  padding: 30px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
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

const StyledTextarea = styled(Form.Control)`
  border-radius: 8px;
  border: 1px solid #ced4da;
  margin-bottom: 20px;
  padding: 12px 15px;
  transition: border-color 0.3s, box-shadow 0.3s;
  resize: none;
   height: 20rem;

  &:focus {
    border-color: #0056b3;
    box-shadow: 0 0 0 0.2rem rgba(0, 86, 179, 0.25);
  }
`;

const StyledButton = styled(Button)`
  border-radius: 50px;
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


const DescriptionWrapper = styled(ArgonBox)`
  max-width: 75%;
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



const StyledIcon = styled(Icon)`
  font-size: 1.5rem;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;

function AboutMe() {
    const [modalOpen, setModalOpen] = useState(false);
    const [formData, setFormData] = useState({
      Title1: "I'm a Developer",
      Title2: "I Develop Application that Help People",
      Description:"As a dedicated software developer, I specialize in creating innovative applications that empower individuals and businesses. My goal is to design user-friendly solutions that not only meet the specific needs of users but also enhance their overall experience. With a strong focus on functionality and aesthetics, I strive to develop applications that simplify complex tasks and improve productivity. Whether it’s building web applications, mobile apps, or custom software, I am committed to delivering high-quality results that make a meaningful impact in the lives of users."
    });
    const dispatch = useDispatch();
  
    const handleModifier = () => {
      setModalOpen(true);
      dispatch(setModelStatus({ modelOpen: true }));
    };
  
    const handleClose = () => {
      setModalOpen(false);
      dispatch(setModelStatus({ modelOpen: false }));
    };
  
    const handleUpdate = () => {
      alert("User info updated!");
      handleClose();
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    return (
      <>
        <Card sx={{ height: "100%" }}>
          <ArgonBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
            <ArgonTypography variant="h6" fontWeight="medium" textTransform="capitalize">
              About Me
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
                <ArgonTypography variant="button" fontWeight="bold" textTransform="capitalize">
                  Title1 &nbsp;
                </ArgonTypography>
                <ArgonTypography variant="button" fontWeight="regular" color="text">
                  &nbsp;{formData.Title1}
                </ArgonTypography>
              </ArgonBox>
              <ArgonBox display="flex" py={1} pr={2}>
                <ArgonTypography variant="button" fontWeight="bold" textTransform="capitalize">
                  Title2 &nbsp;
                </ArgonTypography>
             
                  <ArgonTypography variant="button" fontWeight="regular" color="text">
                    &nbsp;{formData.Title2}
                  </ArgonTypography>
              
              </ArgonBox>
              <ArgonBox display="flex" py={1} pr={2}>
                <ArgonTypography variant="button" fontWeight="bold" textTransform="capitalize">
                Description &nbsp;
                </ArgonTypography>
                <DescriptionWrapper>
                  <ArgonTypography variant="button" fontWeight="regular" color="text">
                    &nbsp;{formData.Description}
                  </ArgonTypography>
                </DescriptionWrapper>
              </ArgonBox>
            </ArgonBox>
          </ArgonBox>
          
        </Card>
  
        <CustomModal 
          show={modalOpen} 
          onHide={handleClose} 
          centered 
          backdrop="static"
        >
          <ModalHeader closeButton>
            <ModalTitle>Update About Me</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup controlId="formTitle1">
                <FormLabel>Title1</FormLabel>
                <StyledFormControl
                  type="text"
                  name="Title1"
                  value={formData.Title1}
                  onChange={handleChange}
                  placeholder="Enter your Title1"
                />
              </FormGroup>
              
              <FormGroup controlId="formTitle2">
                <FormLabel>Title2</FormLabel>
                <StyledFormControl
                  type="text"
                  name="Title2"
                  value={formData.Title2}
                  onChange={handleChange}
                  placeholder="Enter your Title1"
                />
              </FormGroup>
              <FormGroup controlId="formDescription">
                <FormLabel>Description</FormLabel>
                <StyledTextarea
                  as="textarea"
                  name="formDescription"
                  value={formData.Description}
                  onChange={handleChange}
                  placeholder="Enter your Description"
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

export default AboutMe;
