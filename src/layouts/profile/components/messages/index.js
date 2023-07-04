/* eslint-disable no-underscore-dangle */
// Distance Learning React components
import SoftBox from "components/SoftBox";

// Distance Learning React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import { Card, Grid, Toolbar } from "@mui/material";

import { useContext, useEffect, useRef, useState } from "react";

import useAxiosPrivate from "hooks/useAxiosPrivate";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { SocketContext } from "context/socket";

import useAuth from "hooks/useAuth";
import SoftButton from "components/SoftButton";
import { navbarContainer } from "examples/Navbars/DashboardNavbar/styles";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import "./styles/styles.css";
import Lottie from "lottie-react-web";
import conversationAnimation from "assets/images/illustrations/981-consultation-flat-edited.json";
import messageAnimation from "assets/images/illustrations/177-envelope-mail-send-flat-edited.json";
import Header from "../Header";
import { useTranslation } from "react-i18next";
import SoftAvatar from "components/SoftAvatar";
import axios from "axios";
import { useLocation } from "react-router-dom";
import ErrorContext from "context/ErrorProvider";

// Connect to the Socket.io server

// Data

function Messages() {
  const { i18n } = useTranslation();
  const { t } = useTranslation("translation", { keyPrefix: "messages" });
  const { socket } = useContext(SocketContext);
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [addEmoji, setAddEmoji] = useState(false);
  const [query, setQuery] = useState(null);
  const [usersList, setUsersList] = useState([]);
  const [conversationsList, setConversationsList] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messagesList, setMessagesList] = useState([]);
  const { showErrorNotification, showInfoNotification } = useContext(ErrorContext);
  const [messageText, setMessageText] = useState("");
  const messagesContainerRef = useRef();
  const sendRef = useRef();
  const [language, setLanguage] = useState("en");
  const [loading, setLoading] = useState(true);
  const [imageUrls, setImageUrls] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  const location = useLocation();
  const messageUser = location.state;

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setAddEmoji(!addEmoji);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleConversationSelect = (conversationId) => {
    if (selectedConversation) {
      socket.emit("leave-conversation", { conversation: selectedConversation });
    }

    setSelectedConversation(conversationId);
    setMessagesList([]);
    socket.emit("join-conversation", conversationId);
  };

  const getImages = (list) => {
    const { CancelToken } = axios;
    const source = CancelToken.source();

    const userImages = list.map((row) => {
      const otherUser = row.members.find((member) => member._id !== auth.userId);

      if (!otherUser) return null;
      return axiosPrivate
        .get(
          `/profile-picture/users/${otherUser._id}/picture`,

          {
            responseType: "blob",
          },
          {
            cancelToken: source.token,
          }
        )
        .then((response) => URL.createObjectURL(response.data))
        .catch((error) => {
          if (axios.isCancel(error)) {
            return () => {
              // cancel the request before component unmounts
              source.cancel();
            };
          }
          showErrorNotification("Error", error.message);
          return null;
        });
    });
    Promise.all(userImages).then(setImageUrls);
  };

  const handleUserClick = (chatUser, list) => {
    const selectedUser = usersList?.find((user) => user._id === chatUser);
    const conversations = list || conversationsList;

    if (selectedUser) {
      const activeConversation = conversations.find((conversation) =>
        conversation.members.some((member) => member._id === selectedUser._id)
      );
      if (activeConversation) {
        showInfoNotification("Conversation with this user alredy exists");
        return;
      }
      const newConversation = {
        name: `${selectedUser.name} ${selectedUser.surname} - ${auth.name} ${auth.surname}`,
        members: [auth.userId, selectedUser._id],
      };
      axiosPrivate
        .post("/conversations/", newConversation)
        .then((response) => {
          const newList = [...conversations, response.data];
          setConversationsList(newList);
          handleConversationSelect(response.data._id);
          setQuery(null);
          getImages(newList);
        })
        .catch((err) => {
          showErrorNotification("Error", err.message);
        });
    }
    setLoading(false);
  };

  useEffect(() => {
    const { CancelToken } = axios;
    const source = CancelToken.source();
    if (usersList) {
      axiosPrivate
        .get(`/conversations/${auth.userId}`, { cancelToken: source.token })
        .then((response) => {
          if (messageUser && response.data.length > 0 && !selectedConversation) {
            const activeConversation = response.data.find((conversation) =>
              conversation.members.some((member) => member._id === messageUser.id)
            );
            if (activeConversation) handleConversationSelect(activeConversation._id);
            else handleUserClick(messageUser.id, response.data);
          } else {
            setConversationsList(response?.data);
            const userImages = response.data.map((row) => {
              let otherUser;
              otherUser = row.members.find((member) => member._id !== auth.userId);

              if (!otherUser) otherUser = row.members[0];
              return axiosPrivate
                .get(
                  `/profile-picture/users/${otherUser._id}/picture`,

                  {
                    responseType: "blob",
                  },
                  {
                    cancelToken: source.token,
                  }
                )
                .then((res) => URL.createObjectURL(res.data))
                .catch((error) => {
                  if (axios.isCancel(error)) {
                    return () => {};
                  }
                  showErrorNotification("Error", error.message);
                  return null;
                });
            });
            if (userImages) Promise.all(userImages).then(setImageUrls);

            setLoading(false);
          }
        })
        .catch((err) => {
          if (axios.isCancel(err)) {
            return;
          }
          showErrorNotification("Error", err.message);
        });
    }

    return () => {
      // cancel the request before component unmounts
      source.cancel();
    };
  }, [usersList]);

  useEffect(() => {
    // Fetch the list of users from the server
    axiosPrivate
      .get("/users")
      .then((response) => {
        setUsersList(response.data);
      })
      .catch((err) => {
        showErrorNotification("Error", err.message);
      });
  }, []);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessagesList((prevMessages) => [...prevMessages, message]);
    });

    // Listen for new messages

    socket.on("conversation-messages", (messages) => {
      setMessagesList(messages);
    });
  }, []);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messagesList]);

  const handleSendMessage = async (event) => {
    event.preventDefault();
    if (!selectedConversation) {
      return;
    }
    if (messageText.trim() === "") {
      return;
    }
    const newMessage = {
      sender: auth.userId,
      text: messageText,
      conversation: selectedConversation,
    };
    try {
      await socket.emit("send-message", newMessage);
      setMessageText("");
    } catch (err) {
      showErrorNotification("Error", err.message);
    }
  };

  useEffect(() => {
    setLanguage(i18n.language);
  }, [i18n]);

  const renderProfiles = conversationsList?.map((row, index) => {
    // retrieve messages for conversation and sort by timestamp
    row.messages.sort((a, b) => b.timestamp - a.timestamp);

    // extract text of last message and shorten it
    const lastMessage = row.messages[0];
    const shortenedDescription = lastMessage?.text?.slice(0, 30) || " ";
    const otherUser = row.members.find((member) => member._id !== auth.userId);

    return (
      <SoftBox
        key={row._id}
        display="flex"
        alignItems="center"
        p={1}
        mb={1}
        sx={{
          borderRadius: selectedConversation === row._id && 3,
          background: selectedConversation === row._id && "#fafafa",
          boxShadow:
            selectedConversation === row._id && "6px 6px 10px #cbcbcb, 6px 6px 10px #ffffff",
        }}
      >
        <SoftBox mr={2}>
          <SoftAvatar src={imageUrls[index]} alt="something here" size="lg" shadow="md" />
        </SoftBox>
        <SoftBox
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          justifyContent="center"
        >
          <SoftTypography variant="button" fontWeight="medium">
            {otherUser.name} {otherUser.surname}
          </SoftTypography>
          <SoftTypography variant="caption" color="text">
            {shortenedDescription}
          </SoftTypography>
        </SoftBox>
        <SoftBox ml="auto">
          <SoftButton onClick={() => handleConversationSelect(row._id)} variant="text" color="info">
            Message
          </SoftButton>
        </SoftBox>
      </SoftBox>
    );
  });

  return (
    <DashboardLayout>
      <Header stage={1} />
      <SoftBox pt={6} pb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} xl={4}>
            <SoftBox mb={3}>
              <Toolbar sx={(theme) => navbarContainer(theme)}>
                <SoftBox pr={1}>
                  <Autocomplete
                    disablePortal
                    options={usersList}
                    getOptionLabel={(user) =>
                      `${user.name} ${user.surname} ${
                        user.studentNumber ? `(${user.studentNumber})` : ""
                      }`
                    }
                    onChange={(event, value) => setQuery(value ? value._id : "")}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField style={{ paddingTop: 10 }} {...params} label={t("search")} />
                    )}
                  />
                </SoftBox>
              </Toolbar>
              <SoftBox pl={3}>
                <SoftButton onClick={() => handleUserClick(query)}>{t("create")}</SoftButton>
              </SoftBox>
            </SoftBox>
            <SoftBox mb={3}>
              <SoftTypography pb={1} variant="h5">
                {t("conversations")}
              </SoftTypography>
              {conversationsList && conversationsList.length > 0 ? (
                <Card sx={{ height: "auto", boxShadow: "none" }}>
                  <SoftBox pt={2} px={2}>
                    <SoftTypography variant="h6" fontWeight="medium" textTransform="capitalize">
                      {t("conversations")}
                    </SoftTypography>
                  </SoftBox>
                  <SoftBox p={1}>
                    <SoftBox display="flex" flexDirection="column" p={0} m={0}>
                      {renderProfiles}
                    </SoftBox>
                  </SoftBox>
                </Card>
              ) : (
                <SoftBox>{t("noconversations")}</SoftBox>
              )}
            </SoftBox>
          </Grid>
          <Grid item xs={12} xl={8} sx={{ height: "max-content" }}>
            <Card className="chat-conversation">
              <SoftBox m={3}>
                {selectedConversation ? (
                  <>
                    <SoftBox className="chat-header">
                      <SoftTypography variant="h5">
                        {conversationsList.find((conv) => conv._id === selectedConversation)?.name}
                      </SoftTypography>
                    </SoftBox>
                    <SoftBox
                      ref={messagesContainerRef}
                      className="messages-container"
                      display="flex"
                      flexDirection="column"
                      mt={2}
                    >
                      {messagesList && Object.values(messagesList).length > 0 ? (
                        Object.values(messagesList).map((message) => {
                          const sender = usersList.find((user) => user._id === message.sender);
                          const formattedDate = new Date(message.createdAt).toLocaleDateString(
                            [t("lang")],
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          );
                          const formattedTime = new Date(message.createdAt).toLocaleTimeString(
                            [t("lang")],
                            {
                              hour: "numeric",
                              minute: "numeric",
                              hour12: language === "en",
                            }
                          );
                          return (
                            <SoftBox
                              className={`chat-message ${
                                message.sender === auth.userId ? "self" : "other"
                              }`}
                              key={message._id}
                              display="flex"
                              flexDirection="column"
                              sx={{ borderRadius: 3 }}
                            >
                              <SoftTypography
                                className="sender"
                                fontWeight="medium"
                                variant="caption"
                              >{`${sender?.name} ${sender?.surname}`}</SoftTypography>
                              <SoftTypography className="text" variant="button" color="text">
                                {message.text}
                              </SoftTypography>
                              <SoftTypography
                                className="date"
                                variant="caption"
                                pt={2}
                                sx={({ justifyContent: "flex-end" }, { alignSelf: "flex-end" })}
                              >
                                {`${formattedDate} ${formattedTime}`}
                              </SoftTypography>
                            </SoftBox>
                          );
                        })
                      ) : (
                        <Grid container spacing={2} display="flex" alignItems="center">
                          <Grid
                            item
                            xs={12}
                            xl={6}
                            alignItems="flex-center"
                            justifyContent="center"
                            display="flex"
                          >
                            <SoftTypography
                              variant="h5"
                              fontWeight="medium"
                              textTransform="uppercase"
                            >
                              {t("nomessages")}
                            </SoftTypography>
                          </Grid>
                          <Grid item xs={12} xl={6} sx={{ height: "300px" }}>
                            <Lottie
                              options={{
                                animationData: messageAnimation,
                                loop: true,
                                autoplay: true,
                              }}
                            />
                          </Grid>
                        </Grid>
                      )}
                    </SoftBox>
                    <SoftBox
                      display="flex"
                      component="form"
                      role="form"
                      onSubmit={handleSendMessage}
                      justifyContent="flex-end"
                      mt={2}
                    >
                      <SoftInput
                        type="text"
                        placeholder="Type a message..."
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        fullWidth
                      />
                      <SoftButton type="submit">{t("send")}</SoftButton>
                    </SoftBox>
                  </>
                ) : (
                  <Grid container spacing={2} display="flex" alignItems="center">
                    <Grid
                      item
                      xs={12}
                      xl={6}
                      alignItems="flex-center"
                      justifyContent="center"
                      display="flex"
                    >
                      <SoftTypography variant="h5" fontWeight="medium" textTransform="uppercase">
                        {t("select")}
                      </SoftTypography>
                    </Grid>
                    <Grid item xs={12} xl={6} sx={{ height: "400px" }}>
                      <Lottie
                        options={{
                          animationData: conversationAnimation,
                          loop: true,
                          autoplay: true,
                        }}
                      />
                    </Grid>
                  </Grid>
                )}
              </SoftBox>
            </Card>
            <SoftBox ref={sendRef} />
          </Grid>
        </Grid>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Messages;
