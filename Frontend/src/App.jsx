import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home/Home';
import Course from './Course/Courses';
import Sem from './Sem/Sem';
import SemDetails from './Sem/SemDetails';
import SubjectDetails from './Sem/SubjectDetails';
import Syllabus from './Syllabus/Syllabuss';
import StudentMaterial from './Syllabus/StudentMaterial';
import Assignment from './Syllabus/Assignment';
import Profile from './components/Profile';
import PrivateRoute from './components/PrivateRoute';

export default function App() {
    return (
        <div className="dark:bg-slate-900 dark:text-white dark:min-h-screen">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/course" element={<Course />} />
                <Route path="/course/:courseTitle" element={<PrivateRoute element={Sem} />} />
                <Route path="/course/:courseTitle/:semId" element={<PrivateRoute element={SemDetails} />} />
                <Route path="/course/:courseTitle/:semId/:subjectCode" element={<PrivateRoute element={SubjectDetails} />} />
                <Route path="/course/:courseTitle/:semId/:subjectCode/syllabus" element={<PrivateRoute element={Syllabus} />} />
                <Route path="/course/:courseTitle/:semId/:subjectCode/student-material" element={<PrivateRoute element={StudentMaterial} />} />
                <Route path="/course/:courseTitle/:semId/:subjectCode/assignment" element={<PrivateRoute element={Assignment} />} />
                <Route path="/profile" element={<PrivateRoute element={Profile} />} />
            </Routes>
        </div>
    );
}
