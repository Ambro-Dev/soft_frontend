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

import { useState, useEffect, useContext } from "react";

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

// Soft UD - Demo contexts
import { useSoftUIController, setMiniSidenav, setOpenConfigurator } from "context";

// Images
import brand from "assets/images/logo-ct.png";
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

import routespl from "./routespl";
import routesen from "./routesen";
import routesru from "./routesru";
import { useTranslation } from "react-i18next";
import { SocketContext } from "context/socket";
import { ROLES } from "./context/userRoles";
import useAuth from "hooks/useAuth";
import { ErrorProvider } from "context/ErrorProvider";
import { io } from "socket.io-client";
import PersistLogin from "components/PersistLogin";
import ResetPassword from "layouts/authentication/reset-password";
import Unauthorized from "components/Unauthorized";
import AdminPage from "layouts/admin-page";
import ImportMembers from "layouts/admin-page/ImportMembers";
import ImportStudents from "layouts/admin-page/ImportStudents";
import ImportCourses from "layouts/admin-page/ImportCourses";
import ImportTeachers from "layouts/admin-page/ImportTeachers";
import AdminUsers from "layouts/admin-page/Users";
import AdminCourses from "layouts/admin-page/Courses";
import EditCourse from "layouts/admin-page/Courses/components/EditCourse";
import EditUser from "layouts/admin-page/Users/components/EditUser";

export default function App() {
  const { i18n } = useTranslation();
  const [routes, setRoutes] = useState(routespl);
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, direction, layout, openConfigurator, sidenavColor } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const { pathname } = useLocation();
  const { setSocket } = useContext(SocketContext);
  const { auth } = useAuth();

  // Cache for the rtl

  useEffect(() => {
    const newSocket = io(process.env.REACT_APP_SERVER_URL);
    setSocket(newSocket);

    // Emit the custom event with the userId after connection
    if (auth.userId) {
      newSocket.on("connect", () => {
        const { userId } = auth;
        newSocket.emit("user-connected", userId);
      });
    }

    return () => {
      newSocket.disconnect();
    };
  }, [auth.userId]);

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
    allRoutes.flatMap((route, index) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        if (route.key === "logout") {
          return <Route exact path={route.route} element={route.component} key={route.key} />;
        }
        return [
          <Route
            element={<RequireAuth allowedRoles={[ROLES.Teacher, ROLES.Student]} />}
            key={`dynamic-route-${index}`}
          >
            <Route exact path={route.route} element={route.component} key={route.key} />
          </Route>,
        ];
      }

      return null;
    });

  useEffect(() => {
    const handleLanguageChange = () => {
      if (i18n.language === "en") {
        setRoutes(routesen);
      }
      if (i18n.language === "pl") {
        setRoutes(routespl);
      }
      if (i18n.language === "ru") {
        setRoutes(routesru);
      }
    };

    i18n.on("languageChanged", handleLanguageChange);

    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, [i18n]);

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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {layout === "dashboard" && (
        <>
          <Sidenav
            color={sidenavColor}
            brand={brand}
            brandName="Soft UD Dashboard"
            routes={routes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          <Configurator />
          {configsButton}
        </>
      )}
      <ErrorProvider>
        <Routes>
          <Route exact path="/authentication/sign-in" element={<SignIn />} key="sign-in" />
          <Route exact path="/authentication/sign-up" element={<SignUp />} key="sign-up" />
          <Route
            path="/authentication/reset-password"
            element={<ResetPassword />}
            key="reset-password"
          />
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
              <Route path="/unauthorized" element={<Unauthorized />} key="unauthorized" />
              <Route
                path="*"
                element={
                  auth.roles?.includes(1001) ? <Navigate to="/admin" /> : <Navigate to="/courses" />
                }
              />
              {getRoutes(routes)}
              <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                <Route path="/admin" element={<AdminPage />} key="admin-page" />
                <Route
                  path="/admin/import-members"
                  element={<ImportMembers />}
                  key="import-members"
                />
                <Route
                  path="/admin/import-students"
                  element={<ImportStudents />}
                  key="import-students"
                />
                <Route
                  path="/admin/import-courses"
                  element={<ImportCourses />}
                  key="import-courses"
                />
                <Route
                  path="/admin/import-teachers"
                  element={<ImportTeachers />}
                  key="import-teachers"
                />
                <Route path="/admin/users" element={<AdminUsers />} key="admin-users" />
                <Route path="/admin/courses" element={<AdminCourses />} key="admin-courses" />
                <Route
                  path="/admin/courses/edit-course"
                  element={<EditCourse />}
                  key="admin-edit-course"
                />
                <Route path="/admin/users/edit-user" element={<EditUser />} key="admin-edit-user" />
              </Route>
              <Route element={<RequireAuth allowedRoles={[ROLES.Teacher]} />}>
                <Route exact path="/applications/wizard" element={<Wizard />} key="wizard" />
                <Route
                  exact
                  path="/ecommerce/products/edit-product"
                  element={<ExamBuilder />}
                  key="edit-product"
                />
              </Route>
              <Route element={<RequireAuth allowedRoles={[ROLES.Teacher, ROLES.Student]} />}>
                <Route path="*" element={<Navigate to="/courses" />} />
                <Route exact path="/profile/settings" element={<SettingsPage />} key="settings" />
                <Route exact path="/profile/messages" element={<Messages />} key="messages" />
                <Route
                  exact
                  path="/courses/course-info/:id"
                  element={<Widgets />}
                  key="course-info"
                />
                <Route exact path="/pages/account/invoice" element={<Invoice />} key="event-info" />
                <Route exact path="/video-lesson/:id" element={<VideoCall />} key="video-lesson" />
                <Route
                  exact
                  path="/ecommerce/products/new-product"
                  element={<SurveyViewer />}
                  key="new-product"
                />
              </Route>
            </Route>
          </Route>
        </Routes>
      </ErrorProvider>
    </ThemeProvider>
  );
}
