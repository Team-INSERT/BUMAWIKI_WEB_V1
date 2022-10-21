import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  Home,
  Student,
  Teacher,
  Accident,
  Club,
  StudentInfo,
  TeacherInfo,
  AccidentInfo,
  ClubInfo
} from './allFiles';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path={'/'} element={<Home />} />
        <Route path={'/student'} element={<Student />} />
        <Route path={'/teacher'} element={<Teacher />} />
        <Route path={'/accident'} element={<Accident />} />
        <Route path={'/club'} element={<Club />} />
        <Route path={'/student/:name'} element={<StudentInfo />} />
        <Route path={'/teacher'} element={<TeacherInfo />} />
        <Route path={'/accident'} element={<AccidentInfo />} />
        <Route path={'/club'} element={<ClubInfo />} />
      </Routes>
    </Router>
  );
}

export default App;
