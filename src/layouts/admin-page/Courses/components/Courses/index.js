/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import { CircularProgress, Divider } from "@mui/material";
import Card from "@mui/material/Card";

// Distance Learning React components
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftTypography from "components/SoftTypography";

// Distance Learning React utils
import DataTable from "examples/Tables/DataTable";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import ErrorContext from "context/ErrorProvider";

function Courses({ setVisible, visible, loading }) {
  const axiosPrivate = useAxiosPrivate();
  const [courses, setCourses] = useState();
  const navigate = useNavigate();
  const { showErrorNotification } = useContext(ErrorContext);
  const [dataLoading, setDataLoading] = useState(true);
  useEffect(() => {
    axiosPrivate
      .get("/courses")
      .then((response) => {
        setCourses(response.data);
        setDataLoading(false);
      })
      .catch(() => {
        showErrorNotification("Error", "Couldn't load courses");
        setDataLoading(false);
      });
  }, [loading]);

  const openEdit = (row) => {
    const course = {
      id: row.original._id,
      description: row.original.description,
      name: row.original.name,
      teacherId: row.original.teacherId,
    };

    navigate("/admin/courses/edit-course", { state: course });
  };

  return (
    <Card style={{ marginTop: 25 }}>
      <SoftBox>
        <SoftBox pt={2} px={2} lineHeight={1}>
          <SoftTypography variant="h6" fontWeight="medium" pb={1}>
            Courses
          </SoftTypography>
        </SoftBox>
        <SoftBox pl={2}>
          <SoftButton
            color="primary"
            onClick={() => setVisible(!visible)}
            sx={{ marginRight: 1, marginTop: 1, marginBottom: 1 }}
          >
            Add Course
          </SoftButton>
          <SoftButton
            color="info"
            sx={{ margin: 1 }}
            onClick={() => navigate("/admin/import-courses")}
            endIcon={<AddIcon sx={{ height: 20, width: 20 }} />}
          >
            <SoftTypography variant="button" sx={{ color: "#FFFFFF" }} fontWeight="medium">
              Import courses (CSV)
            </SoftTypography>
          </SoftButton>
        </SoftBox>
        <Divider />
        {!dataLoading ? (
          <SoftBox>
            {courses.length > 0 && (
              <SoftBox>
                <DataTable
                  table={{
                    columns: [
                      { Header: "name", accessor: "name" },
                      {
                        Header: "Members",
                        accessor: "members",
                        width: "15%",
                        Cell: ({ row }) => (
                          <SoftTypography variant="button">
                            {row.original.members.length}
                          </SoftTypography>
                        ),
                      },
                      {
                        Header: "action",
                        accessor: "actions",
                        width: "15%",
                        Cell: ({ row }) => (
                          <SoftButton onClick={() => openEdit(row)}>Edit</SoftButton>
                        ),
                      },
                    ],
                    rows: courses,
                  }}
                  entriesPerPage={false}
                  canSearch
                />
              </SoftBox>
            )}
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
      </SoftBox>
    </Card>
  );
}

export default Courses;
