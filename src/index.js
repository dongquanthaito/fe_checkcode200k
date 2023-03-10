import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './assets/style/reset.css'
import Login from './components/login/login';
import Main from './components/main/Index';
import Register from './components/user/register';
import UpdateUser from './components/user/update';

import Page404 from './helper/404Page';
import { BrowserRouter, Routes, Route } from "react-router-dom";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <BrowserRouter>
      <Routes>
          <Route index element={<Login />} />
          <Route path='admin' element={<Main />} />
          <Route path='register' element={<Register />} />
          <Route path='update-user' element={<UpdateUser />} />
          <Route path='*' element={<Page404 />} />


          {/* <Route path="upload-code" element={<Page404 />} /> */}
      </Routes>
    </BrowserRouter>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
