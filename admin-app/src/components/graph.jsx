import { Line,Bar } from "react-chartjs-2";
import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  PointElement,
  BarElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Title,
  Legend
);

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  Tooltip,
  Title,
  Legend
);
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
const options = {
  indexAxis: "x",
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "left",
    },
  },
  title: {
    display: true,
    text: "Chart.js Bar chart",
  },
  margin: {
    top: 80,
    right: 20,
    bottom: 10,
    left: 20,
  },
};

const labels = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

const Graph = () => {
  const [data, setData] = useState({
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: [1, 2, 3, 4, 5, 4],
        borderColor: "rgb(255,99,132)",
        backgroundColor: "rgba(53,162,235,0.5)",
        fill: false,
      },
      {
        label: "Dataset 2",
        data: [1, 2, 3, 4, 5, 2],
        borderColor: "rgb(255,99,132)",
        backgroundColor: "rgba(53,162,235,0.5)",
        fill: false,
      },
    ],
  });

  const fetchData = async () => {
    const dataset1 = [];
    const dataset2 = [];

    try {
      const response = await fetch(`${apiUrl}api/users`, {
        method: "GET",
      });

      const res = await response.json();
      const ys = res.data;

      for (const val of ys) {
        dataset1.push(val.id);
        dataset2.push(val.product_id);
      }

      setData({
        labels,
        datasets: [
          {
            label: "Dataset 1",
            data: dataset1,
            borderColor: "rgb(255,99,132)",
            backgroundColor: "rgba(53,162,235,0.5)",
            fill: false,
          },
          {
            label: "Dataset 2",
            data: dataset2,
            borderColor: "rgb(255,99,132)",
            backgroundColor: "rgba(53,162,235,0.5)",
            fill: false,
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div
        className="graphcontainer"
        style={{ display: "flex", justifyContent: "center", marginTop: "10%" }}
      >
        <div
          style={{
            height: "40%",
            width: "50%",
          }}
        >
          <Bar data={data} options={options} />
        </div>
      </div>
    </>
  );
};

export default Graph;
