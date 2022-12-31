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
        <Route path={'/docs/:id'} element={<Docs />} />
      </Routes>
    </Router>
  );
}

export default App;
