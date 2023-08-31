/**
=========================================================
* Distance Learning React - v1.1.0
=========================================================

Coded by Gwarant-Service

*/

// @mui material components
import { styled } from "@mui/material/styles";

export default styled("div")(({ theme }) => {
  const { palette, borders, typography } = theme;

  const { borderRadius } = borders;
  const { size } = typography;
  const { text, dark } = palette;

  return {
    "& .ql-toolbar": {
      borderRadius: `${borderRadius.md} ${borderRadius.md} 0 0`,

      "& .ql-picker, & .ql-stroke": {
        stroke: `${dark.main} !important`,
        color: `${dark.main} !important`,
      },
    },

    "& .ql-container": {
      borderRadius: `0 0 ${borderRadius.md} ${borderRadius.md}`,
    },

    "& .ql-editor": {
      color: text.main,
      whiteSpace: "pre-wrap",

      "& p": {
        fontSize: size.md,
        color: text.main,
      },

      "& ul li": {
        color: text.main,
      },
    },
  };
});
