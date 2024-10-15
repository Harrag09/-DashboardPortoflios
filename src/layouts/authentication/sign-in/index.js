


// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";




// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";
import Socials from "layouts/authentication/components/Socials";
import Separator from "layouts/authentication/components/Separator";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Switch from "@mui/material/Switch";
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonInput from "components/ArgonInput";
import ArgonButton from "components/ArgonButton";
import { WidthFull } from "@mui/icons-material";
// Images
const bgImage =
  "https://c8.alamy.com/comp/ECMD14/hand-pushing-virtual-security-button-on-digital-background-ECMD14.jpg";

function Illustration() {
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const correctUser = {
    email: "wess@gmail.com",
    password: "123"
  };

  useEffect(() => {
    // Redirect if already logged in
    if (localStorage.getItem("isLoggedIn")) {
      navigate("/home");
    }
  }, [navigate]);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === correctUser.email && password === correctUser.password) {
      localStorage.setItem("isLoggedIn", true);
      navigate("/home");
    } else {
      alert("Invalid email or password");
    }
  };
  return (
    <CoverLayout
      title="Welcome!"
      description="Use these awesome forms to login or create new account in your project for free."
      image={bgImage}
      imgPosition="top"
      button={{ color: "dark", variant: "gradient" }}
    >
      <Card >
        <ArgonBox p={5} mb={1} textAlign="center">
          <ArgonTypography variant="h5" fontWeight="medium">
            Sign In with
          </ArgonTypography>
        </ArgonBox>
        <ArgonBox mb={2}>
          <Socials />
        </ArgonBox>
        <ArgonBox px={12}>
          <Separator />
        </ArgonBox>
        <ArgonBox component="form" role="form" onSubmit={handleLogin}>
          <ArgonBox mb={2} style={{ width: "90%", paddingLeft: "14px" }}>
            <ArgonInput type="email" placeholder="Email" size="large" value={email} onChange={(e) => setEmail(e.target.value)} />
          </ArgonBox>
          <ArgonBox mb={2} style={{ width: "90%", paddingLeft: "15px" }}>
            <ArgonInput type="password" placeholder="Password" size="large" value={password} onChange={(e) => setPassword(e.target.value)} />
          </ArgonBox>
          <ArgonBox display="flex" alignItems="center" style={{ paddingLeft: "14px" }}>
            <Switch checked={rememberMe} onChange={handleSetRememberMe} />
            <ArgonTypography
              variant="button"
              fontWeight="regular"
              onClick={handleSetRememberMe}
              sx={{ cursor: "pointer", userSelect: "none" }}
            >
              &nbsp;&nbsp;Remember me
            </ArgonTypography>
          </ArgonBox>
          <ArgonBox mb={2} display="flex" justifyContent="center" pt={3}>
            <ArgonButton
              color="info"
              size="large"
              type="submit"
              style={{ width: "70%" }}
            >
              Sign In
            </ArgonButton>
          </ArgonBox>


          <ArgonBox mt={3} textAlign="center">
            <ArgonTypography variant="button" color="text" fontWeight="regular">
              Don&apos;t have an account?{" "}
              <ArgonTypography
                component={Link}
                to="/authentication/sign-up"
                variant="button"
                color="info"
                fontWeight="medium"
              >
                Sign up
              </ArgonTypography>
            </ArgonTypography>
          </ArgonBox>
        </ArgonBox>
      </Card>
    </CoverLayout>
  );
}

export default Illustration;
