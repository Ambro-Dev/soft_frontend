/**
=========================================================
* Soft UD - Demo - v3.1.0
=========================================================

* Product Page: https://www.ambro.dev/product/soft-ui-dashboard-pro-react
* Copyright 2022 Ambro-Dev (https://www.ambro.dev)

Coded by Ambro-Dev

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Soft UD - Demo helper functions
import pxToRem from "assets/theme/functions/pxToRem";

const svgIcon = {
  defaultProps: {
    fontSize: "inherit",
  },

  styleOverrides: {
    fontSizeInherit: {
      fontSize: "inherit !important",
    },

    fontSizeSmall: {
      fontSize: `${pxToRem(20)} !important`,
    },

    fontSizeLarge: {
      fontSize: `${pxToRem(36)} !important`,
    },
  },
};

export default svgIcon;
