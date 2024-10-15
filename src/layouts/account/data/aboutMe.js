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

function AboutMe() {


    return (
        <Card sx={{ height: "100%" }}>


            <ArgonBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
                <ArgonTypography variant="h6" fontWeight="medium" textTransform="capitalize">
                    About Me
                </ArgonTypography>
                <ArgonTypography variant="body2" color="secondary">
                    <Tooltip placement="top">
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
                            Title : &nbsp;
                        </ArgonTypography>
                        <ArgonTypography variant="button" fontWeight="regular" color="text">
                            &nbsp; I&apos;m a Developer

                        </ArgonTypography>
                    </ArgonBox>


                    <ArgonBox display="flex" py={1} pr={1}>
                        <ArgonTypography variant="button" fontWeight="bold" >
                            Title 2 : &nbsp;
                        </ArgonTypography>
                        <ArgonTypography variant="button" fontWeight="regular" color="text">
                            &nbsp; I Develop Application that Help People

                        </ArgonTypography>
                    </ArgonBox>
                    <ArgonBox mb={2} lineHeight={1}>
                    <ArgonTypography variant="button" fontWeight="bold" textTransform="capitalize">
                          description : &nbsp;
                        </ArgonTypography>
                        <ArgonTypography variant="button" color="text" fontWeight="regular">
                        I’m a developer dedicated to leveraging technology to create impactful applications. I thrive on turning ideas into reality, utilizing cutting-edge tools and frameworks to deliver high-quality software that empowers users and drives business success
                        </ArgonTypography>
                    </ArgonBox>





                </ArgonBox>
            </ArgonBox>

        </Card>
    );
}



export default AboutMe;
