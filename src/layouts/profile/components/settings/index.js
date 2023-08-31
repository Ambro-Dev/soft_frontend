/**
=========================================================
* Distance Learning React - v1.1.0
=========================================================

Coded by Gwarant-Service

*/

// @mui material components
import Grid from "@mui/material/Grid";

// Distance Learning React components

// Settings page components
import Sidenav from "./components/Sidenav";
import ChangePassword from "./components/ChangePassword";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import SoftBox from "components/SoftBox";
import Header from "../Header";
import HeaderEdit from "./components/Header";

import useAuth from "hooks/useAuth";
import { useEffect, useState } from "react";
import useAxiosPrivate from "hooks/useAxiosPrivate";

function Settings() {
  const axiosPrivate = useAxiosPrivate();
  const [picture, setPicture] = useState();
  const { auth } = useAuth();

  useEffect(() => {
    axiosPrivate
      .get(`/profile-picture/users/${auth.userId}/picture`, { responseType: "blob" })
      .then((response) => {
        setPicture(URL.createObjectURL(response.data));
      })
      .catch((error) => {
        console.error("Error fetching image:", error);
      });
  }, [auth.userId]);

  return (
    <DashboardLayout>
      <Header stage={2} />
      <SoftBox mt={4}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={3}>
            <Sidenav />
          </Grid>
          <Grid item xs={12} lg={9}>
            <SoftBox mb={3}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <HeaderEdit />
                </Grid>
                <Grid item xs={12}>
                  <ChangePassword />
                </Grid>
              </Grid>
            </SoftBox>
          </Grid>
        </Grid>
      </SoftBox>
    </DashboardLayout>
  );
}

export default Settings;
