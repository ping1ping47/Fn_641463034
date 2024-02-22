import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function EditTeacher() {
    const { id } = useParams(); // ดึงค่า id จาก URL
    const [teacher, setTeacher] = useState({
        Name: '',
        Age: '',
        Email: ''
    });

    useEffect(() => {
        fetchTeacher();
    }, []);

    const fetchTeacher = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/teachers/${id}`);
            setTeacher(response.data);
        } catch (error) {
            console.error('Failed to fetch teacher', error);
        }
    };

    const handleChange = (e) => {
        setTeacher({ ...teacher, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/teachers/${id}`, teacher);
            // หลังจากแก้ไขเสร็จสิ้น สามารถ redirect ไปยังหน้า Teacher หรือหน้าอื่นๆ ตามที่ต้องการได้
        } catch (error) {
            console.error('Failed to update teacher', error);
        }
    };

    return (
        <div>
            <h2>Edit Teacher</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="Name" value={teacher.Name} onChange={handleChange} />
                <input type="text" name="Age" value={teacher.Age} onChange={handleChange} />
                <input type="text" name="Email" value={teacher.Email} onChange={handleChange} />
                <button type="submit">Update Teacher</button>
            </form>
        </div>
    );
}

export default EditTeacher;
