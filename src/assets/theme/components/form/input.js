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

// Soft UD - Demo Base Styles
import colors from "assets/theme/base/colors";
import borders from "assets/theme/base/borders";

// Soft UD Dashboard PRO helper functions
import pxToRem from "assets/theme/functions/pxToRem";

const { inputColors } = colors;
const { borderWidth, borderRadius } = borders;

const input = {
  styleOverrides: {
    root: {
      display: "flex !important",
      padding: `${pxToRem(8)} ${pxToRem(28)} ${pxToRem(8)} ${pxToRem(12)} !important`,
      border: `${borderWidth[1]} solid ${inputColors.borderColor.main}`,
      borderRadius: `${borderRadius.md} !important`,

      "& fieldset": {
        border: "none",
      },
    },

    input: {
      height: pxToRem(22),
      width: "max-content !important",
    },

    inputSizeSmall: {
      height: pxToRem(14),
    },
  },
};

export default input;
