/* eslint-disable no-underscore-dangle */
/* eslint-disable no-nested-ternary */
/**
=========================================================
* Distance Learning React - v1.1.0
=========================================================

Coded by Gwarant-Service

*/

// Distance Learning React components
import SoftBox from "components/SoftBox";

// Distance Learning React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import { useEffect, useState } from "react";
import useAuth from "hooks/useAuth";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import SoftTypography from "components/SoftTypography";
import CategoriesList from "examples/Lists/CategoriesList";
import SoftButton from "components/SoftButton";
import About from "./components/About";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useTranslation } from "react-i18next";

function Courses() {
  const { t } = useTranslation("translation", { keyPrefix: "courses" });
  const { auth } = useAuth();
  const [courses, setCourses] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [refresh, setRefresh] = useState(true);
  const [pic, setPic] = useState("/storage/courses/course_images/course_image_11.gif");

  useEffect(() => {
    const fetchUserCourses = async () => {
      try {
        const { data } = await axiosPrivate.get(`/users/${auth.userId}/courses`);
        setCourses(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    const fetchTeacherCourses = async () => {
      try {
        const { data } = await axiosPrivate.get(`/users/teacher/${auth.userId}/courses`);
        setCourses(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    if (auth.roles?.includes(5150)) {
      fetchTeacherCourses();
    } else {
      fetchUserCourses();
    }
  }, [isVisible, refresh]);

  const handleOpen = async (e) => {
    e.preventDefault();

    setIsVisible(true);
  };
  const handleClose = async (e) => {
    e.preventDefault();
    setName("");
    setDescription("");
    setPic("/storage/courses/course_images/course_image_11.gif");

    setIsVisible(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    axiosPrivate.post("/courses", {
      teacherId: auth.userId,
      name,
      description,
      pic,
    });
    setName("");
    setDescription("");
    setPic("/storage/courses/course_images/course_image_11.gif");
    setTimeout(1000);

    setIsVisible(false);
    setRefresh(!refresh);
  };

  if (!loading) {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        {auth.roles?.includes(5150) && (
          <SoftBox>
            {isVisible ? (
              <SoftBox>
                {name === "" || description === "" ? (
                  <>
                    <SoftButton color="success" circular disabled onClick={handleSave}>
                      {t("save")}
                    </SoftButton>
                    <SoftButton color="error" circular onClick={handleClose} sx={{ ml: 1 }}>
                      {t("cancel")}
                    </SoftButton>
                  </>
                ) : (
                  <>
                    <SoftButton color="success" circular onClick={handleSave}>
                      {t("save")}
                    </SoftButton>
                    <SoftButton color="error" circular onClick={handleClose} sx={{ ml: 1 }}>
                      {t("cancel")}
                    </SoftButton>
                  </>
                )}
                <About
                  pic={pic}
                  description={description}
                  name={name}
                  setName={setName}
                  setDescription={setDescription}
                  setPic={setPic}
                />
              </SoftBox>
            ) : (
              <SoftButton color="success" circular onClick={handleOpen} sx={{ mb: 1 }}>
                {t("add")}
              </SoftButton>
            )}
          </SoftBox>
        )}

        {courses.length > 0 ? (
          <SoftBox py={3}>
            <CategoriesList
              title={t("courses")}
              categories={courses.map((course) => ({
                color: "dark",
                image: course.pic,
                name: course.name,
                description: (
                  <>
                    {course.teacherId.name} {course.teacherId.surname}
                    {"   "}
                    <SoftTypography variant="caption" color="text" fontWeight="medium">
                      {course.members.length} {t("members")}
                    </SoftTypography>
                  </>
                ),
                route: `/courses/course-info/${course._id}`,
              }))}
            />
          </SoftBox>
        ) : (
          <SoftBox py={3}>{t("nocourses")}</SoftBox>
        )}
        <Footer />
      </DashboardLayout>
    );
  }
  return (
    <DashboardLayout>
      <Footer />
    </DashboardLayout>
  );
}

export default Courses;
