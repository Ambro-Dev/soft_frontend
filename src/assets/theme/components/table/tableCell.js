/**
=========================================================
* Soft UD - Demo - v3.1.0
=========================================================

* Product Page: https://www.gwarant-service.pl/product/soft-ui-dashboard-pro-react
* Copyright 2022 Gwarant-Service (https://www.gwarant-service.pl)

Coded by Ambro-Dev

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Soft UD - Demo base styles
import borders from "assets/theme/base/borders";
import colors from "assets/theme/base/colors";

// Soft UD - Demo helper functions
import pxToRem from "assets/theme/functions/pxToRem";

const { borderWidth } = borders;
const { light } = colors;

const tableCell = {
  styleOverrides: {
    root: {
      padding: `${pxToRem(12)} ${pxToRem(16)}`,
      borderBottom: `${borderWidth[1]} solid ${light.main}`,
    },
  },
};

export default tableCell;
