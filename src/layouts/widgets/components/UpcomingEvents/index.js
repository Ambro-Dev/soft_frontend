/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-underscore-dangle */
/**
=========================================================
* Distance Learning React - v1.1.0
=========================================================

Coded by Gwarant-Service

*/

// @mui material components
import Card from "@mui/material/Card";

// Distance Learning React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Distance Learning React examples
import DefaultItem from "examples/Items/DefaultItem";
import PropTypes from "prop-types";
import SoftButton from "components/SoftButton";
import { useNavigate } from "react-router-dom";
import useAuth from "hooks/useAuth";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

function UpcomingEvents({ events, courseId }) {
  const { i18n } = useTranslation();
  const { t } = useTranslation("translation", { keyPrefix: "courseinfo" });
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [language, setLanguage] = useState("pl");

  const handleOpen = async (e) => {
    e.preventDefault();
    const course = {
      id: courseId,
    };

    navigate("/applications/wizard", { state: course });
  };

  useEffect(() => {
    const handleLanguageChange = () => {
      setLanguage(i18n.language);
    };

    i18n.on("languageChanged", handleLanguageChange);

    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, [i18n]);

  return (
    <Card sx={{ height: "500px" }}>
      <SoftBox
        pt={2}
        px={2}
        pb={1}
        lineHeight={1}
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <SoftTypography variant="h6" fontWeight="medium" pt={1}>
          {t("upcevents")}
        </SoftTypography>
        {auth.roles.includes(5150) && (
          <SoftButton color="success" circular onClick={handleOpen}>
            {t("addevent")}
          </SoftButton>
        )}
      </SoftBox>
      <SoftBox sx={{ overflow: "auto" }}>
        {events && events.length > 0 ? (
          events.map((event, index) => {
            const formattedStartDate = new Date(event.start).toLocaleDateString([t("date")], {
              year: "numeric",
              month: "short",
              day: "numeric",
            });
            const formattedStartTime = new Date(event.start).toLocaleTimeString([t("date")], {
              hour: "numeric",
              minute: "numeric",
              hour12: language === "en",
            });
            const formattedEndDate = new Date(event.end).toLocaleDateString([t("date")], {
              year: "numeric",
              month: "short",
              day: "numeric",
            });
            const formattedEndTime = new Date(event.end).toLocaleTimeString([t("date")], {
              hour: "numeric",
              minute: "numeric",
              hour12: language === "en",
            });
            return (
              <SoftBox key={event._id}>
                <DefaultItem
                  color="dark"
                  type={event.className}
                  title={event.title}
                  description={`${formattedStartDate}, ${formattedStartTime}`}
                  eventdescription={event.description}
                  url={event.url}
                  index={index}
                  classname={event.className}
                  event={event._id}
                  start={`${formattedStartDate}, ${formattedStartTime}`}
                  end={`${formattedEndDate}, ${formattedEndTime}`}
                />
              </SoftBox>
            );
          })
        ) : (
          <SoftBox p={2}>{t("noevents")}</SoftBox>
        )}
      </SoftBox>
    </Card>
  );
}

UpcomingEvents.propTypes = {
  events: PropTypes.array.isRequired,
  courseId: PropTypes.string.isRequired,
};

export default UpcomingEvents;
