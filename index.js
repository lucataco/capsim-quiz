const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const path = require("path");
const PORT = process.env.PORT || 5000;

//Middleware
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV == "production") {
  //server static content
  //npm run build
  app.use(express.static(path.join(__dirname, "client/build")));
}

//Return all answers and questions
//Quiz
app.get("/quiz", async (req, res) => {
  try {
    const getQuiz = await pool.query(
      "select jsonb_agg(js_object) result from ( select jsonb_build_object( 'question_id', question_id, 'question_type', question_type, 'description', description, 'answers', jsonb_agg(answer)) js_object from ( select t.*, jsonb_build_object('ans_id', s.ans_id, 'description', s.description, 'val', s.val ) answer from question t join answer s on s.question_id = t.question_id ) s group by question_id, question_type, description order by question_id) s"
    );
    res.json(getQuiz.rows[0].result);
  } catch (err) {
    console.log(err.message);
  }
});

//QUESTIONS
//
//get all questions
app.get("/question", async (req, res) => {
  try {
    const allQuestions = await pool.query("SELECT * from question");
    res.json(allQuestions.rows);
  } catch (err) {
    console.log(err.message);
  }
});

/**
{
  "question_type": "0", 0- Single, 1 - multiple choice
	"description": "What’s the first thing you should do when you need motivation?",
}
 */
//create question
app.post("/question", async (req, res) => {
  try {
    const { question_type, description } = req.body;
    console.log("Q_id:" + question_type + " D:" + description);
    const newQuestion = await pool.query(
      "INSERT INTO question (question_type, description) VALUES ($1, $2) RETURNING *",
      [question_type, description]
    );
    console.log(newQuestion);
    res.json(newQuestion.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

//ANSWERS
//
//get all answers
app.get("/answer", async (req, res) => {
  try {
    const allAnswers = await pool.query("SELECT * from answer");
    res.json(allAnswers.rows);
  } catch (err) {
    console.log(err.message);
  }
});

//get a set of answers for a specific question number
app.get("/answer/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const setOfAnswers = await pool.query(
      "SELECT * from answer WHERE question_id = $1",
      [id]
    );
    res.json(setOfAnswers.rows);
  } catch (err) {
    console.log(err.message);
  }
});

/**
{
	"question_id": "3",
	"description": "CompXM",
	"val": "1"
}
 */
//create answer
app.post("/answer", async (req, res) => {
  try {
    const { question_id, description, val } = req.body;
    console.log("Q_id:" + question_id + " D:" + description + " V:" + val);
    const newAnswer = await pool.query(
      "INSERT INTO ANSWER (question_id, description, val) VALUES ($1, $2, $3) RETURNING *",
      [question_id, description, val]
    );
    console.log(newAnswer);
    res.json(newAnswer.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

//Scores
app.get("/score", async (req, res) => {
  try {
    const getAllScores = await pool.query("select * from score");
    res.json(getAllScores.rows);
  } catch (err) {
    console.log(err.message);
  }
});

//submit score
app.post("/score", async (req, res) => {
  try {
    const { val } = req.body;
    const newScore = await pool.query(
      "INSERT INTO SCORE (val) VALUES ($1) RETURNING *",
      [val]
    );
    res.json(newScore.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

//404
app.get("*", async (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server starting on port ${PORT}`);
});
