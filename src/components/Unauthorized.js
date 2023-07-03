import { useNavigate } from "react-router-dom";
import SoftTypography from "./SoftTypography";
import SoftBox from "./SoftBox";
import SoftButton from "./SoftButton";
import PageLayout from "examples/LayoutContainers/PageLayout";

function Unauthorized() {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <PageLayout>
      <SoftTypography variant="h1">Unauthorized</SoftTypography>
      <SoftTypography variant="text">You do not have access to the requested page.</SoftTypography>
      <SoftBox>
        <SoftButton onClick={goBack}>Go Back</SoftButton>
      </SoftBox>
    </PageLayout>
  );
}

export default Unauthorized;
