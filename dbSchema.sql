CREATE DATABASE capsim;

\c capsim

CREATE TABLE question(
    question_id SERIAL PRIMARY KEY,
    question_type INT,
    description varchar(255)
);

CREATE TABLE answer(
    ans_id SERIAL PRIMARY KEY,
    question_id INT,
    description varchar(255),
    val INT
);

CREATE TABLE score(
    score_id SERIAL PRIMARY KEY,
    val INT
);

