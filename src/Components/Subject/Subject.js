import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'; // Import Link

function Subject() {
    const navigate = useNavigate();
    const [subjects, setSubjects] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchSubjects();
    }, []);

    const fetchSubjects = async () => {
        try {
            const response = await axios.get('http://localhost:5000/subjects');
            setSubjects(response.data);
        } catch (error) {
            console.error('Failed to fetch subjects', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/subjects/${id}`);
            fetchSubjects(); // โหลดข้อมูลใหม่หลังจากลบ
        } catch (error) {
            console.error('Failed to delete subject', error);
        }
    };

    const handleSearch = () => {
        // Call API to search for subjects based on searchTerm
        fetch(`http://localhost:5000/subjects?search=${searchTerm}`)
            .then(response => response.json())
            .then(data => setSubjects(data))
            .catch(error => console.error("Error searching subjects:", error));
    }

    const handleAddSubject = () => {
        // ทำการ redirect ไปยังหน้าเพิ่มวิชา
        // ในที่นี้คือ '/addSubject'
        // ตัวอย่างเท่านั้น โปรดแก้ไขตามที่เหมาะสม
        navigate("/AddSubject");
    }

    return (
        <div>
            <h1>Subject List</h1>
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
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {subjects.map((subject) => (
                        <tr key={subject.ID}>
                            <td>{subject.ID}</td>
                            <td>{subject.Name}</td>
                            <td>{subject.Description}</td>
                            <td>
                                <Link to={`/EditSubject/${subject.ID}`}>Edit</Link>
                                <button onClick={() => handleDelete(subject.ID)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={handleAddSubject}>Add Subject</button>
        </div>
    );
}

export default Subject;
