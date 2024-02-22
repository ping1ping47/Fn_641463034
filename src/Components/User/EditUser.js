import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditUser() {
    const { id } = useParams(); // ใช้ id แทน email ในการดึงข้อมูลผู้ใช้
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({
        Name: "",
        Email: "",
        Password: "",
        Has: ""
    });

    useEffect(() => {
        // Fetch user data based on id from the API
        fetch(`http://localhost:5000/users/${id}`) // ใช้ id ใน URL
            .then(response => response.json())
            .then(data => {
                setUser(data);
                setFormData({
                    Name: data.Name,
                    Email: data.Email,
                    Password: data.Password,
                    Has: data.Has
                });
            })
            .catch(error => console.error("Error fetching user data:", error));
    }, [id]); // ใช้ id ในการเรียกใช้ useEffect

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Update user data in the backend
        fetch(`http://localhost:5000/users/${id}`, { // ใช้ id ใน URL
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(() => {
            // Redirect to the user list page after successful update
            navigate("/user");
        })
        .catch(error => console.error("Error updating user data:", error));
    }

    return (
        <div>
            <h2>Edit User</h2>
            {user ? (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="Name" value={formData.Name} onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="Email" value={formData.Email} onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="Password" value={formData.Password} onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="has">Has:</label>
                        <input type="text" id="has" name="Has" value={formData.Has} onChange={handleChange} />
                    </div>
                    <button type="submit">Update</button>
                </form>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
