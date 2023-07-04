import { Card, Grid } from "@mui/material";
import SoftButton from "components/SoftButton";
import { useNavigate } from "react-router-dom";
import PeopleIcon from "@mui/icons-material/People";
import CastForEducationIcon from "@mui/icons-material/CastForEducation";

function ManageCard() {
  const navigate = useNavigate();
  const buttonStyles = () => ({
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    variant: "gradient",
    textAlign: "center",
    "&:hover": {
      color: "#e349f1",
      border: "1px solid",
      borderColor: "info",
      background: "#FFFFFF",
    },
  });

  return (
    <Card sx={{ padding: 3 }}>
      <Grid container spacing="3%" sx={{ height: 200 }}>
        <Grid item xs={6} lg={6}>
          <SoftButton
            bgColor="primary"
            sx={buttonStyles}
            color="primary"
            variant="gradient"
            onClick={() => navigate("/admin/users")}
          >
            <PeopleIcon sx={{ width: 50, height: 50, marginBottom: 1 }} />
            Manage Users
          </SoftButton>
        </Grid>
        <Grid item xs={6} lg={6}>
          <SoftButton
            sx={buttonStyles}
            color="primary"
            bgColor="primary"
            variant="gradient"
            onClick={() => navigate("/admin/courses")}
          >
            <CastForEducationIcon sx={{ width: 50, height: 50, marginBottom: 1 }} />
            Manage Courses
          </SoftButton>
        </Grid>
      </Grid>
    </Card>
  );
}

export default ManageCard;
