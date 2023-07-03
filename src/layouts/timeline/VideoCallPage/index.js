import React, { useContext, useEffect } from "react";
import { VideoSDKMeeting } from "@videosdk.live/rtc-js-prebuilt";
import useAuth from "hooks/useAuth";
import useAxiosPrivate from "hooks/useAxiosPrivate";

import PropTypes from "prop-types";
import { SocketContext } from "context/socket";

export default function VideoCallPage({ meetingId }) {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    socket.emit("join-call", { eventId: meetingId, userId: auth.userId });

    return () => {
      socket.emit("leave-call", { eventId: meetingId, userId: auth.userId });
    };
  }, []);

  useEffect(() => {
    let title;
    const apiKey = process.env.REACT_APP_VIDEOSDK_API_KEY;
    const name = `${auth.name} ${auth.surname}`;

    axiosPrivate.get(`events/${meetingId}`).then((response) => {
      const event = response.data;
      title = event.title;
    });

    const config = {
      name,
      meetingId,
      apiKey,

      containerId: null,
      participantId: auth.userId,

      micEnabled: true,
      webcamEnabled: true,
      participantCanToggleSelfWebcam: true,
      participantCanToggleSelfMic: true,
      participantCanLeave: true, // if false, leave button won't be visible
      chatEnabled: true,
      screenShareEnabled: true,
      whiteboardEnabled: true,
      raiseHandEnabled: true,
      theme: "LIGHT", // "dark" | "light

      recording: {
        autoStart: false, // auto start recording on participant joined
        enabled: false,
        webhookUrl: "https://www.videosdk.live/callback",
        awsDirPath: `/meeting-recordings/${meetingId}/`, // automatically save recording in this s3 path
      },

      livestream: {
        autoStart: false,
        enabled: false,
      },

      layout: {
        type: "SIDEBAR", // "SPOTLIGHT" | "SIDEBAR" | "GRID"
        priority: "SPEAKER", //  | "PIN",
        // gridSize: 3,
      },

      branding: {
        enabled: true,
        logoURL: "https://mans.org.pl/wp-content/uploads/2022/03/logo-mans-www.png",
        name: "Soft UD",
        poweredBy: false,
      },

      permissions: {
        pin: true,
        askToJoin: false, // Ask joined participants for entry in meeting
        toggleParticipantMic: auth.roles.includes(5150), // Can toggle other participant's mic
        toggleParticipantWebcam: auth.roles.includes(5150), // Can toggle other participant's webcam
        toggleVirtualBackground: false,
        drawOnWhiteboard: auth.roles.includes(5150), // Can draw on whiteboard
        toggleWhiteboard: auth.roles.includes(5150), // Can toggle whiteboard
        toggleRecording: auth.roles.includes(5150), // Can toggle meeting recording
        toggleLivestream: false, // can toggle live stream
        removeParticipant: auth.roles.includes(5150), // Can remove participant
        endMeeting: auth.roles.includes(5150), // Can end meeting
        changeLayout: auth.roles.includes(5150), // can change layout
        canCreatePoll: false,
      },

      joinScreen: {
        visible: true, // Show the join screen ?
        title, // Meeting title
        meetingUrl: window.location.href, // Meeting joining url
      },

      leftScreen: {
        // visible when redirect on leave not provieded
        actionButton: {
          // optional action button
          label: "MANS", // action button label
          href: "https://mans.org.pl/", // action button href
          onClick: () => {
            // Close the current tab/window
            window.close();
          },
        },
      },

      notificationSoundEnabled: true,

      debug: true, // pop up error during invalid config or netwrok error

      maxResolution: "hd", // "hd" or "sd"

      // For more features check: /prebuilt/guide/prebuilt-video-and-audio-calling/getting-started
    };

    const meeting = new VideoSDKMeeting();
    meeting.init(config);
  }, []);

  return <div />;
}

VideoCallPage.propTypes = {
  meetingId: PropTypes.string.isRequired,
};
