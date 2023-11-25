import { LinearProgress, makeStyles, Typography } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import CoinInfo from "./CoinInfo";
import { SingleCoin } from "./Config/api";
import { numberWithCommas } from "./CoinsTable";
import { CryptoState } from "./CryptoContext";
import { useCookies } from "react-cookie";
import { useToast } from "@chakra-ui/react";

const CoinPage = () => {

  const { isSwitchOn, setIsSwitchOn } = CryptoState();
    const [cookies, setCookie, removeCookie] = useCookies(["user"]);

    const toast = useToast();
    const { id } = useParams();
    const addtowatch = async (e) => {
      e.preventDefault();
  
      const response = await fetch(
        "http://localhost:8000/api/stocks/addstocks",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: cookies.UserId,
            coinid: id,
          }),
        }
      );
      const json = await response.json();
      console.log(json)
      if (json.success) {
        toast({
            title: "Successfull",
            description: "Added to watchlist",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "bottom-left",
          });
      } else {
        toast({
            title: "Error Occured!",
            description: "Try again",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom-left",
          });
      }
    };


  
  const [coin, setCoin] = useState();

  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));

    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const useStyles = makeStyles((theme) => ({
    container: {
      display: "flex",
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        alignItems: "center",
      },
    },
    sidebar: {
      width: "30%",
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: 25,
      borderRight: "2px solid grey",
    },
    heading: {
      fontWeight: "bold",
      marginBottom: 20,
      fontFamily: "Montserrat",
      color: 'red'
    },
    description: {
      width: "100%",
      fontFamily: "Montserrat",
      padding: 25,
      paddingBottom: 15,
      paddingTop: 0,
      textAlign: "justify",
    },
    marketData: {
      alignSelf: "start",
      padding: 25,
      paddingTop: 10,
      width: "100%",
      [theme.breakpoints.down("md")]: {
        display: "flex",
        justifyContent: "space-around",
      },
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        alignItems: "center",
      },
      [theme.breakpoints.down("xs")]: {
        alignItems: "start",
      },
    },
  }));

  const classes = useStyles();

  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  return (
    <div className={`${isSwitchOn?"bg-gray-700":"bg-white"}`}>
    <div className={classes.container}>
      <div className={classes.sidebar}>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography variant="h3" className={classes.heading}>
          {coin?.name}
        </Typography>
        <div className={`${isSwitchOn?"text-white":"bg-white"}`}>
        <Typography variant="subtitle1" className={classes.description}>
          {ReactHtmlParser(coin?.description.en.split(". ")[0])}.
        </Typography>
        
        <div className={classes.marketData}>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {numberWithCommas(coin?.market_cap_rank)}
            </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </span>
        </div>
        </div>
        <button
              class="h-10 px-5 m-2 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg hover:bg-indigo-800 h-12 px-6 m-2 text-lg"
              onClick={addtowatch}
            >
              Add To WATCHLIST
            </button>
      </div>
      <CoinInfo coin={coin} />
    </div>
    </div>
  );
};

export default CoinPage;