import React, { useState } from "react";
import Quiz from "./Quiz";
import Chart from "./Chart";

const TabList = () => {
  const [tabSel, setTabSel] = useState(0);

  return (
    <div className="container">
      <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
          <button
            class="nav-link active"
            id="home-tab"
            data-bs-toggle="tab"
            data-bs-target="#home"
            type="button"
            role="tab"
            aria-controls="home"
            aria-selected="true"
            onClick={() => setTabSel(0)}
          >
            Quiz
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class="nav-link"
            id="profile-tab"
            data-bs-toggle="tab"
            data-bs-target="#profile"
            type="button"
            role="tab"
            aria-controls="profile"
            aria-selected="false"
            onClick={() => setTabSel(1)}
          >
            Scores
          </button>
        </li>
      </ul>
      <div class="tab-content" id="myTabContent">
        <div
          class="tab-pane fade show active"
          id="home"
          role="tabpanel"
          aria-labelledby="home-tab"
        >
          {!tabSel && <Quiz />}
        </div>
        <div
          class="tab-pane fade"
          id="profile"
          role="tabpanel"
          aria-labelledby="profile-tab"
        >
          {tabSel && <Chart />}
        </div>
      </div>
    </div>
  );
};

export default TabList;
