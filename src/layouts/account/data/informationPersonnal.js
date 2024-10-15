/**
=========================================================
* Argon Dashboard 2 MUI - v3.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-material-ui
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// react-routers components
import { Link } from "react-router-dom";

// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

// Argon Dashboard 2 MUI base styles
import colors from "assets/theme/base/colors";
import typography from "assets/theme/base/typography";

function InformationPersonnal() {


    const handleModifier = () => {
     
          alert("will update");
     
      };
    return (
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
                    {/* <ArgonBox opacity={0.3}>
          <Divider />
        </ArgonBox> */}


                    <ArgonBox display="flex" py={1} pr={2}>
                        <ArgonTypography variant="button" fontWeight="bold" textTransform="capitalize">
                            UserName  &nbsp;
                        </ArgonTypography>
                        <ArgonTypography variant="button" fontWeight="regular" color="text">
                            &nbsp;Lwess
                        </ArgonTypography>
                    </ArgonBox>

                    <ArgonBox display="flex" py={1} pr={2}>
                        <ArgonTypography variant="button" fontWeight="bold" textTransform="capitalize">
                            Gmail  &nbsp;
                        </ArgonTypography>
                        <ArgonTypography variant="button" fontWeight="regular" color="text">
                            &nbsp;Harragousssama10@gmail.com
                        </ArgonTypography>
                    </ArgonBox>
                    

                    <ArgonBox display="flex" py={1} pr={2}>
                        <ArgonTypography variant="button" fontWeight="bold" textTransform="capitalize">
                            Nom &nbsp;
                        </ArgonTypography>
                        <ArgonTypography variant="button" fontWeight="regular" color="text">
                              Harrag
                        </ArgonTypography>
                    </ArgonBox>


                    <ArgonBox display="flex" py={1} pr={2}>
                        <ArgonTypography variant="button" fontWeight="bold" textTransform="capitalize">
                            Prenom  &nbsp;
                        </ArgonTypography>
                        <ArgonTypography variant="button" fontWeight="regular" color="text">
                              Oussama
                        </ArgonTypography>
                    </ArgonBox>

                    <ArgonBox display="flex" py={1} pr={2}>
                        <ArgonTypography variant="button" fontWeight="bold" textTransform="capitalize">
                        Date de naissance &nbsp;
                        </ArgonTypography>
                        <ArgonTypography variant="button" fontWeight="regular" color="text">
                              08/06/1999
                        </ArgonTypography>
                    </ArgonBox>
                    <ArgonBox display="flex" py={1} pr={2}>
                        <ArgonTypography variant="button" fontWeight="bold" textTransform="capitalize">
                        spécialité  &nbsp;
                        </ArgonTypography>
                        <ArgonTypography variant="button" fontWeight="regular" color="text">
                        Développeur full stack
                        </ArgonTypography>
                    </ArgonBox>



          






                </ArgonBox>
            </ArgonBox>

        </Card>
    );
}



export default InformationPersonnal;
