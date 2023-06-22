/**
=========================================================
* Soft UD - Demo - v4.0.0
=========================================================

* Product Page: https://www.Ambro-Dev.pl/product/soft-ui-dashboard-react
* Copyright 2022 Ambro-Dev (https://www.Ambro-Dev.pl)

Coded by Ambro-Dev

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect, useMemo } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

// Soft UD - Demo components
import SoftBox from "components/SoftBox";

// Soft UD - Demo examples
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

// Soft UD - Demo themes
import theme from "assets/theme";
import themeRTL from "assets/theme/theme-rtl";

// RTL plugins
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

// Soft UD - Demo routes
import routes from "routes";

// Soft UD - Demo contexts
import { useSoftUIController, setMiniSidenav, setOpenConfigurator } from "context";

// Images
import brand from "assets/images/logos/soft-logo.png";
import Settings from "layouts/profile/components/settings";
import Widgets from "layouts/widgets";
import Wizard from "layouts/wizard";
import Invoice from "layouts/invoice";
import VideoCall from "layouts/timeline";
import ExamBuilder from "layouts/products/edit-product";
import SurveyViewer from "layouts/products/new-product";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import SettingsPage from "./layouts/profile/components/settings";
import Messages from "layouts/profile/components/messages";
import RequireAuth from "components/RequireAuth";

export default function App() {
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, direction, layout, openConfigurator, sidenavColor } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();

  // Cache for the rtl
  useMemo(() => {
    const cacheRtl = createCache({
      key: "rtl",
      stylisPlugins: [rtlPlugin],
    });

    setRtlCache(cacheRtl);
  }, []);

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });

  const ROLES = {
    Teacher: 5150,
    Student: 1984,
    User: 2001,
    Admin: 1001,
  };

  const configsButton = (
    <SoftBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.5rem"
      height="3.5rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="default" color="inherit">
        settings
      </Icon>
    </SoftBox>
  );

  return direction === "rtl" ? (
    <CacheProvider value={rtlCache}>
      <ThemeProvider theme={themeRTL}>
        <CssBaseline />
        {layout === "dashboard" && (
          <>
            <Sidenav
              color={sidenavColor}
              brand={brand}
              brandName="Soft UI Dashboard"
              routes={routes}
              onMouseEnter={handleOnMouseEnter}
              onMouseLeave={handleOnMouseLeave}
            />
            <Configurator />
            {configsButton}
          </>
        )}
        {layout === "vr" && <Configurator />}
        <Routes>
          {getRoutes(routes)}

          <Route exact path="/authentication/sign-in" element={<SignIn />} key="sign-in" />
          <Route exact path="/authentication/sign-up" element={<SignUp />} key="sign-up" />

          <Route element={<RequireAuth allowedRoles={[ROLES.Teacher]} />}>
            <Route exact path="/applications/wizard" element={<Wizard />} key="wizard" />
            <Route
              exact
              path="/ecommerce/products/edit-product"
              element={<ExamBuilder />}
              key="edit-product"
            />
          </Route>
          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
            <Route path="*" element={<Navigate to="/courses" />} />
            <Route exact path="/profile/settings" element={<SettingsPage />} key="settings" />
            <Route exact path="/profile/messages" element={<Messages />} key="messages" />
            <Route exact path="/courses/course-info/:id" element={<Widgets />} key="course-info" />
            <Route exact path="/pages/account/invoice" element={<Invoice />} key="event-info" />
            <Route exact path="/video-lesson/:id" element={<VideoCall />} key="video-lesson" />
            <Route
              exact
              path="/ecommerce/products/new-product"
              element={<SurveyViewer />}
              key="new-product"
            />
          </Route>
        </Routes>
      </ThemeProvider>
    </CacheProvider>
  ) : (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {layout === "dashboard" && (
        <>
          <Sidenav
            color={sidenavColor}
            brand={brand}
            brandName="Soft UI Dashboard"
            routes={routes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          <Configurator />
          {configsButton}
        </>
      )}
      {layout === "vr" && <Configurator />}
      <Routes>
        {getRoutes(routes)}
        <Route exact path="/authentication/sign-in" element={<SignIn />} key="sign-in" />
        <Route exact path="/authentication/sign-up" element={<SignUp />} key="sign-up" />

        <Route element={<RequireAuth allowedRoles={[ROLES.Teacher]} />}>
          <Route exact path="/applications/wizard" element={<Wizard />} key="wizard" />
          <Route
            exact
            path="/ecommerce/products/edit-product"
            element={<ExamBuilder />}
            key="edit-product"
          />
        </Route>
        <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
          <Route path="*" element={<Navigate to="/courses" />} />
          <Route exact path="/profile/settings" element={<SettingsPage />} key="settings" />
          <Route exact path="/profile/messages" element={<Messages />} key="messages" />
          <Route exact path="/courses/course-info/:id" element={<Widgets />} key="course-info" />
          <Route exact path="/pages/account/invoice" element={<Invoice />} key="event-info" />
          <Route exact path="/video-lesson/:id" element={<VideoCall />} key="video-lesson" />
          <Route
            exact
            path="/ecommerce/products/new-product"
            element={<SurveyViewer />}
            key="new-product"
          />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}
