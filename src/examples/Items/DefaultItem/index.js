/* eslint-disable react/prop-types */
/**
=========================================================
* Distance Learning React - v1.1.0
=========================================================

Coded by Ambro-Dev

*/

import { forwardRef } from "react";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// Distance Learning React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// custom styles for the DefaultItem
import { AccordionDetails, AccordionSummary, Avatar, Card, Divider } from "@mui/material";

import exam from "assets/images/event-icons/score.png";
import lesson from "assets/images/event-icons/lesson.png";
import SoftButton from "components/SoftButton";
import { ExpandMore } from "@mui/icons-material";
import SoftAccordion from "components/SoftAccordion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const icons = {
  success: lesson,
  info: exam,
};

const DefaultItem = forwardRef(
  (
    {
      color,
      type,
      title,
      description,
      eventdescription,
      index,
      url,
      classname,
      event,
      start,
      end,
      ...rest
    },
    ref
  ) => {
    const { t } = useTranslation("translation", { keyPrefix: "defaultitem" });
    const navigate = useNavigate();

    const handleOpen = () => {
      const selectedEvent = {
        title,
        start,
        end,
        description: eventdescription,
        _id: event,
        url,
      };
      navigate("/pages/account/invoice", { state: selectedEvent });
    };
    return (
      <SoftBox {...rest} ref={ref} display="flex" alignItems="center">
        <SoftAccordion sx={{ width: "100%" }}>
          <AccordionSummary expandIcon={<ExpandMore />} aria-controls={`panel${index}-content`}>
            <Avatar src={icons[type]} variant="square" alt="listitem" />
            <SoftBox ml={2} mt={0.5} lineHeight={1.4}>
              <SoftTypography display="block" variant="button" fontWeight="medium">
                {title}
              </SoftTypography>
              <SoftTypography variant="button" fontWeight="regular" color="text">
                {description}
              </SoftTypography>
            </SoftBox>
          </AccordionSummary>
          <AccordionDetails>
            <SoftBox>
              <Card>
                {/* Invoice header */}
                <SoftBox p={1}>
                  <SoftBox p={1}>
                    <SoftBox width="100%" overflow="auto">
                      <SoftTypography variant="h6" color="text" fontWeight="regular">
                        {t("description")}
                      </SoftTypography>
                      <SoftTypography variant="button" fontWeight="regular">
                        {eventdescription}
                      </SoftTypography>
                    </SoftBox>
                  </SoftBox>
                  <Divider variant="middle" />
                  <SoftBox width="100%" textAlign="right" mt={1}>
                    <SoftBox mt={1}>
                      <SoftTypography
                        component="span"
                        variant="h6"
                        fontWeight="regular"
                        color="text"
                      >
                        <SoftButton variant="gradient" color="success" onClick={() => handleOpen()}>
                          {t("view")}
                        </SoftButton>
                      </SoftTypography>
                    </SoftBox>
                  </SoftBox>
                </SoftBox>
              </Card>
            </SoftBox>
          </AccordionDetails>
        </SoftAccordion>
      </SoftBox>
    );
  }
);

// Setting default values for the props of DefaultItem
DefaultItem.defaultProps = {
  color: "info",
  url: null,
};

// Typechecking props for the DefaultItem
DefaultItem.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  eventdescription: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  url: PropTypes.string,
  classname: PropTypes.string.isRequired,
  event: PropTypes.string.isRequired,
};

export default DefaultItem;
