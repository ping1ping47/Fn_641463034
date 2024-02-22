import React from "react";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import "./App.css";
import Login from "./Components/Login";
import Register from "./Components/Register";
import User from "./Components/Home";
import { getUser } from "./user";
import UserAdd from "./Components/User/AddUser";

import Student from "./Components/Student/Student";
import AddStudent from "./Components/Student/AddStudent";
import EditStudent from './Components/Student/EditStudent';

import Subject from "./Components/Subject/Subject";
import AddSubject from "./Components/Subject/AddSubject";
import EditSubject from "./Components/Subject/EditSubject";

import EditUser from "./Components/User/EditUser";

import AddTeacher from "./Components/Teacher/AddTeacher";
import Teacher from "./Components/Teacher/Teacher";
import EditTeacher from "./Components/Teacher/EditTeacher";

function App() {
    return (
        <BrowserRouter>
            <div>
                <header>
                    <nav>
                        <ul>
                            <li><Link to="/User">Home</Link></li>
                            {/* Add other menu items as needed */}
                        </ul>
                    </nav>
                </header>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/User" element={
                        <PrivateRoute>
                            <User />
                        </PrivateRoute>
                    } />
                   
                    <Route path="/AddUser" element={<UserAdd />} />
                    <Route path="/EditUser" element={<EditUser />} />
                    <Route path="/Student" element={<Student />} />

                    <Route path="/Subject" element={<Subject />} />
                    <Route path="/AddSubject" element={<AddSubject />} />
                    <Route path="/EditSubject" element={<EditSubject />} />

                    <Route path="/Teacher" element={<Teacher />} />
                    <Route path="/AddTeacher" element={<AddTeacher />} />
                    <Route path="/EditTeacher" element={<EditTeacher />} />

                    <Route path="/AddStudent" element={<AddStudent />} />
                    <Route path="/EditStudent" element={<EditStudent />} />

                </Routes>
            </div>
        </BrowserRouter>
    );
}

function PrivateRoute({ children }) {
    const user = getUser();
    return user ? children : <Navigate to="/" />;
}

export default App;
