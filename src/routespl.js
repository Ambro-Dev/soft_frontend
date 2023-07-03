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

/** 
  All of the routes for the Soft UD - Demo are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Soft UD - Demo layouts
import Profile from "layouts/profile";

// Soft UD - Demo icons
import CustomerSupport from "examples/Icons/CustomerSupport";
import LogoutPage from "layouts/authentication/sign-out";
import { Icon } from "@mui/material";
import Courses from "layouts/kanban";
import Calendar from "layouts/calendar";

const routes = [
  { type: "title", title: "Strony - konto", key: "account-pages" },
  {
    type: "collapse",
    name: "Profil",
    key: "profile",
    route: "/profile",
    icon: <CustomerSupport size="12px" />,
    component: <Profile />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Wyloguj",
    key: "logout",
    route: "/authentication/sign-out",
    icon: <Icon fontSize="medium">logout</Icon>,
    component: <LogoutPage />,
    noCollapse: true,
  }, 
  {
    type: "collapse",
    name: "Kursy",
    key: "courses",
    route: "/courses",
    icon: <Icon fontSize="medium">class</Icon>,
    component: <Courses />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Kalendarz",
    key: "calendar",
    route: "/calendar",
    icon: <Icon fontSize="medium">calendar_today</Icon>,
    component: <Calendar />,
    noCollapse: true,
  },
];

export default routes;
