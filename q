warning: in the working copy of 'Frontend/src/App.jsx', LF will be replaced by CRLF the next time Git touches it
[1mdiff --git a/Frontend/src/App.jsx b/Frontend/src/App.jsx[m
[1mindex ce6c72a..2775d88 100644[m
[1m--- a/Frontend/src/App.jsx[m
[1m+++ b/Frontend/src/App.jsx[m
[36m@@ -1,4 +1,3 @@[m
[31m-import React from "react";[m
 import { BrowserRouter, Routes, Route } from "react-router-dom";[m
 import Home from "./pages/Home.jsx";[m
 import About from "./pages/About.jsx";[m
[36m@@ -16,7 +15,7 @@[m [mfunction App() {[m
         <Route path="/" element={<Home />} />[m
         <Route path="/about" element={<About />} />[m
         <Route path="/signin" element={<SignIn />} />[m
[31m-        <Route path="/signup" element={<SignUp />} />{" "}[m
[32m+[m[32m        <Route path="/signup" element={<SignUp />} />[m
         <Route element={<PrivateRoute />}>[m
           <Route path="/profile" element={<Profile />} />[m
         </Route>[m
[1mdiff --git a/Frontend/src/pages/SignIn.jsx b/Frontend/src/pages/SignIn.jsx[m
[1mindex 5efe6b1..05a2f04 100644[m
[1m--- a/Frontend/src/pages/SignIn.jsx[m
[1m+++ b/Frontend/src/pages/SignIn.jsx[m
[36m@@ -1,4 +1,4 @@[m
[31m-import React, { useState } from "react";[m
[32m+[m[32mimport { useState } from "react";[m
 import { Link, useNavigate } from "react-router-dom";[m
 import { useDispatch, useSelector } from "react-redux";[m
 import {[m
