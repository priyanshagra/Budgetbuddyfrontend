import React from "react";
import {
  Container,
  MenuItem,
  AppBar,
  Toolbar,
  Typography,
  Select,
} from "@material-ui/core";
import {
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "./CryptoContext";
import { useCookies } from "react-cookie";
import SideDrawer from "../Components/SideDrawer";
const useStyles = makeStyles((theme) => ({
  title: {
    flex: 1,
    color: "gold",
    fontFamily: "Montserrat",
    fontWeight: "bold",
    cursor: "pointer",
  },
}));

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    type: "dark",
  },
});
const Header = (props) => {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const classes = useStyles();
  const history = useNavigate();
  const { currency, setCurrency } = CryptoState();
  console.log(currency);
  return (
    <div>
      <ThemeProvider>
        <AppBar color="transparent" position="static">
          <Container>
            <Typography
              className={classes.title}
              variant="h6"
            >
              {<SideDrawer />}
            </Typography>
            <Toolbar>
              {(cookies.name || props.dash) && (
                <Typography
                  className={classes.title}
                  variant="h6"
                  onClick={() => history("/")}
                >
                  <span class="">Dashboard</span>
                </Typography>
              )}
              <Typography
                className={classes.title}
                variant="h6"
                onClick={() => history("/stocks")}
              >
                <span class="">Stocks/cryptos</span>
              </Typography>
              <Typography
                className={classes.title}
                variant="h6"
                onClick={() => history("/income")}
              >
                <span class="">Income</span>
              </Typography>
              <Typography
                className={classes.title}
                variant="h6"
                onClick={() => history("/expenses")}
              >
                <span class="">Expenses</span>
              </Typography>
              <Typography
                className={classes.title}
                variant="h6"
                onClick={() => history("/setting")}
              >
                <span class="">Setting</span>
              </Typography>
              <Typography
                className={classes.title}
                variant="h6"
                onClick={() => history("/chats")}
              >
                <span class="">Chats</span>
              </Typography>
              <Select
                variant="outlined"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={currency}
                style={{ width: 100, height: 40, marginLeft: 15 }}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <MenuItem value={"USD"}>USD</MenuItem>
                <MenuItem value={"INR"}>INR</MenuItem>
              </Select>
            </Toolbar>
          </Container>
        </AppBar>
      </ThemeProvider>
    </div>
  );
};

export default Header;
