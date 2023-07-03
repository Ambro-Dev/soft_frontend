import SoftBox from "components/SoftBox";
import ErrorContext from "context/ErrorProvider";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { useContext, useEffect, useState } from "react";
import VerticalBarChart from "examples/Charts/BarCharts/VerticalBarChart";

function formatDate(dateString) {
  const date = new Date(dateString);
  const today = new Date();

  if (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  ) {
    return "Today";
  }

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  if (
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear()
  ) {
    return "Yesterday";
  }

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${day}-${month}`;
}

function LoginsChart() {
  const { showErrorNotification } = useContext(ErrorContext);
  const [days, setDays] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const [usersCount, setUserCount] = useState([]);

  useEffect(() => {
    axiosPrivate
      .get("admin/login-count")
      .then((response) => {
        const newData = response.data.map((row) => row.count);
        const newDays = response.data.map((row) => formatDate(row.date));
        setUserCount(newData.reverse());
        setDays(newDays.reverse());
      })
      .catch(() => showErrorNotification("Error", "Couldn't load user logins count"));
  }, []);

  return (
    <SoftBox>
      {days.length > 0 && (
        <VerticalBarChart
          fullWidth
          icon={{ color: "info", component: "leaderboard" }}
          title="Last 7 days users"
          description="Users that logged into app"
          chart={{
            labels: days,
            datasets: [
              {
                label: "Users",
                color: "dark",
                data: usersCount,
              },
            ],
          }}
        />
      )}
    </SoftBox>
  );
}

export default LoginsChart;
