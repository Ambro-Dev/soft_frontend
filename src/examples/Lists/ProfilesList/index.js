/**
=========================================================
* Soft UD - Demo - v4.0.0
=========================================================

* Product Page: https://www.soft.gwarant-service.pl
* Copyright 2022 Gwarant-Service (https://www.gwarant-service.pl)

Coded by Gwarant-Service

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// react-routers components
import { Link, useNavigate } from "react-router-dom";

// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";

// Soft UD - Demo components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftButton from "components/SoftButton";

import useAxiosPrivate from "hooks/useAxiosPrivate";
import { useState, useEffect, useContext } from "react";
import ErrorContext from "context/ErrorProvider";

function ProfilesList({ title, profiles }) {
  const axiosPrivate = useAxiosPrivate();
  const [imageUrls, setImageUrls] = useState([]);
  const { showErrorNotification } = useContext(ErrorContext);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true; // Add a flag to track if the component is mounted

    const fetchProfilePictures = async () => {
      try {
        const urls = await Promise.all(
          profiles.map(async (profile) => {
            try {
              const response = await axiosPrivate.get(
                `/profile-picture/users/${profile.user}/picture`,
                {
                  responseType: "blob",
                }
              );
              return URL.createObjectURL(response.data);
            } catch (error) {
              showErrorNotification("Error fetching image:", error);
              return null;
            }
          })
        );

        if (isMounted) {
          // Check if the component is still mounted before updating the state
          setImageUrls(urls);
        }
      } catch (error) {
        showErrorNotification("Error fetching profile pictures:", error);
      }
    };

    fetchProfilePictures();

    return () => {
      isMounted = false; // Set the flag to false when the component is unmounted
    };
  }, [axiosPrivate, profiles]);

  const renderProfiles = profiles.map(({ name, description, action, user }, index) => (
    <SoftBox key={name} component="li" display="flex" alignItems="center" py={1} mb={1}>
      <SoftBox mr={2}>
        <SoftAvatar src={imageUrls[index]} alt="something here" variant="rounded" shadow="md" />
      </SoftBox>
      <SoftBox
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        justifyContent="center"
      >
        <SoftTypography variant="button" fontWeight="medium">
          {name}
        </SoftTypography>
        <SoftTypography variant="caption" color="text">
          {description}
        </SoftTypography>
      </SoftBox>
      <SoftBox ml="auto">
        {action.type === "internal" ? (
          <SoftButton
            onClick={() => {
              const messageUser = {
                id: user,
              };
              navigate("/profile/messages", { state: messageUser });
            }}
            variant="text"
            color="info"
          >
            {action.label}
          </SoftButton>
        ) : (
          <SoftButton
            onClick={() => {
              const messageUser = {
                id: user,
              };
              navigate("/profile/messageschat", { state: messageUser });
            }}
            variant="text"
            color={action.color}
          >
            {action.label}
          </SoftButton>
        )}
      </SoftBox>
    </SoftBox>
  ));

  return (
    <Card sx={{ height: "100%" }}>
      <SoftBox pt={2} px={2}>
        <SoftTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          {title}
        </SoftTypography>
      </SoftBox>
      <SoftBox p={2}>
        <SoftBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          {renderProfiles}
        </SoftBox>
      </SoftBox>
    </Card>
  );
}

// Typechecking props for the ProfilesList
ProfilesList.propTypes = {
  title: PropTypes.string.isRequired,
  profiles: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ProfilesList;
