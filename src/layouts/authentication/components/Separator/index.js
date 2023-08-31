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
import Divider from "@mui/material/Divider";

// Soft UD - Demo components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { useTranslation } from "react-i18next";

function Separator() {
  const { t } = useTranslation("translation", { keyPrefix: "signup" });
  return (
    <SoftBox position="relative" py={0.25}>
      <Divider />
      <SoftBox
        bgColor="white"
        position="absolute"
        top="50%"
        left="50%"
        px={1.5}
        lineHeight={1}
        sx={{ transform: "translate(-50%, -60%)" }}
      >
        <SoftTypography variant="button" fontWeight="medium" color="secondary">
          {t("or")}
        </SoftTypography>
      </SoftBox>
    </SoftBox>
  );
}

export default Separator;
