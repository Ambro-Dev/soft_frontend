/* eslint-disable react/jsx-key */
/**
=========================================================
* Soft UD - Demo - v4.0.0
=========================================================

* Product Page: https://www.gwarant-service.pl/product/soft-ui-dashboard-react
* Copyright 2022 Gwarant-Service (https://www.gwarant-service.pl)

Coded by Ambro-Dev

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Soft UD - Demo components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UD - Demo examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import ProfilesList from "examples/Lists/ProfilesList";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";

// Overview page components
import Header from "layouts/profile/components/Header";

import useAuth from "hooks/useAuth";
import { useEffect, useState } from "react";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { useTranslation } from "react-i18next";

function Overview() {
  const { t } = useTranslation("translation", { keyPrefix: "profile" });
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const { auth } = useAuth();
  const [courses, setCourses] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const [picture, setPicture] = useState();
  const [loading, setLoading] = useState(true);
  const [conversationList, setConversationList] = useState();

  useEffect(() => {
    axiosPrivate
      .get(`/profile-picture/users/${auth.userId}/picture`, { responseType: "blob" })
      .then((response) => {
        setPicture(URL.createObjectURL(response.data));
      })
      .catch((error) => {
        console.error("Error fetching image:", error);
      });

    const fetchUserCourses = async () => {
      try {
        const { data } = await axiosPrivate.get(`/users/${auth.userId}/courses`);
        setCourses(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    const fetchTeacherCourses = async () => {
      try {
        const { data } = await axiosPrivate.get(`/users/teacher/${auth.userId}/courses`);
        setCourses(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    if (auth.roles.includes(5150)) {
      fetchTeacherCourses();
    } else {
      fetchUserCourses();
    }

    const getConversations = () => {
      axiosPrivate.get(`conversations/${auth.userId}`).then((response) => {
        if (response.data && response.data.length > 0) {
          const conversationObjects = response.data.map((conversation) => {
            // retrieve messages for conversation and sort by timestamp
            conversation.messages.sort((a, b) => b.timestamp - a.timestamp);

            // extract text of last message and shorten it
            const lastMessage = conversation.messages[0];
            if (!lastMessage) return "";
            const shortenedDescription = lastMessage.text.slice(0, 30);
            const otherUser = conversation.members.find((member) => member._id !== auth.userId);

            if (!otherUser) {
              return null;
            }

            // create conversation object
            return {
              key: conversation._id,
              user: otherUser._id,
              name: `${otherUser.name} ${otherUser.surname}`,
              description: shortenedDescription,
              action: {
                type: "internal",
                route: "/profile/messages",
                color: "info",
                label: [t("message")],
              },
            };
          });
          setConversationList(conversationObjects.filter(Boolean));
        }
      });
    };
    getConversations();
  }, [auth.userId]);

  return (
    <DashboardLayout>
      <Header stage={0} />
      <SoftBox mt={5} mb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} xl={4}>
            <ProfileInfoCard
              title={t("profileInfo")}
              info={{
                [t("fullname")]: `${auth.name} ${auth.surname}`,
                [t("email")]: `${auth.email}`,
              }}
            />
          </Grid>
          <Grid item xs={12} xl={4}>
            {conversationList && conversationList.length > 0 ? (
              <ProfilesList title={t("conversations")} profiles={conversationList} shadow={false} />
            ) : (
              <SoftBox>{t("noconversations")}</SoftBox>
            )}
          </Grid>
        </Grid>
      </SoftBox>
      <SoftBox mb={3}>
        <Card>
          <SoftBox pt={2} px={2}>
            <SoftBox mb={0.5}>
              <SoftTypography variant="h6" fontWeight="medium">
                {t("courses")}
              </SoftTypography>
            </SoftBox>
            <SoftBox mb={1}>
              <SoftTypography variant="button" fontWeight="regular" color="text">
                {t("allcourses")}
              </SoftTypography>
            </SoftBox>
          </SoftBox>
          <SoftBox p={2}>
            {courses.length > 0 ? (
              <Grid container spacing={3}>
                {courses.map((course) => (
                  <Grid item xs={12} md={6} xl={3} key={course._id}>
                    <DefaultProjectCard
                      image={`${serverUrl}/${course.pic}`}
                      title={`${course.name}`}
                      description={`${course.teacherId.name} ${course.teacherId.surname}`}
                      action={{
                        type: "internal",
                        route: `/courses/course-info/${course._id}`,
                        color: "info",
                        label: `${t("gotocourse")}`,
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <SoftBox>
                <SoftTypography>Loading</SoftTypography>
              </SoftBox>
            )}
          </SoftBox>
        </Card>
      </SoftBox>

      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
