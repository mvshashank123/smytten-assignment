import { useState, useEffect } from "react";
import allQuestions from "./questions.json";
import "./App.css";
import Question from "./formComponents/Question";
import Select from "react-select";

function Form() {
  const [questions, setQuestions] = useState();
  const [expressionType, setExpressionType] = useState("DEFAULT_TRUE");

  let expressionOptions = [
    {
      value: "DEFAULT_TRUE",
      label: "None",
    },
    {
      value: "SIMPLE_CONDITION",
      label: "SIMPLE_EXPRESSION",
    },
    {
      value: "OR_CONDITON",
      label: "OR_EXPRESSION",
    },
    {
      value: "AND_CONDITON",
      label: "AND_EXPRESSION",
    },
  ];

  useEffect(() => {
    setQuestions(allQuestions);
  }, []);

  const handleExpressionChange = (value) => {
    setExpressionType(value?.value);
  };

  const getFormUI = () => {
    switch (expressionType) {
      case "SIMPLE_CONDITION":
        return <Question />;
      case "OR_CONDITON":
        return (
          <div className="p-2">
            <div style={{ border: "1px solid red" }}>
              <Form />
            </div>
            <div style={{ border: "1px solid red" }}>
              <Form />
            </div>
          </div>
        );
      case "AND_CONDITON":
        return (
          <div style={{ border: "1px solid red" }}>
            <Form />
            <Form />
          </div>
        );
      default:
        return <Question />;
    }
  };

  return (
    <div className="container p-2">
      <Select
        className="mb-2 w-50"
        options={expressionOptions}
        defaultValue={expressionType}
        onChange={handleExpressionChange}
      />
      {getFormUI()}
    </div>
  );
}

export default Form;
