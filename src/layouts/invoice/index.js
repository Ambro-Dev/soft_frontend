/* eslint-disable no-underscore-dangle */
/**
=========================================================
* Distance Learning React - v1.1.0
=========================================================

Coded by Ambro-Dev

*/

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Distance Learning React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";


// Distance Learning React context
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { useLocation, useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";
import { useEffect, useState } from "react";
import useAuth from "hooks/useAuth";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useTranslation } from "react-i18next";

function Invoice() {
  const { t } = useTranslation("translation", { keyPrefix: "seeevent" });
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const [course, setCourse] = useState();
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const navigate = useNavigate();

  const location = useLocation();
  const selectedEvent = location.state;

  const sendEvent = {
    _id: selectedEvent._id,
  };

  useEffect(() => {
    if (!selectedEvent) {
      navigate("/profile/profile-overview");
    }

    axiosPrivate
      .get(`/courses/${selectedEvent._id}/event`)
      .then((response) => {
        setCourse(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox mt={{ xs: 4, md: 10 }} mb={{ xs: 4, md: 8 }}>
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={10} md={8}>
            <Card>
              {/* Invoice header */}
              <SoftBox p={3}>
                <Grid container justifyContent="space-between">
                  <Grid item xs={12} md={4}>
                    <SoftBox
                      component="img"
                      src={course && `${serverUrl}/${course.pic}`}
                      width="25%"
                      p={1}
                      mb={1}
                      sx={{
                        cursor: "pointer",
                        ":hover": {
                          cursor: "pointer",
                        },
                      }}
                      onClick={() => navigate(`/courses/course-info/${course?._id}`)}
                    />
                    <SoftTypography variant="h6" fontWeight="medium">
                      {course && course.name}
                    </SoftTypography>
                  </Grid>
                  <Grid item xs={12} md={7} lg={3}>
                    <SoftBox width="100%" textAlign={{ xs: "left", md: "right" }} mt={6}>
                      <SoftBox mt={1}>
                        <SoftTypography
                          component="span"
                          variant="h6"
                          fontWeight="regular"
                          display="flex"
                          justifyContent="end"
                          color="secondary"
                        >
                          {auth.roles.includes(5150) ? (
                            <>
                              {!selectedEvent.url?.includes("video-lesson") ? (
                                <SoftButton
                                  variant="gradient"
                                  color="success"
                                  onClick={() =>
                                    navigate("/ecommerce/products/edit-product", {
                                      state: sendEvent,
                                    })
                                  }
                                >
                                  {t("edit")}
                                </SoftButton>
                              ) : (
                                <SoftButton
                                  variant="gradient"
                                  color="success"
                                  href={selectedEvent.url}
                                  target="_blank"
                                >
                                  {t("join")}
                                </SoftButton>
                              )}
                              <SoftButton variant="gradient" color="error" sx={{ ml: 1 }}>
                              {t("delete")}
                              </SoftButton>
                            </>
                          ) : (
                            <SoftBox>
                              {selectedEvent.url?.includes("video-lesson") ? (
                                <SoftButton
                                  variant="gradient"
                                  color="success"
                                  href={selectedEvent.url}
                                  target="_blank"
                                  disabled={new Date(selectedEvent.start) > new Date()} // check if start date is in the future
                                >
                                  {new Date(selectedEvent.start) > new Date()
                                    ? [t("eventnotstarted")]
                                    : [t("join")]}
                                </SoftButton>
                              ) : (
                                <SoftButton
                                  variant="gradient"
                                  color="success"
                                  onClick={() =>
                                    navigate("/ecommerce/products/new-product", {
                                      state: sendEvent,
                                    })
                                  }
                                  disabled={new Date(selectedEvent.start) > new Date()} // check if start date is in the future
                                >
                                  {new Date(selectedEvent.start) > new Date()
                                    ? [t("examnotavailable")]
                                    : [t("joinexam")]}
                                </SoftButton>
                              )}
                            </SoftBox>
                          )}
                        </SoftTypography>
                      </SoftBox>
                    </SoftBox>
                  </Grid>
                </Grid>
                <SoftBox mt={{ xs: 5, md: 10 }}>
                  <Grid container justifyContent="space-between">
                    <Grid item xs={12} md={4}>
                      <SoftTypography
                        variant="h6"
                        color="secondary"
                        fontWeight="regular"
                      >
                        {t("title")}
                      </SoftTypography>
                      <SoftTypography variant="h5" fontWeight="medium">
                        {selectedEvent.title}
                      </SoftTypography>
                    </Grid>
                    <Grid item xs={12} md={7} lg={5}>
                      <SoftBox
                        width="100%"
                        display="flex"
                        flexDirection={{ xs: "column", md: "row" }}
                        alignItems={{ xs: "flex-start", md: "center" }}
                        textAlign={{ xs: "left", md: "right" }}
                        mt={{ xs: 3, md: 0 }}
                      >
                        <SoftBox width="50%">
                          <SoftTypography
                            variant="h6"
                            color="secondary"
                            fontWeight="regular"
                          >
                            {t("start")}
                          </SoftTypography>
                        </SoftBox>
                        <SoftBox width="50%">
                          <SoftTypography variant="h6" fontWeight="medium">
                            {selectedEvent.start.toLocaleString("en-US")}
                          </SoftTypography>
                        </SoftBox>
                      </SoftBox>
                      <SoftBox
                        width="100%"
                        display="flex"
                        flexDirection={{ xs: "column", md: "row" }}
                        alignItems={{ xs: "flex-start", md: "center" }}
                        textAlign={{ xs: "left", md: "right" }}
                      >
                        <SoftBox width="50%">
                          <SoftTypography
                            variant="h6"
                            color="secondary"
                            fontWeight="regular"
                          >
                            {t("end")}
                          </SoftTypography>
                        </SoftBox>
                        <SoftBox width="50%">
                          <SoftTypography variant="h6" fontWeight="medium">
                            {selectedEvent.end.toLocaleString("en-US")}
                          </SoftTypography>
                        </SoftBox>
                      </SoftBox>
                    </Grid>
                  </Grid>
                </SoftBox>
              </SoftBox>

              {/* Invoice table */}
              <SoftBox p={3}>
                <SoftBox width="100%" overflow="auto">
                  <SoftTypography
                    variant="h6"
                    color="secondary"
                    fontWeight="regular"
                  >
                    {t("description")}
                  </SoftTypography>
                  <Divider variant="middle" />
                  <SoftTypography variant="button" fontWeight="regular">
                    {selectedEvent.description}
                  </SoftTypography>
                </SoftBox>
              </SoftBox>

              {/* Invoice footer */}
              <SoftBox p={3} mt={7}>
                <Grid container>
                  <Grid item xs={12} lg={5}>
                    <Divider variant="middle" />
                    <SoftTypography variant="h6" fontWeight="regular">
                    {t("files")}
                    </SoftTypography>
                    <SoftBox mt={1} mb={2} lineHeight={0}>
                      <AttachFileIcon fontSize="large" />
                    </SoftBox>
                  </Grid>
                  <Grid item xs={12} lg={7}>
                    <SoftBox
                      width="100%"
                      height={{ xs: "auto", md: "100%" }}
                      display="flex"
                      justifyContent={{ xs: "flex-start", md: "flex-end" }}
                      alignItems="flex-end"
                      mt={{ xs: 2, md: 0 }}
                    >
                      <SoftButton variant="gradient" color="warning" onClick={handleClick}>
                      {t("close")}
                      </SoftButton>
                    </SoftBox>
                  </Grid>
                </Grid>
              </SoftBox>
            </Card>
          </Grid>
        </Grid>
      </SoftBox>
    </DashboardLayout>
  );
}

export default Invoice;
