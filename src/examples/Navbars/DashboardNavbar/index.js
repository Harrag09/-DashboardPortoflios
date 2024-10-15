import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Icon,
  TextField,
  Box,
  Badge,
  useMediaQuery,
} from "@mui/material";
import ArgonBox from "components/ArgonBox";
import Breadcrumbs from "examples/Breadcrumbs";
import NotificationItem from "examples/Items/NotificationItem";
import { useArgonController, setTransparentNavbar, setMiniSidenav } from "context";
import team2 from "assets/images/team-2.jpg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";

function DashboardNavbar({ absolute, light, isMini }) {
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useArgonController();
  const { miniSidenav, transparentNavbar, fixedNavbar } = controller;
  const [openMenu, setOpenMenu] = useState(false);
  const route = useLocation().pathname.split("/").slice(1);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  useEffect(() => {
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    const handleTransparentNavbar = () => {
      setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    };

    window.addEventListener("scroll", handleTransparentNavbar);
    handleTransparentNavbar();

    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);

  const renderMenu = () => (
    <Menu anchorEl={openMenu} open={Boolean(openMenu)} onClose={handleCloseMenu} sx={{ mt: 2 }}>
      <MenuItem onClick={handleCloseMenu}>
        <NotificationItem image={<img src={team2} alt="person" />} title={["New message", "from Laur"]} date="13 minutes ago" />
      </MenuItem>
      <MenuItem onClick={handleCloseMenu}>
        <NotificationItem image={<img src={logoSpotify} alt="album" />} title={["New album", "by Travis Scott"]} date="1 day" />
      </MenuItem>
      <MenuItem onClick={handleCloseMenu}>
        <NotificationItem color="secondary" image={<Icon fontSize="small">payment</Icon>} title={["", "Payment successfully completed"]} date="2 days" />
      </MenuItem>
    </Menu>
  );

  return (
    <AppBar position={absolute ? "absolute" : navbarType} color="transparent" sx={{ boxShadow: 3, bgcolor: 'white', transition: 'background-color 0.3s' }}>
      <Toolbar>
        <ArgonBox flexGrow={1}>
          <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} light={transparentNavbar ? light : false} />
        </ArgonBox>
        
        <Box display="flex" alignItems="center" gap={2}>
          
          <IconButton color="inherit" onClick={handleMiniSidenav}>
            <Icon>{miniSidenav ? "menu_open" : "menu"}</Icon>
          </IconButton>
          
          <IconButton color="inherit" onClick={handleOpenMenu}>
            <Badge badgeContent={3} color="secondary">
              <Icon>notifications</Icon>
            </Badge>
          </IconButton>
          {renderMenu()}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

DashboardNavbar.defaultProps = {
  absolute: false,
  light: true,
  isMini: false,
};

DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default DashboardNavbar;
