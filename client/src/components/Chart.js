import React, { useEffect, useState } from "react";
import Barchart from "./BarChart";

const Chart = () => {
  const [scores, setScores] = useState([]);

  async function getScores() {
    const res = await fetch("/score");
    const scoreList = await res.json();
    const sortedList = Array(10).fill(0);
    scoreList.map((x) =>
      x.val >= "100"
        ? (sortedList[9] += 1)
        : (sortedList[Math.floor(x.val / 10)] += 1)
    );
    console.log(sortedList);
    setScores(sortedList.reverse());
  }

  useEffect(() => {
    getScores();
  }, []);

  return (
    <div class="card">
      <div class="card-body">
        <Barchart scores={scores} />
        {/* <button type="button" class="btn btn-success" onClick={getScores}>
          Refresh
        </button> */}
      </div>
    </div>
  );
};

export default Chart;
