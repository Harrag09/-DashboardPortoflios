



// Argon Dashboard 2 MUI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";


// Overview page components
import Header from "layouts/profile/components/Header";



const bgImage =
  "https://st2.depositphotos.com/1152339/7222/i/450/depositphotos_72225845-stock-photo-privacy-concept-personal-information-on.jpg";

function Home() {
  return (
    <DashboardLayout
      sx={{
        backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
          `${linearGradient(
            rgba(gradients.info.main, 0.1),
            rgba(gradients.info.state, 0.1)
          )}, url(${bgImage})`,
        backgroundPositionY: "50%",
      }}
    >
      <Header />
      <h1  color="text" style={{ fontSize:"1.8rem"}}> Votre Information</h1>

  

     

      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Home;
