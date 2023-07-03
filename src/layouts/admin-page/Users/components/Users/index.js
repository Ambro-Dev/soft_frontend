/* eslint-disable no-underscore-dangle */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unstable-nested-components */
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

function Users({ setVisible, visible, loading }) {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const [users, setUsers] = useState();
  const { showErrorNotification } = useContext(ErrorContext);

  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    axiosPrivate
      .get("admin/users")
      .then((response) => {
        const newRows = response.data.map((row) => {
          if (Object.values(row.roles).includes(5150)) {
            return { ...row, role: "Teacher" };
          }
          if (Object.values(row.roles).includes(1001)) {
            return { ...row, role: "Admin" };
          }
          return { ...row, role: "Student" };
        });
        setUsers(newRows);
        setDataLoading(false);
      })
      .catch((err) => {
        showErrorNotification("Error", err.message);
        setDataLoading(false);
      });
  }, [loading]);

  const openEdit = (row) => {
    const user = {
      id: row.original._id,
      roles: row.original.roles,
    };

    navigate("/admin/users/edit-user", { state: user });
  };

  return (
    <Card style={{ marginTop: 25 }}>
      <SoftBox>
        <SoftBox>
          <SoftBox pt={2} px={2} lineHeight={1}>
            <SoftTypography variant="h6" fontWeight="medium" pb={1}>
              Users
            </SoftTypography>
          </SoftBox>
          <SoftBox pl={2}>
            <SoftButton color="primary" sx={{ margin: 1 }} onClick={() => setVisible(!visible)}>
              Add User
            </SoftButton>
            <SoftButton
              color="info"
              sx={{ margin: 1 }}
              onClick={() => navigate("/admin/import-students")}
              endIcon={<AddIcon sx={{ height: 20, width: 20 }} />}
            >
              <SoftTypography variant="button" sx={{ color: "#FFFFFF" }} fontWeight="medium">
                Import students (CSV)
              </SoftTypography>
            </SoftButton>
            <SoftButton
              color="info"
              sx={{ margin: 1 }}
              onClick={() => navigate("/admin/import-teachers")}
              endIcon={<AddIcon sx={{ height: 20, width: 20 }} />}
            >
              <SoftTypography variant="button" sx={{ color: "#FFFFFF" }} fontWeight="medium">
                Import teachers (CSV)
              </SoftTypography>
            </SoftButton>
          </SoftBox>
          <Divider />
          {!dataLoading ? (
            <SoftBox>
              {users?.length > 0 && (
                <SoftBox>
                  <DataTable
                    table={{
                      columns: [
                        { Header: "name", accessor: "name" },
                        { Header: "surname", accessor: "surname" },
                        { Header: "email", accessor: "email" },
                        {
                          Header: "Student Number",
                          accessor: "studentNumber",
                          Cell: ({ value }) => value || "-",
                        },
                        { Header: "Role", accessor: "role" },
                        {
                          Header: "action",
                          accessor: "actions",
                          width: "15%",
                          Cell: ({ row }) => (
                            <SoftButton onClick={() => openEdit(row)}>Edit</SoftButton>
                          ),
                        },
                      ],
                      rows: users,
                    }}
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
      </SoftBox>
    </Card>
  );
}

export default Users;
