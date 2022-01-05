import React from "react";
import Section from "../../components/Section";

const StartExam = ({ exam }) => {
  return <Section>Starting exam {" " + (exam || 1)}</Section>;
};

export default StartExam;
