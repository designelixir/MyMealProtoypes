import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Question from "./Question";
import { fetchQuestions } from "../redux/reducers/question";
import { ListGroup } from "react-bootstrap";

const Questions = ({ getQuestions, questions }) => {
  const [streak, setStreak] = useState([]);
  useEffect(() => {
    getQuestions();
  }, []);
  return (
    <ListGroup>
      {questions.map((question) => (
        <Question key={question.id} {...{ question, streak, setStreak }} />
      ))}
    </ListGroup>
  );
};

const mapState = (state) => {
  const { questions } = state.question;
  return {
    questions,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getQuestions() {
      dispatch(fetchQuestions());
    },
  };
};

export default connect(mapState, mapDispatch)(Questions);
