import { Link } from "react-router-dom";
import styles from "./navbar.module.css";
import React, { useEffect, useState } from "react";
import { AuthProtect } from "../../util/getUserInfo";
import {
  IconButton,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  Tooltip,
} from "@mui/material";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import ShoppingBasketRoundedIcon from "@mui/icons-material/ShoppingBasketRounded";
import AdminPanelSettingsRoundedIcon from "@mui/icons-material/AdminPanelSettingsRounded";
import { Logout } from "@mui/icons-material";
import { Box } from "@mui/system";
import { removeCookie } from "../../util/cookie";
function Navbar() {
  const [userInfo, setUserInfo]: any = useState();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logout = () => {
    removeCookie("access_token");
    window.location.reload();
  };
  useEffect(() => {
    AuthProtect().then((res: any) => {
      if (res.status === true) setUserInfo(res.data.data);
      else {
        setUserInfo(null);
      }
    });
  }, []);
  return (
    <nav className={styles.navBar}>
      <div className={styles.navContainer}>
        <div className={styles.logo}>
          <Link to="/">invest market</Link>
        </div>
        <div className={styles.links}>
          <ul>
            <li>
              <Link to="/market">MARKET</Link>
            </li>
            <li>
              <Link to="/">SERVICE</Link>
            </li>
            <li>
              <Link to="/">ABOUT US</Link>
            </li>
          </ul>
          <div className={styles.actions}>
            {/* <img src="/images/default-user-image.jpeg" /> */}
            {userInfo ? (
              <>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <Tooltip title="Profile">
                    <IconButton
                      onClick={handleClick}
                      size="small"
                      sx={{ ml: 2 }}
                      aria-controls={open ? "account-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                    >
                      <AccountCircleRoundedIcon
                        sx={{ color: "white" }}
                        fontSize="large"
                      />
                    </IconButton>
                  </Tooltip>
                </Box>

                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem
                    sx={{
                      fontWeight: 600,
                      display: "block",
                      textAlign: "center",
                    }}
                  >
                    {userInfo.name}
                  </MenuItem>
                  <Divider />
                  {userInfo.type === "admin" ? (
                    <MenuItem>
                      <Link
                        to="/admin"
                        style={{
                          textDecoration: "none",
                          color: "rgba(0, 0, 0, 0.87)",
                        }}
                      >
                        <ListItemIcon>
                          <AdminPanelSettingsRoundedIcon fontSize="medium" />
                        </ListItemIcon>
                        Admin
                      </Link>
                    </MenuItem>
                  ) : null}
                  <MenuItem>
                    <ListItemIcon>
                      <ShoppingBasketRoundedIcon fontSize="small" />
                    </ListItemIcon>
                    Orders
                  </MenuItem>
                  <MenuItem onClick={logout}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Link to="/login">LOGIN</Link>
                <Link to="/signup">SIGN UP</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
