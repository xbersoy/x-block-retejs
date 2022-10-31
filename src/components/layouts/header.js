import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Cmenu from "../utils/cmenu";
import UseAnimations from "react-useanimations";
import drpano2 from "../../icons/favicon.png";
import drpano from "../../icons/logo_headerDrPano.png";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  menuButton: {
    marginRight: theme.spacing(1)
  },
  logo: {
    maxWidth: 160
  },
  logo2: {
    maxWidth: 70
  },
  title: {
    flexGrow: 1
  }
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Cmenu />
        <img src={drpano} alt="logo" className={classes.logo} />
        <Typography variant="h6" className={classes.title} />
        <UseAnimations animationKey="activity" size={46} />
      </Toolbar>
    </AppBar>
  );
}
