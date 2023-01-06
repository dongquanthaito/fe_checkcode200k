import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './assets/style/reset.css'
import Login from './components/login/login';
import Main from './components/main/Index';
import Register from './components/register/register';
import RemoveUser from './components/register/remove';

import Page404 from './helper/404Page';
import { BrowserRouter, Routes, Route } from "react-router-dom";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <BrowserRouter>
      <Routes>
          <Route index element={<Main />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='remove-user' element={<RemoveUser />} />

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
