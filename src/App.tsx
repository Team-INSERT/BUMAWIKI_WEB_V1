import axios, { AxiosError } from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { dateUTCParser } from 'util/dateUTCParser';
import { getCookie } from 'util/getCookie';
import * as R from './allFiles';

axios.defaults.baseURL = 'http://bumawiki.kro.kr/api';

const userInfo = {
  id: 0,
  email: '',
  nickName: '',
  authority: 'USER',
  contributeDocs: []
};

export const UserContext = createContext(userInfo);

const App = () => {
  const [user, setUser] = useState(userInfo);

  useEffect(() => {
    axios.get('/user', {
      headers: {
        'Authorization': getCookie('authorization')
      }
    })
      .then((res) => {
        setUser({
          ...res.data,
          contributeDocs: res.data.contributeDocs.reverse()
        })
      })
      .catch((err) => {
        if (err instanceof AxiosError && err?.response?.status === 403) {
          axios.put('/auth/refresh/access', {
            refresh_token: getCookie('refresh_token')
          }).then((res) => {
            document.cookie = `authorization=${res.data.accessToken};`
            document.cookie = `refresh_token=${res.data.refreshToken};expires=${dateUTCParser(res.data.expiredAt)};path=/;`
            window.location.reload()
          }).catch((err) => { console.log(err) })
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
          <Route path={'/oauth'} element={<R.Signup />} />
          <Route path={'/create'} element={<R.Create />} />
          <Route path={'/update/:id'} element={<R.Update />} />
          <Route path={'/version/:id'} element={<R.Version />} />
          <Route path={'/version/:id/detail/:versionId'} element={<R.VersionDetail />} />
          <Route path={'/mypage'} element={<R.MyPage />} />
          <Route path={'*'} element={<R.NotFound />} />
        </Routes>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
