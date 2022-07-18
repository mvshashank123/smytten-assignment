import React, { useState, useEffect } from "react";
import Select from "react-select";
import allQuestions from "../questions.json";

const Question = () => {
  const [questions, setQuestions] = useState([]);
  const [questionsObj, setQuestionsObj] = useState({});
  const [selectedQuestionId, setSelectedQuestionId] = useState("");
  const [questionType, setQuestionType] = useState("");

  const singleSelectOptions = [
    {
      value: "IS",
      label: "EQUAL",
    },
    {
      value: "IS NOT",
      label: "NOT EQUAL",
    },
  ];
  const multiSelectOptions = [
    {
      value: "CONTAINS",
      label: "CONTAINS",
    },
    {
      value: "DOES_NOT_CONTAIN",
      label: "DOES_NOT_CONTAIN",
    },
    {
      value: "IS_EXACTLY",
      label: "IS_EXACTLY",
    },
  ];

  const handleQuestionChange = (value) => {
    setSelectedQuestionId(value?.value);
  };

  useEffect(() => {
    let obj = {};
    let options = allQuestions?.map((item) => {
      return {
        value: item.id,
        label: item.question_text,
      };
    });
    for (let i = 0; i < allQuestions.length; i++) {
      obj[allQuestions[i]["id"]] = allQuestions[i];
    }
    setQuestions(options);
    setQuestionsObj(obj);
  }, []);

  useEffect(() => {
    comparisonDropdown();
  }, [selectedQuestionId, questionType]);

  const comparisonDropdown = () => {
    for (let i = 0; i < allQuestions?.length; i++) {
      if (selectedQuestionId === allQuestions[i]["id"]) {
        let questionType = allQuestions[i]["question_type"];
        if (questionType === "SINGLE_SELECT") {
          setQuestionType("SINGLE_SELECT");
        } else if (questionType === "MULTI_SELECT") {
          setQuestionType("MULTI_SELECT");
        }
      }
    }
  };

  const getOptions = () => {
    let options = questionsObj[selectedQuestionId]["options"].map((item) => {
      return {
        value: item,
        label: item,
      };
    });
    return options;
  };

  return (
    <div>
      <Select
        className="basic-single w-50"
        classNamePrefix="select"
        isSearchable={true}
        name="color"
        onChange={handleQuestionChange}
        options={questions}
      />
      <>
        <Select
          className="basic-single w-50 mt-2"
          classNamePrefix="select"
          isSearchable={true}
          name="color"
          options={
            questionType === "SINGLE_SELECT"
              ? singleSelectOptions
              : multiSelectOptions
          }
        />
      </>
      <>
        {selectedQuestionId && (
          <Select
            className="basic-single w-50 mt-2"
            classNamePrefix="select"
            isSearchable={true}
            name="color"
            isMulti={questionType === "MULTI_SELECT"}
            options={getOptions()}
          />
        )}
      </>
    </div>
  );
};

export default Question;
