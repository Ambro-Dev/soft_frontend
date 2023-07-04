/**
=========================================================
* Soft UD - Demo - v3.1.0
=========================================================

* Product Page: https://www.ambro.dev/product/soft-ui-dashboard-pro-react
* Copyright 2023 Ambro-Dev (https://www.ambro.dev)

Coded by Ambro-Dev

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Soft UD - Demo base styles
import typography from "assets/theme/base/typography";
import colors from "assets/theme/base/colors";

// Soft UD - Demo helper functions
// import pxToRem from "assets/theme/functions/pxToRem";

const { size } = typography;
const { text } = colors;

const dialogContentText = {
  styleOverrides: {
    root: {
      fontSize: size.md,
      color: text.main,
    },
  },
};

export default dialogContentText;
