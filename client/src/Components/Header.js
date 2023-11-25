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
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Input,
} from "@chakra-ui/react";
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

    "&:hover": {
      cursor: "pointer", // Change the cursor to a pointer on hover
      textDecoration: "underline", // Add underline on hover
    },
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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
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
            <Typography  variant="h6">
              {<SideDrawer />}
            </Typography>
            <Toolbar>
              <div className="block lg:hidden">
                <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
                  Watchlist
                </Button>
                <Drawer
                  isOpen={isOpen}
                  placement="left"
                  onClose={onClose}
                  finalFocusRef={btnRef}
                >
                  <DrawerOverlay />
                  <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Watchlist</DrawerHeader>
                    <DrawerBody>
                      <Typography
                        className={classes.title}
                        variant="h6"
                        onClick={() => history("/")}
                      >
                        <span class="">Dashboard</span>
                      </Typography>

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
                        onClick={() => history("/chats")}
                      >
                        <span class="">Chats</span>
                      </Typography>
                    </DrawerBody>

                    <DrawerFooter></DrawerFooter>
                  </DrawerContent>
                </Drawer>
              </div>

              <Typography
                className={classes.title}
                variant="h6"
                onClick={() => history("/")}
              >
                <span className="hidden lg:block">Dashboard</span>
              </Typography>

              <Typography
                className={classes.title}
                variant="h6"
                onClick={() => history("/stocks")}
              >
                <span className="hidden lg:block">Stocks/cryptos</span>
              </Typography>
              <Typography
                className={classes.title}
                variant="h6"
                onClick={() => history("/income")}
              >
                <span className="hidden lg:block">Income</span>
              </Typography>
              <Typography
                className={classes.title}
                variant="h6"
                onClick={() => history("/expenses")}
              >
                <span className="hidden lg:block">Expenses</span>
              </Typography>
              <Typography
                className={classes.title}
                variant="h6"
                onClick={() => history("/chats")}
              >
                <span className="hidden lg:block">Chats</span>
              </Typography>

              <Select
                variant="outlined"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={currency}
                style={{ width: 100, height: 40, marginLeft: 15 }}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <MenuItem className="border-red-500" value={"USD"}>USD</MenuItem>
                <MenuItem  className=" border-red-500 "value={"INR"}>INR</MenuItem>
              </Select>
            </Toolbar>
          </Container>
        </AppBar>
      </ThemeProvider>
    </div>
  );
};

export default Header;
