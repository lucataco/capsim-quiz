import React, { useEffect, useState } from "react";
import SubmitModal from "./SubmitModal";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [QValues, setQValues] = useState([]);
  const [maxScore, setMax] = useState(100);

  async function getQuestions() {
    const res = await fetch("/quiz");
    const questionList = await res.json();
    setQuestions(questionList);
    setQValues(Array(questionList.length).fill(0));
    var maxSum = 0;
    for (var q in questionList) {
      var maxAns = 0;
      for (var a in questionList[q].answers) {
        var ansVal = questionList[q].answers[a].val;
        //Add max possible answer differently if Single/Multiple choice
        if (questionList[q].question_type) {
          maxAns += ansVal;
        } else {
          if (ansVal && ansVal > maxAns) maxAns = ansVal;
        }
      }
      maxSum += maxAns;
    }
    setMax(maxSum);
  }

  useEffect(() => {
    getQuestions();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const pts = QValues.reduce((a, b) => a + b, 0);
      const score = Math.round((pts / maxScore) * 100);
      const response = await fetch("/score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ val: score }),
      });
      console.log(response);
      // alert(
      //   `You scored:${pts} out of (${maxScore}) possible points! Final score: ${score}%`
      // );
      var exampleModal = document.getElementById("exampleModal");
      var modalBodyInput = exampleModal.querySelector(".modal-body");
      modalBodyInput.textContent = `You scored:${pts} out of (${maxScore}) possible points! Final score: ${score}%`;
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div class="card">
      <h5 class="text-left card-header">Capsim Quiz</h5>
      <div class="card-body" className="cardBody">
        <form className="d-grid gap-3" onSubmit={onSubmit}>
          {questions.map((q, qid) => (
            <div className="ms-2">
              <h5>
                {q.question_id}. {q.description}
              </h5>
              <div className="ms-5">
                {q.answers &&
                  q.answers.map((a, aid) => (
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type={!q.question_type ? "radio" : "checkbox"}
                        name={"ans-" + q.question_id}
                        id={"ans-" + q.question_id + "-" + a.ans_id}
                        value={QValues[qid]}
                        onChange={(e) => {
                          const t = QValues;
                          const ansList = questions[qid].answers;
                          var val = 0;
                          if (questions[qid].question_type === 1)
                            val = e.target.checked
                              ? t[qid] + ansList[aid].val
                              : t[qid] - ansList[aid].val;
                          else val = ansList[aid].val;
                          t[qid] = val;
                          setQValues(t);
                        }}
                      />
                      <label
                        class="form-check-label"
                        for={"ans-" + q.question_id + "-" + a.ans_id}
                      >
                        {a.description}
                      </label>
                    </div>
                  ))}
              </div>
            </div>
          ))}
          <button
            className="btn btn-success"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Submit
          </button>
          <SubmitModal values={QValues} maxScore={maxScore} />
        </form>
      </div>
    </div>
  );
};

export default Quiz;
