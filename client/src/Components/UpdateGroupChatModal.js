import { ViewIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  FormControl,
  Input,
  useToast,
  Box,
  IconButton,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { ChatState } from "../Components/ChatProvider";
import UserBadgeItem from "../Components/UserBadgeItem";
import UserListItem from "../Components/UserListItem";
import { useCookies } from "react-cookie";
import { CryptoState } from "./CryptoContext";

const UpdateGroupChatModal = ({ fetchMessages, fetchAgain, setFetchAgain }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState();
  const [requests, setrequests] = useState();
  const [money, setmoney] = useState();
  const [moneyloading, setmoneyLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameloading, setRenameLoading] = useState(false);
  const toast = useToast();
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const { currency, symbol,exchangeRatei,exchangeRateu } = CryptoState();
  

  const { selectedChat, setSelectedChat } = ChatState();


  const fetchrequest = async () => {
    // console.log(user._id);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "auth-token": selectedChat._id,
        },
      };

      const { data } = await axios.get(
        "http://localhost:8000/api/request/getreq",
        config
      );
      setrequests(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };


  const handleSubmit = async () => {
    if (!money) {
      toast({
        title: "Please fill all the feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    try {
        setmoneyLoading(true);
      const config = {
          headers: {
              "auth-token": cookies.UserId
            },
        };
      const { data1 } = await axios.post(
        `http://localhost:8000/api/request/`,
        {
          money:( money/selectedChat.users.length).toFixed(2),
          chatid:selectedChat._id,
          users: selectedChat.users,
          currency:currency
        },
        config
      );
      setmoneyLoading(false);
      toast({
        title: "Amount is requested to everyone",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    } catch (error) {
      toast({
        title: "Failed to Create the Chat!",
        description: error.response.data,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
          "auth-token": cookies.UserId,
        },
      };

      const { data } = await axios.get(
        `http://localhost:8000/api/auth/suser?search=${search}`,
        config
      );
      console.log(data);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      setLoading(false);
    }
  };

  const handleRename = async () => {
    if (!groupChatName) return;

    try {
      setRenameLoading(true);
      const config = {
        headers: {
          "auth-token": cookies.UserId,
        },
      };
      const { data } = await axios.put(
        `http://localhost:8000/api/chat/rename`,
        {
          chatId: selectedChat._id,
          chatName: groupChatName,
        },
        config
      );

      console.log(data._id);
      // setSelectedChat("");
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setRenameLoading(false);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setRenameLoading(false);
    }
    setGroupChatName("");
  };

  const handleAddUser = async (user1) => {
    if (selectedChat.users.find((u) => u._id === user1._id)) {
      toast({
        title: "User Already in group!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    if (selectedChat.groupAdmin._id !== cookies.UserId) {
      toast({
        title: "Only admins can add someone!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          "auth-token": cookies.UserId,
        },
      };
      const { data } = await axios.put(
        `http://localhost:8000/api/chat/groupadd`,
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        config
      );

      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
    setGroupChatName("");
  };

  const handleRemove = async (user1) => {
    if (
      selectedChat.groupAdmin._id !== cookies.UserId &&
      user1 !== cookies.UserId
    ) {
      toast({
        title: "Only admins can remove someone!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          "auth-token": cookies.UserId,
        },
      };
      const { data } = await axios.put(
        `http://localhost:8000/api/chat/groupremove`,
        {
          chatId: selectedChat._id,
          userId: user1,
        },
        config
      );

      user1 === cookies.UserId ? setSelectedChat() : setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      fetchMessages();
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
    setGroupChatName("");
  };
  const handleRemove2 = async (user1,request) => {
    if (
      request.paidby != cookies.UserId
      
    ) {
        console.log(request.paidby);
        console.log(cookies.UserId);
      toast({
        title: "Your payment is not confirmed",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          "auth-token": cookies.UserId,
        },
      };
      const { data } = await axios.put(
        `http://localhost:8000/api/request/rem`,
        {
          reqId: request._id,
          userId: user1,
        },
        config
      );
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    
    fetchrequest();
    // eslint-disable-next-line
  },);

  return (
    <>
      <IconButton
        display={{ base: "flex" }}
        icon={<ViewIcon />}
        onClick={onOpen}
      />

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="35px"
            fontFamily="Work sans"
            display="flex"
            justifyContent="center"
          >
            {selectedChat.chatName}
          </ModalHeader>

          <ModalCloseButton />
          <ModalBody display="flex" flexDir="column" alignItems="center">
            <Box w="100%" display="flex" flexWrap="wrap" pb={3}>
              {selectedChat.users.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  admin={selectedChat.groupAdmin}
                  handleFunction={() => handleRemove(u._id)}
                />
              ))}
            </Box>
            {requests&&requests.length!=0&&(<ModalHeader
              fontSize="20px"
              fontFamily="Work sans"
              display="flex"
              justifyContent="center"
            >Money Pending
            </ModalHeader>)}
            <Box w="100%" display="flex" flexWrap="wrap" pb={3}>
              {requests?.map((request) => (
                request?.paidfor?.length>1&&
                <Box w="100%" display="flex" flexWrap="wrap" pb={3}>
                <p>{symbol}{" "}{(request.currency=="INR"?request.money*exchangeRatei:request.money*exchangeRateu).toFixed(2)} each of</p>
                {request.paidfor.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  admin={request.paidby}
                  handleFunction={() => handleRemove2(u._id,request)}
                />
              ))}
               </Box>
              ))}
            </Box>
            <FormControl display="flex">
              <Input
                placeholder="Chat Name"
                mb={3}
                value={groupChatName}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
              <Button
                variant="solid"
                colorScheme="teal"
                ml={1}
                isLoading={renameloading}
                onClick={handleRename}
              >
                Update
              </Button>
            </FormControl>
            <FormControl display="flex">
            <Button
                variant="solid"
                mr={1}
              >
                {symbol}
              </Button>
              <Input
                placeholder="Money Paid for Group"
                mb={3}
                onChange={(e) => setmoney(e.target.value)}
              />
              <Button
                variant="solid"
                colorScheme="teal"
                ml={1}
                isLoading={moneyloading}
                onClick={handleSubmit}
              >
                ADD
              </Button>
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add User to group"
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>

            {loading ? (
              <Spinner size="lg" />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => handleAddUser(user)}
                />
              ))
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={() => handleRemove(cookies.UserId)}
              colorScheme="red"
            >
              Leave Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateGroupChatModal;
