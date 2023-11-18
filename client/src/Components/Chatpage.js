import { Box } from "@chakra-ui/layout";
import { useState } from "react";
import Chatbox from "../Components/Chatbox";
import MyChats from "../Components/MyChats";


const Chatpage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <div style={{ width: "100%" }}>
      {/* <Box d="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
        {<MyChats fetchAgain={fetchAgain} />}
        {<Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
      </Box> */}
    </div>
  );
};

export default Chatpage;
