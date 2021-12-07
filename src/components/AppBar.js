import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { styled } from "@mui/styles";
import { useSelectStatic } from "../features/user/userSlice";
import { useDispatch } from "react-redux";
import { setUser } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Avatar } from "@mui/material";
import { setExams } from "../features/exams/examsSlice";

const useStyles = makeStyles((whatEver, props) => ({
  AppBar: {
    boxShadow: "none",
  },
}));

const CustomToolbar = styled(Toolbar)(({ theme }) => ({
  color: theme?.palette?.primary?.main || "red",
  backgroundColor: "white",
}));

export default function NavBar() {
  //Store context
  const userName = useSelectStatic(["firstName", "lastName"]).join(" ");
  const role = useSelectStatic("role");
  const dispatch = useDispatch();

  //Utils
  const navigate = useNavigate();
  //Styles
  const classes = useStyles();
  const theme = useTheme();
  const findAvatarBgColor = () => {
    switch (role.toLowerCase()) {
      case "student":
        return theme.palette.primary.main;
      case "teacher":
        return theme.palette.secondary.main;
      case "admin":
        return theme.palette.success.main;
      default:
        return theme.palette.primary.main;
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    dispatch(setUser({}));
    dispatch(setExams([]));
    navigate("/login");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className={classes.AppBar}>
        <CustomToolbar theme={theme}>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Avatar sx={{ width: 40, height: 40, bgcolor: findAvatarBgColor() }}>
            {userName[0].toUpperCase()}
          </Avatar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, userSelect: "none" }}
          >
            <List>
              <ListItem>
                <ListItemText
                  primary={userName}
                  secondary={role}
                  primaryTypographyProps={{
                    color: findAvatarBgColor(),
                    fontWeight: "700",
                  }}
                  secondaryTypographyProps={{
                    fontSize: ".8rem",
                    color: "rgba(0,0,0,.3)",
                  }}
                />
              </ListItem>
            </List>
          </Typography>
          <Button
            onClick={handleLogOut}
            color="inherit"
            endIcon={<LogoutRoundedIcon />}
            disableRipple
          >
            Logout
          </Button>
        </CustomToolbar>
      </AppBar>
    </Box>
  );
}
