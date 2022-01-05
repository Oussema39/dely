import axios from "axios";

const baseUrl = "http://localhost:3030";

const targetUrl = (resource) => `${baseUrl}/${resource}`;

export const getAllQuestions = async () =>
  await axios.get(targetUrl("question"));

export const getQuestionByTitle = async (title) => {
  const allQuestions = (await (await getAllQuestions()).data) || [];
  if (allQuestions.length <= 0) return null;
  return allQuestions?.find(({ title: _title }) => _title === title);
};
