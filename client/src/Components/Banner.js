import { Container, makeStyles, Typography } from "@material-ui/core";
import Carousel from "./Carousel";
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
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { CryptoState } from "./CryptoContext";
import axios from "axios";
import { SingleCoin } from "./Config/api";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  banner: {
    backgroundImage: "url(./img.png)",
  },
  bannerContent: {
    height: 400,
    display: "flex",
    flexDirection: "column",
    paddingTop: 25,
    justifyContent: "space-around",
  },
  tagline: {
    display: "flex",
    height: "40%",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  },
  carousel: {
    height: "50%",
    display: "flex",
    alignItems: "center",
  },
}));

function Banner() {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const datainitial = [];
  const [datas, setdata] = useState(datainitial);
  const { currency, symbol } = CryptoState();
  const history = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/stocks/fetchallstocks",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "auth-token": cookies.UserId,
            },
          }
        );

        const json = await response.json();

        const newData = await Promise.all(
          json.stock.map(async (orders) => {
            const data = await axios.get(SingleCoin(orders.coinid));
            return data;
          })
        );

        setdata((prevData) => [...prevData, ...newData]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [cookies.UserId]);

  const classes = useStyles();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  return (
    <div className={classes.banner}>
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
              <ul role="list" className="divide-y divide-gray-100">
                {datas.map((data1) => (
                  <li className="flex justify-between gap-x-6 py-5">
                    <button  onClick={() => history(`/coins/${data1.data.name.toLowerCase()}`)}><div className="flex min-w-0 gap-x-4">
                      <img
                        className="h-12 w-12 flex-none rounded-full bg-gray-50"
                        src={data1.data.image.small}
                        alt=""
                      />
                      <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-gray-900">
                          {data1.data.name}
                        </p>
                        <p className="text-sm font-semibold leading-6 text-gray-900">
                          price:{symbol}{" "}
                          {
                            data1.data.market_data.current_price[
                              currency.toLowerCase()
                            ]
                          }
                        </p>
                      </div>
                    </div></button>
                  </li>
                ))}
              </ul>
        
          </DrawerBody>

          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>

      <Container className={classes.bannerContent}>
        <div className={classes.tagline}>
          <Typography
            variant="h2"
            style={{
              color: "darkgrey",
              fontWeight: "bold",
              marginBottom: 15,
              fontFamily: "Montserrat",
            }}
          >
            <h1 className="text-red-700">Eliter $ Crypto</h1>
          </Typography>
          <Typography
            variant="subtitle2"
            style={{
              color: "darkgrey",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
            }}
          >
            <h2 className="text-xl text-yellow-500">Get all the Info regarding your favorite Crypto Currency</h2>
          </Typography>
        </div>
        <Carousel />
      </Container>
    </div>
  );
}

export default Banner;
