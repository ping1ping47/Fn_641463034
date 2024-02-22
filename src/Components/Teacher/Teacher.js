import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Teacher() {
    const navigate = useNavigate();
    const [teachers, setTeachers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchTeachers();
    }, []);

    const fetchTeachers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/teachers');
            setTeachers(response.data);
        } catch (error) {
            console.error('Failed to fetch teachers', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/teachers?id=${id}`);
            fetchTeachers(); // โหลดข้อมูลใหม่หลังจากลบ
        } catch (error) {
            console.error('Failed to delete teacher', error);
        }
    };

    const handleSearch = () => {
        // Call API to search for teachers based on searchTerm
        fetch(`http://localhost:5000/teachers?search=${searchTerm}`)
            .then(response => response.json())
            .then(data => setTeachers(data))
            .catch(error => console.error("Error searching teachers:", error));
    }

    const handleAddTeacher = () => {
        // ทำการ redirect ไปยังหน้าเพิ่มครู
        // ในที่นี้คือ '/addTeacher'
        // ตัวอย่างเท่านั้น โปรดแก้ไขตามที่เหมาะสม
        navigate("/AddTeacher");
    }

    return (
        <div>
            <h1>Teacher List</h1>
            <div>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {teachers.map((teacher) => (
                        <tr key={teacher.ID}>
                            <td>{teacher.ID}</td>
                            <td>{teacher.Name}</td>
                            <td>{teacher.Age}</td>
                            <td>{teacher.Email}</td>
                            <td>
                                <Link to={`/EditTeacher/${teacher.ID}`}>Edit</Link>
                                <button onClick={() => handleDelete(teacher.ID)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={handleAddTeacher}>Add Teacher</button>
        </div>
    );
}

export default Teacher;
