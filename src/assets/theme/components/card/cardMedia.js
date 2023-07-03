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

// Soft UD - Demo Base Styles
import borders from "assets/theme/base/borders";

// Soft UD - Demo Helper Functions
import pxToRem from "assets/theme/functions/pxToRem";

const { borderRadius } = borders;

const cardMedia = {
  styleOverrides: {
    root: {
      borderRadius: borderRadius.xl,
      margin: `${pxToRem(16)} ${pxToRem(16)} 0`,
    },

    media: {
      width: "auto",
    },
  },
};

export default cardMedia;
