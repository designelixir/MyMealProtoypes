import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Container,
  ListGroupItem,
  ListGroup,
  Form,
  ToggleButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import { clearAnswer } from "../redux/reducers/question";
import { createStreak } from "../redux/reducers/streak";

const Question = ({ question, streak, setStreak, answered, addStreak }) => {
  const handleClick = (answer) => {
    if (question.answer === answer) {
      const newStreak = streak.length + 1;
      setStreak([
        ...streak,
        { questionId: question.id, answeredCorrectly: true },
      ]);
      answered(question.id);
      alert(`Correct, streak is now ${newStreak}`);
    } else {
      addStreak([
        ...streak,
        { questionId: question.id, answeredCorrectly: false },
      ]);
      const finalStreak = streak.length;
      setStreak([]);
      answered(question.id);
      alert(`Oh No! That was wrong, streak was ${finalStreak}`);
    }
  };
  return (
    <ListGroupItem>
      <Container className="d-flex justify-content-between">
        <Container className="d-flex flex-column">
          <h4>{question.text}</h4>
          <Form>
            <ToggleButtonGroup
              type="radio"
              name="distribution"
              defaultValue={"exponential"}
            >
              <ToggleButton onClick={() => handleClick("Fact")}>
                Fact
              </ToggleButton>
              <ToggleButton onClick={() => handleClick("Fiction")}>
                Fiction
              </ToggleButton>
            </ToggleButtonGroup>
          </Form>
        </Container>
        <ListGroup>
          {question.tags.map((tag) => (
            <ListGroupItem key={tag.id}>{tag.name}</ListGroupItem>
          ))}
        </ListGroup>
      </Container>
    </ListGroupItem>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatch = (dispatch) => {
  return {
    answered(questionId) {
      dispatch(clearAnswer(questionId));
    },
    addStreak(body) {
      dispatch(createStreak(body));
    },
  };
};

export default connect(mapStateToProps, mapDispatch)(Question);
