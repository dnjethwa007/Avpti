import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import Course from "./Course/Courses";
import Sem from "./Sem/Sem";
import SemDetails from "./Sem/SemDetails";
import SubjectDetails from "./Sem/SubjectDetails";
import Syllabus from "./Syllabus/Syllabuss";
import StudentMaterial from './Syllabus/StudentMaterial';
import Assignment from "./Syllabus/Assignment";
// import ImportantQuestions from "./Syllabus/ImportantQuestions";
// import ModelQuestionPaper from "./Syllabus/ModelQuestionPaper";
// import GTUExamPaper from "./Syllabus/GTUExamPaper";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/course" element={<Course />} />
        <Route path="/course/:courseTitle" element={<Sem />} />
        <Route path="/course/:courseTitle/:semId" element={<SemDetails />} />
        <Route path="/course/:courseTitle/:semId/:subjectCode" element={<SubjectDetails />} />
        <Route path="/course/:courseTitle/:semId/:subjectCode/syllabus" element={<Syllabus />} />
        <Route path="/course/:courseTitle/:semId/:subjectCode/student-material" element={<StudentMaterial />} />
        <Route path="/course/:courseTitle/:semId/:subjectCode/assignment" element={<Assignment />} />
        {/* <Route path="/course/:courseTitle/:semId/:subjectCode/important-questions" element={<ImportantQuestions />} />
        <Route path="/course/:courseTitle/:semId/:subjectCode/model-question-paper" element={<ModelQuestionPaper />} />
        <Route path="/course/:courseTitle/:semId/:subjectCode/gtu-exam-paper" element={<GTUExamPaper />} /> */}
      </Routes>
    </>
  );
}
