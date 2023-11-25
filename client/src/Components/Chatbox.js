import { Box } from "@chakra-ui/layout";
import "../Components/styles.css";
import SingleChat from "../Components/SingleChat";
import { ChatState } from "../Components/ChatProvider";
import { CryptoState } from "./CryptoContext";

const Chatbox = ({ fetchAgain, setFetchAgain }) => {
  const { isSwitchOn, setIsSwitchOn } = CryptoState();

  const { selectedChat } = ChatState();

  return (
    <Box
      display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir="column"
      p={3}
      w={{ base: "100%", md: "68%" }}
      borderRadius="lg"
      borderWidth="1px"
      className={`${isSwitchOn?"text-black-800":"text-white-900"}`}
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};

export default Chatbox;