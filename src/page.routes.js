/**
=========================================================
* Distance Learning React - v1.1.0
=========================================================

Coded by Gwarant-Service

*/

/** 
  All of the routes for the page layout of Distance Learning React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the DefaultNavbar.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `name` key is used for the name of the route on the DefaultNavbar.
  3. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  4. The `icon` key is used for the icon of the route on the DefaultNavbar, you have to add a node.
  5. The `collapse` key is used for making a collapsible item on the DefaultNavbar that contains other routes inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  6. The `route` key is used to store the route location which is used for the react router.
  7. The `href` key is used to store the external links location.
*/

// @mui material components

const pageRoutes = [
  {
    name: "Courses",
    collapse: [
      {
        name: "Manage Courses",
        route: "/admin/courses",
        icon: "class",
      },
    ],
  },
  {
    name: "Users",
    collapse: [
      {
        name: "Manage Users",
        route: "/admin/users",
        icon: "person",
      },
    ],
  },
  {
    name: "Exports",
    collapse: [
      {
        name: "Go to exports",
        route: "/admin",
        icon: "import_export",
      },
    ],
  },
  {
    name: "Profile",
    collapse: [
      {
        name: "Logout",
        route: "/authentication/sign-out",
        icon: "logout",
      },
    ],
  },
];

export default pageRoutes;
