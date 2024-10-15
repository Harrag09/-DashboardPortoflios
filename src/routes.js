import ArgonBox from "components/ArgonBox";
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import Profile from "layouts/profile";
import Home from "layouts/home";
import Information from "layouts/information";
import Account from "layouts/account";

const routes = [
  { type: "title", title: "Profil", key: "Profil-pages" },
  {
    type: "route",
    name: "Profile",
    key: "profile",
    route: "/profile",
    icon: <ArgonBox component="i" color="dark" fontSize="14px" className="ni ni-single-02" />,
    component: <Profile />,
  },
  {
    type: "route",
    name: "Account",
    key: "Account",
    route: "/Account",
    icon: <ArgonBox component="i" color="dark" fontSize="14px" className="ni ni-single-02" />,
    component: <Account />,
  },
  { type: "title", title: "Votre Information", key: "Information-pages" },
  {
    type: "route",
    name: "Votre Information",
    key: "Information",
    route: "/Information",
    icon: <ArgonBox component="i" color="primary" fontSize="14px" className="ni ni-tv-2" />,
    component: <Information />,
  },
  { type: "title", title: "Home", key: "Home-pages" },
  {
    type: "route",
    name: "Home",
    key: "Home",
    route: "/Home",
    icon: <ArgonBox component="i" color="primary" fontSize="14px" className="ni ni-tv-2" />,
    component: <Home />,
  },
  {
    type: "route",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <ArgonBox component="i" color="primary" fontSize="14px" className="ni ni-tv-2" />,
    component: <Dashboard />,
  },
  {
    type: "route",
    name: "Tables",
    key: "tables",
    route: "/tables",
    icon: <ArgonBox component="i" color="warning" fontSize="14px" className="ni ni-calendar-grid-58" />,
    component: <Tables />,
  },
  {
    type: "route",
    name: "Billing",
    key: "billing",
    route: "/billing",
    icon: <ArgonBox component="i" color="success" fontSize="14px" className="ni ni-credit-card" />,
    component: <Billing />,
  },
  { type: "title", title: "Account Pages", key: "account-pages" },
];

export default routes;
