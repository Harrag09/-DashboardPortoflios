import React, { useState } from "react";
import Card from "@mui/material/Card";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";
import { Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import { useDispatch, useSelector } from "react-redux";
import { setModelStatus } from "shared/slice/Model/ModelSlice";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function InformationPersonnal() {
    const modelOpen = useSelector((state) => state.modal.modelOpen); 
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
                    <ArgonTypography variant="body2" color="secondary">
                        <Tooltip placement="top" onClick={handleModifier}>
                            <Icon>edit</Icon>
                        </Tooltip>
                    </ArgonTypography>
                </ArgonBox>
                <ArgonBox>
                    <ArgonBox p={2}>
                        {Object.keys(formData).map((key) => (
                            <ArgonBox display="flex" py={1} pr={2} key={key}>
                                <ArgonTypography variant="button" fontWeight="bold" textTransform="capitalize">
                                    {key} &nbsp;
                                </ArgonTypography>
                                <ArgonTypography variant="button" fontWeight="regular" color="text">
                                    &nbsp;{key === 'DateNai' ? formData[key].toLocaleDateString() : formData[key]}
                                </ArgonTypography>
                            </ArgonBox>
                        ))}
                    </ArgonBox>
                </ArgonBox>
            </Card>

            {/* Modal for updating user information */}
            <Modal 
                show={modalOpen} 
                onHide={handleClose} 
                centered 
                className="modal-custom" 
            >
                <Modal.Header closeButton>
                    <Modal.Title>Update Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input
                        name="UserName"
                        placeholder="User Name"
                        value={formData.UserName}
                        onChange={handleChange}
                        className="form-control mb-2"
                    />
                    <input
                        name="Gmail"
                        placeholder="Gmail"
                        value={formData.Gmail}
                        onChange={handleChange}
                        className="form-control mb-2"
                    />
                    <input
                        name="Nom"
                        placeholder="Nom"
                        value={formData.Nom}
                        onChange={handleChange}
                        className="form-control mb-2"
                    />
                    <input
                        name="Prenom"
                        placeholder="Prenom"
                        value={formData.Prenom}
                        onChange={handleChange}
                        className="form-control mb-2"
                    />
                   <input
    name="specialite"
    placeholder="Specialty"
    value={formData.specialite}
    onChange={handleChange}
    className="form-control mb-2"
// Prevent typing in the input field
/>

<DatePicker
    selected={formData.DateNai}
    onChange={handleDateChange}
    dateFormat="dd/MM/yyyy"
    className="form-control mb-2"
    placeholderText="Date of Birth"
    onKeyDown={(e) => e.preventDefault()} 

/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleUpdate}>Update</Button>
                    <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default InformationPersonnal;
