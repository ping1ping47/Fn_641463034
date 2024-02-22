import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function EditSubject() {
    const { id } = useParams(); // ดึงค่า id จาก URL
    const [subject, setSubject] = useState({
        Name: '',
        Description: ''
    });

    useEffect(() => {
        fetchSubject();
    }, []);

    const fetchSubject = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/subjects/${id}`);
            setSubject(response.data);
        } catch (error) {
            console.error('Failed to fetch subject', error);
        }
    };

    const handleChange = (e) => {
        setSubject({ ...subject, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/subjects/:id/${id}`, subject);
            // หลังจากแก้ไขเสร็จสิ้น สามารถ redirect ไปยังหน้า Subject หรือหน้าอื่นๆ ตามที่ต้องการได้
        } catch (error) {
            console.error('Failed to update subject', error);
        }
    };

    return (
        <div>
            <h2>Edit Subject</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="Name" value={subject.Name} onChange={handleChange} />
                <textarea name="Description" value={subject.Description} onChange={handleChange}></textarea>
                <button type="submit">Update Subject</button>
            </form>
        </div>
    );
}

export default EditSubject;
