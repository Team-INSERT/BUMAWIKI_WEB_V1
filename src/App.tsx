import axios, { AxiosError } from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { getCookie } from 'util/getCookie';
import * as R from './allFiles';

axios.defaults.baseURL = 'http://10.150.150.56';

const userInfo = {
  class: 0,
  code: 0,
  enroled: "",
  grade: 0,
  name: "",
  nickname: "",
  studentNo: "",
  profile: "",
  isLogin: false,
  isManager: false,
};

export const UserContext = createContext(userInfo);

const App = () => {
  const [user, setUser] = useState(userInfo);

  useEffect(() => {
    axios.get('/')
      .then((res) => {
        setUser(res.data)
      })
      .catch((err) => {
        if (err instanceof AxiosError && err?.response?.status === 403) {
          axios.put('/auth/refresh/access', {
            headers: {
              refresh_token: getCookie('refresh_token')
            }
          }).then((res) => {
            document.cookie = `accessToken=${res.data.accessToken};`
            document.cookie = `refreshToken=${res.data.refreshToken};`
            document.cookie = `expiredAt=${res.data.expiredAt};`
          })
        } else {
          console.log(err)
        }
      })
  }, []);

  return (
    <Router>
      <UserContext.Provider value={user}>
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
      </UserContext.Provider>
    </Router>
  );
}

export default App;
