/* eslint-disable no-underscore-dangle */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/button-has-type */
/**
=========================================================
* Distance Learning React - v1.1.0
=========================================================

Coded by Ambro-Dev

*/

import { useContext, useEffect, useMemo, useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";

// Distance Learning React components
import SoftBox from "components/SoftBox";

// Distance Learning React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Calendar from "examples/Calendar";

// Widgets page components
import UpcomingEvents from "layouts/widgets/components/UpcomingEvents";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { useNavigate, useParams } from "react-router-dom";
import { SocketContext } from "context/socket";
import useAuth from "hooks/useAuth";
import SoftTypography from "components/SoftTypography";
import SoftEditor from "components/SoftEditor";
import { Card } from "@mui/material";
import OrderInfo from "./components/OrderInfo";
import OrderList from "./components/order-list";
import UploadFile from "./components/UploadFile/index";
import CourseEdit from "./components/CourseEdit";
import { useTranslation } from "react-i18next";
import ErrorContext from "context/ErrorProvider";

// Data

function Widgets() {
  const { t } = useTranslation("translation", { keyPrefix: "courseinfo" });
  const { auth } = useAuth();
  const navigate = useNavigate();
  const params = useParams();
  const courseId = params.id;
  const [calendarEventsData, setCalendarEventsData] = useState([]);
  const [nextEvents, setNextEvents] = useState([]);
  const { socket } = useContext(SocketContext);
  const axiosPrivate = useAxiosPrivate();
  const [description, setDescription] = useState();
  const [editing, setEditing] = useState(false);
  const [reload, setReload] = useState(false);
  const { showErrorNotification, showSuccessNotification } = useContext(ErrorContext);
  const [picture, setPicture] = useState(null);
  const [newDescription, setNewDescription] = useState();

  const handleOpen = async (info) => {
    info.jsEvent.preventDefault();
    const selectedEvent = {
      title: info.event.title,
      start: info.event.start,
      end: info.event.end,
      description: info.event.extendedProps.description,
      _id: info.event.extendedProps._id,
      url: info.event.url,
    };

    navigate("/pages/account/invoice", { state: selectedEvent });
  };

  useEffect(() => {
    // Make API call using Axios
    axiosPrivate
      .get(`/events/${courseId}`)
      .then((response) => {
        // Update state with fetched data
        setCalendarEventsData(response.data);
        const currentDateTime = new Date();

        const futureEvents = response.data.filter((event) => {
          const eventStartDate = new Date(event.start); // convert start date to Date object
          return eventStartDate >= currentDateTime; // filter events that start now or in the future
        });
        setNextEvents(futureEvents);
      })
      .catch((error) => {
        showErrorNotification("Error", error.message);
      });

    axiosPrivate
      .get(`/courses/${courseId}`)
      .then((response) => {
        // Update state with fetched data
        const { data } = response;
        setDescription(data.description);
      })
      .catch((error) => {
        showErrorNotification("Error", error.message);
      });

    socket.emit("join-course", courseId);

    socket.on("event", (event) => {
      setCalendarEventsData((prevEvents) => [...prevEvents, event]);
    });

    return () => {
      socket.emit("leave-course", courseId);
    };
  }, [reload]);

  const handleSave = () => {
    const editCourse = {
      course: courseId,
      description: newDescription !== description ? newDescription : undefined,
      picture: picture || undefined,
    };
    if (description !== newDescription || picture) {
      axiosPrivate
        .put("/courses/edit-course", editCourse)
        .then((response) => {
          showSuccessNotification(response.data.message);
          setTimeout(1000);
          setEditing(!editing);
          setReload(!reload);
        })
        .catch((error) => showErrorNotification("Error", error.message));
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox my={3}>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            {auth.roles.includes(5150) ? (
              <Grid item xs={12} sm={6} lg={5}>
                <CourseEdit
                  courseId={courseId}
                  setEditing={setEditing}
                  editing={editing}
                  handleSave={handleSave}
                  setPicture={setPicture}
                />
              </Grid>
            ) : (
              <Grid item xs={12} sm={6} lg={5}>
                <OrderInfo courseId={courseId} />
              </Grid>
            )}
            <Grid item xs={12} sm={6} lg={7}>
              <Card mb={2}>
                {auth.roles.includes(5150) ? (
                  editing ? (
                    <SoftBox p={2}>
                      <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                        <SoftTypography
                          component="label"
                          variant="h6"
                          fontWeight="medium"
                          color="text"
                        >
                          {t("descinfo")}
                        </SoftTypography>
                      </SoftBox>
                      <SoftBox sx={{ overflow: "auto", maxHeight: 250 }}>
                        <SoftEditor value={description} onChange={setDescription} />
                      </SoftBox>
                    </SoftBox>
                  ) : (
                    <SoftBox p={2}>
                      <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                        <SoftTypography
                          component="label"
                          variant="h6"
                          fontWeight="medium"
                          color="text"
                        >
                          {t("descinfo")}
                        </SoftTypography>
                      </SoftBox>
                      <SoftBox sx={{ overflow: "auto", maxHeight: 250 }}>
                        <SoftTypography
                          color="text"
                          variant="body2"
                          dangerouslySetInnerHTML={{ __html: description }}
                        />
                      </SoftBox>
                    </SoftBox>
                  )
                ) : (
                  <SoftBox p={2}>
                    <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                      <SoftTypography
                        component="label"
                        variant="h6"
                        fontWeight="medium"
                        color="text"
                      >
                        {t("descinfo")}
                      </SoftTypography>
                    </SoftBox>
                    <SoftBox sx={{ overflow: "auto", maxHeight: 250 }}>
                      <SoftTypography
                        color="text"
                        variant="body2"
                        dangerouslySetInnerHTML={{ __html: description }}
                      />
                    </SoftBox>
                  </SoftBox>
                )}
              </Card>
            </Grid>
          </Grid>
        </SoftBox>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={5}>
            {useMemo(() => (
              <Calendar
                header={{ title: `${t("caltitle")}` }}
                initialView="dayGridMonth"
                events={calendarEventsData}
                eventClick={handleOpen}
                locale={t("callang")}
              />
            ))}
          </Grid>
          <Grid item xs={12} lg={3}>
            <UpcomingEvents events={nextEvents} courseId={courseId} />
          </Grid>
          <Grid item xs={12} lg={4}>
            <UploadFile courseId={courseId} />
          </Grid>
        </Grid>
      </SoftBox>
      <OrderList courseId={courseId} />
      <Footer />
    </DashboardLayout>
  );
}

export default Widgets;
