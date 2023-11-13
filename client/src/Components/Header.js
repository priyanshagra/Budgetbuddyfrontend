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
            <Toolbar>
              {(cookies.name||props.dash )&& (
                <Typography
                  className={classes.title}
                  variant="h6"
                  onClick={() => history("/")}
                >
                  Dashboard
                </Typography>
                
              )}
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
