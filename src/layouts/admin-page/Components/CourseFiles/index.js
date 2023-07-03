import { Card, CircularProgress, Icon } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftProgress from "components/SoftProgress";
import SoftTypography from "components/SoftTypography";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { useEffect, useState } from "react";

function CourseFiles() {
  const [progress, setProgress] = useState(null);
  const [allFiles, setAllFiles] = useState(null);

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    axiosPrivate.get("files").then((response) => {
      setAllFiles(response.data);
      const spaceTaken = response.data.totalDiskSpace;
      if (!spaceTaken || spaceTaken === 0) return;
      const progressAmount = (spaceTaken / (1024 * 1024) / 400) * 100;
      const kB = spaceTaken;
      const MB = (spaceTaken / 1024).toFixed(2);
      const GB = (spaceTaken / (1024 * 1024)).toFixed(2);
      if (spaceTaken < 1024 && spaceTaken > 0)
        setProgress({ value: kB, amount: progressAmount, metric: "kB" });
      if (spaceTaken < 1024 * 1024 && spaceTaken > 1024)
        setProgress({ value: MB, amount: progressAmount, metric: "MB" });
      if (spaceTaken < 1024 * 1024 * 1024 && spaceTaken > 1024 * 1024)
        setProgress({ value: GB, amount: progressAmount, metric: "GB" });
    });
  }, []);

  return (
    <Card sx={{ marginTop: 2 }}>
      {allFiles ? (
        <SoftBox p={3}>
          <SoftBox
            display="grid"
            justifyContent="center"
            alignItems="center"
            bgColor="info"
            color="white"
            width="3rem"
            height="3rem"
            shadow="md"
            borderRadius="lg"
            variant="gradient"
          >
            <Icon fontSize="default">description</Icon>
          </SoftBox>
          <SoftBox mt={2.625}>
            <SoftTypography variant="h5" fontWeight="medium" textTransform="capitalize">
              Space taken by course files
            </SoftTypography>
            <SoftBox display="flex" justifyContent="space-between">
              <SoftTypography variant="body2" color="text" fontWeight="regular">
                {progress ? `${progress.value} ${progress.metric}` : "0 kB"}
              </SoftTypography>
              <SoftTypography variant="body2" color="text" fontWeight="regular">
                400 GB
              </SoftTypography>
            </SoftBox>
          </SoftBox>
          <SoftBox>
            <SoftProgress value={progress ? progress.amount : 0} variant="contained" />
          </SoftBox>
        </SoftBox>
      ) : (
        <SoftBox
          sx={{
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </SoftBox>
      )}
    </Card>
  );
}

export default CourseFiles;
