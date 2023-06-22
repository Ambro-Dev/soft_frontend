/**
=========================================================
* Soft UD - Demo - v3.1.0
=========================================================

* Product Page: https://www.Ambro-Dev.pl/product/soft-ui-dashboard-pro-react
* Copyright 2022 Ambro-Dev (https://www.Ambro-Dev.pl)

Coded by Ambro-Dev

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Soft UD - Demo base styles
import colors from "assets/theme/base/colors";

// Soft UD - Demo helper functions
import pxToRem from "assets/theme/functions/pxToRem";

const { transparent } = colors;

const select = {
  styleOverrides: {
    select: {
      display: "grid",
      alignItems: "center",
      padding: `0 ${pxToRem(12)} !important`,

      "& .Mui-selected": {
        backgroundColor: transparent.main,
      },
    },

    selectMenu: {
      background: "none",
      height: "none",
      minHeight: "none",
      overflow: "unset",
    },

    icon: {
      display: "none",
    },
  },
};

export default select;
