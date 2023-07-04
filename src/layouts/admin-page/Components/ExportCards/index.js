import { useContext, useState, useEffect } from "react";
import { Card, Icon, Skeleton, Tooltip } from "@mui/material";
import ErrorContext from "context/ErrorProvider";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftTypography from "components/SoftTypography";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import Fade from "@mui/material/Fade";

function ExportCards() {
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const { showErrorNotification } = useContext(ErrorContext);
  const axiosPrivate = useAxiosPrivate();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosPrivate
      .get(process.env.REACT_APP_GET_USERS_URL)
      .then((response) => {
        const rowStatus = response.data.map((row) => {
          if (row.roles.Blocked) {
            return { ...row, status: "Blocked" };
          }
          return { ...row, status: "Active" };
        });

        const newRows = rowStatus.map((row) => {
          if (row.roles.Student) {
            return {
              name: row.name,
              surname: row.surname,
              email: row.email,
              role: "Student",
              studentNumber: row.studentNumber,
              status: row.status,
            };
          }
          if (row.roles.Teacher) {
            return {
              name: row.name,
              surname: row.surname,
              email: row.email,
              role: "Teacher",
              studentNumber: null,
              status: row.status,
            };
          }
          return {
            name: row.name,
            surname: row.surname,
            email: row.email,
            role: "Admin",
            studentNumber: null,
            status: row.status,
          };
        });
        setUsers(newRows);
      })
      .catch(() => {
        showErrorNotification("Error", "Couldn't load users to export");
      });
    axiosPrivate
      .get(process.env.REACT_APP_GET_EXPORT_COURSES_URL)
      .then((response) => {
        const newRowes = response.data.map((row) => ({
          title: row.name,
          teacher: `${row.teacherId.name} ${row.teacherId.surname}`,
          members: row.members.length,
          events: row.events.length,
        }));
        setCourses(newRowes);
      })
      .catch(() => {
        showErrorNotification("Error", "Couldn't load courses to export");
      });
    setLoading(false);
  }, []);

  const exportCSV = (data, tableData) => {
    const separator = ",";
    const keys = Object.keys(tableData[0]);
    const csvContent = `${keys.join(separator)}\n${tableData
      .map((row) =>
        keys
          .map((key) => {
            let cellData = row[key];
            cellData = cellData === null || cellData === undefined ? "" : cellData.toString();
            cellData = cellData.includes(separator) ? `"${cellData}"` : cellData;
            return cellData;
          })
          .join(separator)
      )
      .join("\n")}`;
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `table-${data}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  function exportButton(data) {
    const dataToExport = data === "users" ? users : courses;
    return (
      <Tooltip
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 600 }}
        title={`Export ${data}`}
        placement="top"
      >
        <SoftButton
          variant="gradient"
          sx={{
            height: "100%",
            width: "4em",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
          color="primary"
          onClick={() => exportCSV(data, dataToExport)}
        >
          <ImportExportIcon sx={{ width: 40, height: 40 }} />
        </SoftButton>
      </Tooltip>
    );
  }

  return (
    <>
      {!loading ? (
        <Card sx={{ height: "50%", overflow: "hidden", marginBottom: 1 }}>
          <SoftBox
            p={3}
            height="100%"
            bgColor="white"
            variant="gradient"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
          >
            <SoftBox
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
              lineHeight={1}
            >
              <SoftTypography variant="body2" color="text">
                Export (CSV)
              </SoftTypography>
              <SoftBox mt={-0.5} mr={-1.5}>
                {exportButton("users")}
              </SoftBox>
            </SoftBox>
            <Icon fontSize="large" color="white">
              person
            </Icon>
            <SoftBox mt={1} lineHeight={1}>
              <SoftTypography variant="body2" color="text" textTransform="capitalize">
                Users
              </SoftTypography>
              <SoftTypography variant="caption" color="text">
                {users && users.length}
              </SoftTypography>
            </SoftBox>
          </SoftBox>
        </Card>
      ) : (
        <Skeleton variant="rounded" width="100%" height="50%" sx={{ marginBottom: 1 }} />
      )}
      {!loading ? (
        <Card sx={{ height: "50%", overflow: "hidden", marginTop: 1 }}>
          <SoftBox
            p={3}
            height="100%"
            bgColor="white"
            variant="gradient"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
          >
            <SoftBox
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
              lineHeight={1}
            >
              <SoftTypography variant="body2" color="text">
                Export (CSV)
              </SoftTypography>
              <SoftBox mt={-0.5} mr={-1.5}>
                {exportButton("courses")}
              </SoftBox>
            </SoftBox>
            <Icon fontSize="large" color="white">
              class
            </Icon>
            <SoftBox mt={1} lineHeight={1}>
              <SoftTypography variant="body2" color="text" textTransform="capitalize">
                Courses
              </SoftTypography>
              <SoftTypography variant="caption" color="text">
                {courses && courses.length}
              </SoftTypography>
            </SoftBox>
          </SoftBox>
        </Card>
      ) : (
        <Skeleton variant="rounded" width="100%" height="50%" sx={{ marginTop: 1 }} />
      )}
    </>
  );
}

export default ExportCards;
