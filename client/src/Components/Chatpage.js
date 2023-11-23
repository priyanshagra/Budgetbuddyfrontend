import { Box } from "@chakra-ui/layout";
import { useState } from "react";
import Chatbox from "../Components/Chatbox";
import MyChats from "../Components/MyChats";
import { ChatState } from "./ChatProvider";


const Chatpage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { selectedChat, setSelectedChat } = ChatState();

  return (
    <div style={{ width: "100%" }}>
      <Box display="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
        {<MyChats fetchAgain={fetchAgain} />}
        {<Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
      </Box> 
    </div>
  );
};

export default Chatpage;
