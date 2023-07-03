/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/**
=========================================================
* Distance Learning React - v1.1.0
=========================================================

Coded by Ambro-Dev

*/

// @mui material components
import Card from "@mui/material/Card";

// Distance Learning React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import { useContext, useEffect, useState } from "react";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { Autocomplete, CircularProgress, Divider, Grid, TextField } from "@mui/material";
import DataTable from "examples/Tables/DataTable";
import { useLocation, useNavigate } from "react-router-dom";
import PageLayout from "examples/LayoutContainers/PageLayout";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import pageRoutes from "page.routes";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";
import ErrorContext from "context/ErrorProvider";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import FooterAdmin from "layouts/admin-page/FooterAdmin";

function EditCourse() {
  const [manage, setManage] = useState(false);
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const [edit, setEdit] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const course = location.state;
  const [name, setName] = useState("");
  const [newName, setNewName] = useState("");
  const [description, setDescription] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [teacher, setTeacher] = useState({});
  const [newTeacher, setNewTeacher] = useState({});
  const [teachersList, setTeachersList] = useState([]);
  const [members, setMembers] = useState([]);
  const [changed, setChanged] = useState(false);
  const [allStudents, setAllStudents] = useState([]);
  const [addMembers, setAddMembers] = useState(false);
  const [membersToAdd, setMembersToAdd] = useState([]);

  const [reload, setReload] = useState(false);

  const { showErrorNotification, showInfoNotification, showSuccessNotification } =
    useContext(ErrorContext);

  useEffect(() => {
    if (course) {
      setName(course.name);
      setNewName(course.name);
      setDescription(course.description);
      setNewDescription(course.description);
      axiosPrivate
        .get(`users/${course.teacherId}`)
        .then((response) => {
          setTeacher(response.data);
          setNewTeacher(response.data);
        })
        .catch(() => {
          showErrorNotification("Error", "Couldn't load users");
        });

      axiosPrivate
        .get(`courses/${course.id}/members`)
        .then((response) => {
          const newRows = response.data.map((row) => ({ ...row, isSelected: false }));
          setMembers(newRows);
          axiosPrivate
            .get("admin/students")
            .then((res) => {
              const getStudents = res.data.filter(
                (student) => !newRows.some((member) => member._id === student._id)
              );
              setAllStudents(getStudents);
            })
            .catch((error) => {
              showErrorNotification("Error", error.message);
            });
        })
        .catch((error) => {
          showErrorNotification("Error", error.message);
        });

      axiosPrivate
        .get("users/teachers")
        .then((response) => {
          setTeachersList(response.data);
        })
        .catch((error) => {
          showErrorNotification("Error", error.message);
        });
    }
  }, [reload]);

  useEffect(() => {
    const hasChanges = newDescription !== description || newName !== name || newTeacher !== teacher;
    setChanged(hasChanges);
  }, [newDescription, newName, newTeacher]);

  const handleSubmit = async () => {
    try {
      const newCourse = {
        id: course.id,
        name: newName !== name ? newName : undefined,
        description: newDescription !== description ? newDescription : undefined,
        teacherId: newTeacher !== teacher ? newTeacher : undefined,
      };
      await axiosPrivate
        .put(process.env.REACT_APP_CHANGE_COURSE_URL, newCourse)
        .then((response) => {
          if (response.status === 200) {
            showSuccessNotification(response.data.message);
            setEdit(!edit);
          } else showErrorNotification("Error", response.data.message);
        });
      // clear state and controlled inputs
      setChanged(false);
    } catch (err) {
      if (!err?.response) {
        showErrorNotification("Error", "Changing failed, server error");
      } else {
        showInfoNotification(err.response.data.message);
      }
    }
    setReload(!reload);
  };

  const handleSelectAll = () => {
    if (selectedRowIds.length < members.length) {
      setSelectedRowIds(members.map((row) => row._id));
    } else {
      setSelectedRowIds([]);
    }
  };

  const handleRemoveMembers = () => {
    axiosPrivate
      .post(`/admin/${course.id}/members`, { memberIds: selectedRowIds })
      .then((response) => {
        if (response.status === 200) showInfoNotification(response.data.message);
        else showErrorNotification("Error", response.data.message);
        setReload(!reload);
      });
  };

  const handleRowSelect = (rowId) => {
    if (!selectedRowIds.includes(rowId)) {
      // add row ID to selectedRowIds if it's not already in the array
      setSelectedRowIds([...selectedRowIds, rowId]);
    } else {
      // remove row ID from selectedRowIds if it's in the array
      setSelectedRowIds(selectedRowIds.filter((id) => id !== rowId));
    }
  };

  const addUserToMembers = (user) => {
    if (!membersToAdd.includes(user)) setMembersToAdd([...membersToAdd, user]);
    else {
      setMembersToAdd(membersToAdd.filter((member) => member !== user));
    }
  };

  const deleteCourse = () => {
    axiosPrivate.delete(`/admin/delete-course/${course.id}`).then(() => {
      navigate(-1);
    });
  };

  const openImport = () => {
    const courseInfo = {
      id: course.id,
      description,
      name,
    };

    navigate("/admin/import-members", { state: courseInfo });
  };

  const handleAddMembers = async () => {
    const newMembers = membersToAdd.map((row) => row._id);
    await axiosPrivate
      .put(`admin/${course.id}/members`, { memberIds: newMembers })
      .then((response) => {
        if (response.status === 500) showErrorNotification("Error", response.data.message);
        else showInfoNotification(response.data.message);
      });
    setMembersToAdd([]);
    setReload(!reload);
  };

  return (
    <PageLayout>
      <DefaultNavbar routes={pageRoutes} transparent />
      <SoftBox my={3} mt={12} ml={1} mr={1}>
        <Card sx={{ marginTop: 3 }}>
          <SoftBox
            variant="gradient"
            bgColor="secondary"
            borderRadius="lg"
            coloredShadow="success"
            mx={2}
            mt={-3}
            p={3}
            mb={1}
            my={3}
            textAlign="center"
          >
            <SoftTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              Edit Course
            </SoftTypography>
          </SoftBox>

          <SoftBox pt={4} pb={3} px={3}>
            {course ? (
              <SoftBox component="form" role="form">
                <Grid container spacing={1}>
                  <Grid item xs={8} lg={10}>
                    {edit ? (
                      <SoftBox display="flex" flexDirection="column">
                        <SoftBox mb={2}>
                          <SoftTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                            Name
                          </SoftTypography>
                          <SoftInput
                            type="text"
                            variant="standard"
                            required
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            fullWidth
                          />
                        </SoftBox>
                        <SoftBox mb={2}>
                          <SoftTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                            Description
                          </SoftTypography>
                          <SoftInput
                            type="text"
                            multiline
                            variant="standard"
                            value={newDescription}
                            required
                            onChange={(e) => setNewDescription(e.target.value)}
                            fullWidth
                          />
                        </SoftBox>
                        <SoftBox pr={1}>
                          <Autocomplete
                            disablePortal
                            options={teachersList}
                            getOptionLabel={(user) => `${user.name} ${user.surname}`}
                            onChange={(event, value) => setNewTeacher(value ? value._id : "")}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label={`${newTeacher.name} ${newTeacher.surname}`}
                              />
                            )}
                          />
                        </SoftBox>
                      </SoftBox>
                    ) : (
                      <SoftBox display="flex" flexDirection="column">
                        <SoftBox p={2}>
                          <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                            <SoftTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                              Name
                            </SoftTypography>
                          </SoftBox>
                          <SoftBox sx={{ overflow: "auto", maxHeight: 250 }}>
                            <SoftTypography color="text" variant="body2">
                              {name}
                            </SoftTypography>
                          </SoftBox>
                        </SoftBox>
                        {description && (
                          <SoftBox p={2}>
                            <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                              <SoftTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                                Description
                              </SoftTypography>
                            </SoftBox>
                            <SoftBox sx={{ overflow: "auto", maxHeight: 250 }}>
                              <SoftTypography color="text" variant="body2">
                                {description}
                              </SoftTypography>
                            </SoftBox>
                          </SoftBox>
                        )}
                        <SoftBox p={2}>
                          <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                            <SoftTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                              Teacher
                            </SoftTypography>
                          </SoftBox>
                          <SoftBox sx={{ overflow: "auto", maxHeight: 250 }}>
                            <SoftTypography color="text" variant="body2">
                              {teacher.name} {teacher.surname}
                            </SoftTypography>
                          </SoftBox>
                        </SoftBox>
                      </SoftBox>
                    )}
                  </Grid>
                  <Grid item xs={4} lg={2} textAlign="center" display="flex" flexDirection="column">
                    {!edit ? (
                      <SoftBox mt={4} mb={1} textAlign="center">
                        <SoftButton
                          variant="gradient"
                          color="error"
                          onClick={() => {
                            navigate(-1);
                          }}
                        >
                          Go back
                        </SoftButton>
                      </SoftBox>
                    ) : (
                      <SoftBox mt={4} mb={1} textAlign="center">
                        <SoftButton
                          variant="contained"
                          color="success"
                          disabled={!changed || !newName || !newDescription || !newTeacher}
                          onClick={handleSubmit}
                        >
                          Save changes
                        </SoftButton>
                      </SoftBox>
                    )}

                    <SoftBox mt={1} mb={1} textAlign="center">
                      <SoftButton
                        variant="contained"
                        color="warning"
                        onClick={() => {
                          setEdit(!edit);
                          setNewName(name);
                          setNewDescription(description);
                          setNewTeacher(teacher);
                        }}
                      >
                        {!edit ? "Edit" : "Cancel"}
                      </SoftButton>
                    </SoftBox>
                    {edit && (
                      <SoftBox mt={1} mb={1} textAlign="center">
                        <SoftButton
                          variant="contained"
                          color="error"
                          onClick={() => deleteCourse()}
                        >
                          Delete
                        </SoftButton>
                      </SoftBox>
                    )}
                  </Grid>
                </Grid>
                <SoftBox mt={5}>
                  <SoftBox>
                    <SoftButton
                      sx={{ margin: 1 }}
                      color={manage ? "warning" : "success"}
                      onClick={() => {
                        setManage(!manage);
                        setAddMembers(false);
                      }}
                    >
                      {manage ? "Cancel" : "Manage members"}
                    </SoftButton>
                  </SoftBox>
                  <Divider />

                  {manage ? (
                    <SoftBox mt={2}>
                      <SoftBox display="flex">
                        {!addMembers && (
                          <SoftButton
                            color="error"
                            disabled={!selectedRowIds.length}
                            sx={{ margin: 1 }}
                            onClick={() => handleRemoveMembers()}
                          >
                            Remove selected members
                          </SoftButton>
                        )}
                        <SoftButton
                          color="info"
                          sx={{ margin: 1 }}
                          onClick={() => setAddMembers(!addMembers)}
                        >
                          {!addMembers ? "Add members" : "Go back"}
                        </SoftButton>
                        {addMembers && (
                          <SoftButton
                            color="info"
                            sx={{ margin: 1 }}
                            onClick={() => openImport()}
                            endIcon={<AddIcon sx={{ height: 20, width: 20 }} />}
                          >
                            <SoftTypography
                              variant="button"
                              sx={{ color: "#FFFFFF" }}
                              fontWeight="medium"
                            >
                              Import members (CSV)
                            </SoftTypography>
                          </SoftButton>
                        )}
                      </SoftBox>

                      {!addMembers ? (
                        <DataTable
                          table={{
                            columns: [
                              {
                                Header: (
                                  <SoftBox>
                                    <SoftButton
                                      onClick={() => handleSelectAll()}
                                      startIcon={
                                        selectedRowIds.length === members.length ? (
                                          <CheckBoxIcon sx={{ height: 25, width: 25 }} />
                                        ) : (
                                          <CheckBoxOutlineBlankIcon
                                            sx={{ height: 25, width: 25 }}
                                          />
                                        )
                                      }
                                    >
                                      <SoftTypography variant="button" fontWeight="medium">
                                        Select All
                                      </SoftTypography>
                                    </SoftButton>
                                  </SoftBox>
                                ),
                                accessor: "checkbox",
                                Cell: ({ row }) => (
                                  <SoftButton
                                    onClick={() => {
                                      handleRowSelect(row.original._id);
                                    }}
                                    iconOnly
                                  >
                                    {selectedRowIds.includes(row.original._id) ? (
                                      <CheckBoxIcon sx={{ height: 20, width: 20 }} />
                                    ) : (
                                      <CheckBoxOutlineBlankIcon sx={{ height: 20, width: 20 }} />
                                    )}
                                  </SoftButton>
                                ),
                                isCheckbox: true,
                                width: 10,
                              },
                              { Header: "name", accessor: "name" },
                              { Header: "surname", accessor: "surname" },
                            ],
                            rows: members,
                          }}
                          entriesPerPage={false}
                          canSearch
                        />
                      ) : (
                        <Grid container spacing={1}>
                          <Grid item lg={8} xs={12}>
                            <SoftBox
                              variant="gradient"
                              bgColor="secondary"
                              borderRadius="lg"
                              coloredShadow="success"
                              mt={-3}
                              p={1}
                              mb={1}
                              my={3}
                              textAlign="center"
                            >
                              <SoftTypography variant="h6" fontWeight="medium" color="white">
                                AVAILABLE STUDENTS
                              </SoftTypography>
                            </SoftBox>
                            {allStudents ? (
                              <DataTable
                                table={{
                                  columns: [
                                    { Header: "name", accessor: "name" },
                                    { Header: "surname", accessor: "surname" },
                                    {
                                      Header: "action",
                                      accessor: "action",
                                      width: "15%",
                                      Cell: ({ row }) => (
                                        <SoftButton
                                          onClick={() => addUserToMembers(row.original)}
                                          disabled={
                                            membersToAdd.includes(row.original) ||
                                            members.some((member) => allStudents.includes(member))
                                          }
                                          endIcon={
                                            <ArrowForwardIcon sx={{ height: 20, width: 20 }} />
                                          }
                                          color="success"
                                        >
                                          <SoftTypography
                                            variant="button"
                                            sx={{ color: "#FFFFFF" }}
                                            fontWeight="medium"
                                          >
                                            Add
                                          </SoftTypography>
                                        </SoftButton>
                                      ),
                                    },
                                  ],
                                  rows: allStudents,
                                }}
                                entriesPerPage={false}
                                canSearch
                              />
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
                          </Grid>
                          <Grid item lg={4} xs={12}>
                            <SoftBox
                              variant="gradient"
                              bgColor="secondary"
                              borderRadius="lg"
                              coloredShadow="success"
                              mt={-3}
                              p={1}
                              mb={1}
                              my={3}
                              textAlign="center"
                            >
                              <SoftTypography variant="h6" fontWeight="medium" color="white">
                                SELECTED
                              </SoftTypography>
                            </SoftBox>
                            <SoftBox>
                              <SoftBox display="flex" justifyContent="space-between" m={2}>
                                <SoftButton
                                  onClick={() => setMembersToAdd([])}
                                  startIcon={<ClearIcon sx={{ height: 20, width: 20 }} />}
                                  color="error"
                                  disabled={membersToAdd.length === 0}
                                >
                                  <SoftTypography
                                    variant="button"
                                    sx={{ color: "#FFFFFF" }}
                                    fontWeight="medium"
                                  >
                                    Remove All
                                  </SoftTypography>
                                </SoftButton>
                                <SoftBox>
                                  <SoftTypography variant="button" fontWeight="medium">
                                    Selected: {membersToAdd.length}
                                  </SoftTypography>
                                </SoftBox>
                              </SoftBox>

                              <DataTable
                                table={{
                                  columns: [
                                    {
                                      Header: "action",
                                      accessor: "action",
                                      width: "15%",
                                      Cell: ({ row }) => (
                                        <SoftButton
                                          onClick={() => addUserToMembers(row.original)}
                                          startIcon={
                                            <ArrowBackIcon sx={{ height: 20, width: 20 }} />
                                          }
                                          color="error"
                                          variant="outlined"
                                        >
                                          <SoftTypography
                                            variant="button"
                                            sx={{ color: "#f65f53" }}
                                            fontWeight="medium"
                                          >
                                            Remove
                                          </SoftTypography>
                                        </SoftButton>
                                      ),
                                    },
                                    { Header: "name", accessor: "name" },
                                    { Header: "surname", accessor: "surname" },
                                  ],
                                  rows: membersToAdd,
                                }}
                                entriesPerPage={false}
                              />
                              <SoftButton
                                onClick={() => handleAddMembers()}
                                color="success"
                                disabled={membersToAdd.length === 0}
                                fullWidth
                              >
                                Add selected
                              </SoftButton>
                            </SoftBox>
                          </Grid>
                        </Grid>
                      )}
                    </SoftBox>
                  ) : (
                    <DataTable
                      table={{
                        columns: [
                          { Header: "name", accessor: "name" },
                          { Header: "surname", accessor: "surname" },
                        ],
                        rows: members,
                      }}
                      entriesPerPage={false}
                      canSearch
                    />
                  )}
                </SoftBox>
              </SoftBox>
            ) : (
              <SoftBox>No course selected</SoftBox>
            )}
          </SoftBox>
        </Card>
      </SoftBox>
      <FooterAdmin />
    </PageLayout>
  );
}

export default EditCourse;
