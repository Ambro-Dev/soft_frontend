/* eslint-disable no-underscore-dangle */
/* eslint-disable new-cap */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unstable-nested-components */
// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Distance Learning React components
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";

// Distance Learning React examples
import DataTable from "examples/Tables/DataTable";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import useAuth from "hooks/useAuth";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import SoftAvatar from "components/SoftAvatar";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import SoftTypography from "components/SoftTypography";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Set up the fonts
pdfMake.vfs = pdfFonts.pdfMake.vfs;

// Data

function OrderList({ courseId }) {
  const { t } = useTranslation("translation", { keyPrefix: "memberslist" });
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const [imageUrls, setImageUrls] = useState([]);

  const { auth } = useAuth();

  const [users, setUsers] = useState([]);
  const [listUsers, setListUsers] = useState([]);
  const [csvList, setCsvList] = useState();

  const docDefinition = {
    content: [
      { text: "Users List", style: "header" },
      {
        table: {
          headerRows: 1,
          widths: ["*", "*", "*"],
          body: [["Name", "Surname"], ...users.map((user) => [user.name, user.surname])],
        },
      },
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10],
      },
    },
  };

  useEffect(() => {
    let isMounted = true; // Add a flag to track if the component is mounted

    const fetchUsers = async () => {
      try {
        const { data } = await axiosPrivate.get(`courses/${courseId}/members`, {
          headers: { "Content-Type": "application/json", Accept: "aplication/json" },
        });
        setUsers(data);
        const processedData = data.map((user) => ({
          name: user.name,
          surname: user.surname,
          studentNumber: user.studentNumber,
        }));
        const tableData = data.map((user) => ({
          id: user._id,
          name: user.name,
          surname: user.surname,
          studentNumber: user.studentNumber,
        }));
        setListUsers(tableData);

        const usersPictures = data.map((user) =>
          axiosPrivate
            .get(`/profile-picture/users/${user._id}/picture`, {
              responseType: "blob",
            })
            .then((response) => URL.createObjectURL(response.data))
            .catch((error) => {
              showErrorNotification("Error", error.message);
              return null;
            })
        );
        Promise.all(usersPictures).then((images) => {
          if (isMounted) {
            // Check if the component is still mounted before updating the state
            setImageUrls(images);
          }
        });
        setCsvList(processedData);
      } catch (error) {
        showErrorNotification("Error", error.message);
      }
    };

    fetchUsers();

    return () => {
      isMounted = false; // Set the flag to false when the component is unmounted
    };
  }, []);

  useEffect(() => {
    const tableData = users.map((user, index) => ({
      id: user._id,
      name: user.name,
      surname: user.surname,
      studentNumber: user.studentNumber,
      picture: imageUrls[index],
    }));
    setListUsers(tableData);
  }, [imageUrls]);

  const handlePdfExport = () => {
    const pdfDocGenerator = pdfMake.createPdf(docDefinition);
    pdfDocGenerator.download("users.pdf");
  };

  function exportCSV(tableData) {
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
    link.setAttribute("download", "table-data.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <SoftBox>
      <SoftBox my={3}>
        <SoftBox display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
          <SoftBox display="flex">
            <SoftBox ml={1}>
              <SoftButton variant="outlined" color="dark" onClick={() => exportCSV(csvList)}>
                <Icon>description</Icon>
                &nbsp;{t("exportcsv")}
              </SoftButton>
            </SoftBox>
            <SoftBox ml={1}>
              <SoftButton variant="outlined" color="dark" onClick={handlePdfExport}>
                <Icon>picture_as_pdf</Icon>
                &nbsp;{t("exportpdf")}
              </SoftButton>
            </SoftBox>
          </SoftBox>
        </SoftBox>
        <SoftBox>
          <SoftBox>
            <Card>
              <SoftBox pt={2} px={2} lineHeight={1}>
                <SoftTypography variant="h6" fontWeight="medium">
                  {t("members")} ({users.length})
                </SoftTypography>
              </SoftBox>
              <DataTable
                table={{
                  columns: [
                    {
                      Header: [t("picture")],
                      accessor: "picture",
                      width: "10%",
                      Cell: ({ row }) => <SoftAvatar src={row.original.picture} size="sm" />,
                    },
                    { Header: [t("name")], accessor: "name" },
                    { Header: [t("surname")], accessor: "surname" },
                    {
                      Header: [t("actions")],
                      accessor: "actions",
                      Cell: ({ row }) => (
                        <SoftButton onClick={() => navigate("/profile/messages")}>
                          {t("message")}
                        </SoftButton>
                      ),
                    },
                  ],
                  rows: listUsers,
                }}
                entriesPerPage={false}
                canSearch
              />
            </Card>
          </SoftBox>
        </SoftBox>
      </SoftBox>
    </SoftBox>
  );
}

OrderList.propTypes = {
  courseId: PropTypes.string.isRequired,
};

export default OrderList;
