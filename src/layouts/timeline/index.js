import React, { useEffect } from "react";
import { VideoSDKMeeting } from "@videosdk.live/rtc-js-prebuilt";
import useAuth from "hooks/useAuth";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import "./styles/index.css";
import SoftBox from "components/SoftBox";

export default function VideoCall() {
  const { id: meetingId } = useParams();
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    let title;
    const apiKey = process.env.REACT_APP_VIDEOSDK_API;
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
      redirectOnLeave: "https://ambro.dev",

      micEnabled: true,
      webcamEnabled: true,
      participantCanToggleSelfWebcam: true,
      participantCanToggleSelfMic: true,
      participantCanLeave: true, // if false, leave button won't be visible

      chatEnabled: true,
      screenShareEnabled: true,
      whiteboardEnabled: true,
      raiseHandEnabled: true,

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
        type: "SPOTLIGHT", // "SPOTLIGHT" | "SIDEBAR" | "GRID"
        priority: "PIN", // "SPEAKER" | "PIN",
        // gridSize: 3,
      },

      branding: {
        enabled: true,
        logoURL: "http://localhost:3000/static/media/soft-logo.9b8693ea4783e10fad4b.png",
        name: "Distance Learning",
        poweredBy: false,
      },

      permissions: {
        pin: true,
        askToJoin: false, // Ask joined participants for entry in meeting
        toggleParticipantMic: true, // Can toggle other participant's mic
        toggleParticipantWebcam: true, // Can toggle other participant's webcam
        drawOnWhiteboard: true, // Can draw on whiteboard
        toggleWhiteboard: true, // Can toggle whiteboard
        toggleRecording: true, // Can toggle meeting recording
        toggleLivestream: true, // can toggle live stream
        removeParticipant: true, // Can remove participant
        endMeeting: true, // Can end meeting
        changeLayout: true, // can change layout
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
          label: "Ambro-Dev", // action button label
          href: "https://ambro.dev/", // action button href
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

  return <SoftBox />;
}
