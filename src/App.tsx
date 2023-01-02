import axios from 'axios';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import * as R from './allFiles';

axios.defaults.baseURL = 'http://10.150.150.56';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path={'/'} element={<R.Home />} />
        <Route path={'/student'} element={<R.Student />} />
        <Route path={'/teacher'} element={<R.Teacher />} />
        <Route path={'/accident'} element={<R.Accident />} />
        <Route path={'/club'} element={<R.Club />} />
        <Route path={'/docs/:id'} element={<R.Docs />} />
        <Route path={'/search/:result'} element={<R.Search />} />
        <Route path={'/signup/:query'} element={<R.Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
