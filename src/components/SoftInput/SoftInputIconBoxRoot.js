/**
=========================================================
* Soft UD - Demo - v4.0.0
=========================================================

* Product Page: https://www.soft.gwarant-service.pl
* Copyright 2022 Gwarant-Service (https://www.gwarant-service.pl)

Coded by Gwarant-Service

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import { styled } from "@mui/material/styles";

export default styled("div")(({ theme, ownerState }) => {
  const { palette, functions } = theme;
  const { size } = ownerState;

  const { dark } = palette;
  const { pxToRem } = functions;

  return {
    lineHeight: 0,
    padding: size === "small" ? `${pxToRem(4)} ${pxToRem(10)}` : `${pxToRem(8)} ${pxToRem(10)}`,
    width: pxToRem(39),
    height: "100%",
    color: dark.main,
  };
});
