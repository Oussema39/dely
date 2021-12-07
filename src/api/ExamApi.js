import axios from "axios";

const baseUrl = "http://localhost:3030";

const targetUrl = (resource) => `${baseUrl}/${resource}`;

const getAllExams = async () => await axios.get(targetUrl("exam"));

export const getStudentExams = async (studentId) => {
  const payload = (await getAllExams()).data;
  const exams = payload?.filter((exam) =>
    exam?.participants?.includes(studentId)
  );
  return exams?.map(({ title, date, duration, note, teacher_id }) => ({
    title,
    date,
    duration,
    note,
    teacher_id,
  }));
};
export const getTeacherExams = async (teacherId) => {
  const payload = (await getAllExams()).data;
  const exams = payload?.filter(({ teacher_id }) => teacher_id === teacherId);
  return exams?.map(({ title, date, duration, note, teacher_id }) => ({
    title,
    date,
    duration,
    note,
    teacher_id,
  }));
};
