import React from "react";
import { Bar } from "react-chartjs-2";

const labels = [
  "90%-100%",
  "80%-89%",
  "70%-79%",
  "60%-69%",
  "50%-59%",
  "40%-49%",
  "30%-39%",
  "20%-29%",
  "10%-19%",
  "0%-9%",
];

const options = {
  indexAxis: "y",
  elements: {
    bar: {
      borderWidth: 1,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
    },
  },
};

const dataset = {
  label: "# of Users",
  backgroundColor: "rgba(54, 162, 235, 0.2)",
  borderColor: "rgba(54, 162, 235, 1)",
  borderWidth: 1,
};

function addScores(scores) {
  dataset.data = scores;
  const datasets = [dataset];
  const ret = { labels, datasets };
  return ret;
}

const HorizontalBarChart = (props) => (
  <>
    <div className="header">
      <h1 className="title">Capsim Quiz Scores</h1>
    </div>
    <Bar data={addScores(props.scores)} options={options} />
  </>
);

export default HorizontalBarChart;
