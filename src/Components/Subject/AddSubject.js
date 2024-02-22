import React, { useState } from 'react';
import axios from 'axios';

function AddStudent() {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        age: '',
        grade: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/students', formData);
            // สั่งให้โหลดข้อมูลใหม่หลังจากเพิ่ม
            window.location.reload();
        } catch (error) {
            console.error('Failed to add student', error);
        }
    };

    return (
        <div>
            <h2>Add Student</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="first_name" placeholder="First Name" onChange={handleChange} />
                <input type="text" name="last_name" placeholder="Last Name" onChange={handleChange} />
                <input type="text" name="age" placeholder="Age" onChange={handleChange} />
                <input type="text" name="grade" placeholder="Grade" onChange={handleChange} />
                <button type="submit">Add Student</button>
            </form>
        </div>
    );
}

export default AddStudent;
