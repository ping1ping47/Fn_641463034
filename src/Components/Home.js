import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // เพิ่มการนำเข้า Link
import Profile from "./Profile";
import { getUser } from "../user";
import "./EventPage.css"; // นำเข้าไฟล์ CSS

export default function EventPage() {
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getEvents();
        getUsers();
    }, []);

    const currentUser = getUser();

    const getEvents = () => {
        const storedEvents = JSON.parse(localStorage.getItem("events"));
        setEvents(storedEvents?.filter(event => event.userId === currentUser?.id) || []);
    }

    const getUsers = () => {
        // Fetch users from the API
        fetch('http://localhost:5000/users')
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error("Error fetching users:", error));
    }

    const deleteEvent = (id) => {
        const updatedEvents = events.filter(event => event.id !== id);
        localStorage.setItem("events", JSON.stringify(updatedEvents));
        setEvents(updatedEvents);
    }

    const handleSearch = () => {
        // Call API to search for users based on searchTerm
        fetch(`http://localhost:5000/users?search=${searchTerm}`)
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error("Error searching users:", error));
    }

    const handleAddUser = () => {
        navigate("/AddUser");
    }

    return (
        <div className="event-page-container">
            <Profile />
            <div className="eventPage">
                <div className="menu-container">
                    <h3 className="menu-header">เพิ่มเมนู</h3>
                    <ul className="menu-list">
                        <li>
                            <button className="menu-button" onClick={() => navigate("/user")}>User</button>
                        </li>
                        <li>
                            <button className="menu-button" onClick={() => navigate("/student")}>Student</button>
                        </li>
                        <li>
                            <button className="menu-button" onClick={() => navigate("/subject")}>Subject</button>
                        </li>
                        <li>
                            <button className="menu-button" onClick={() => navigate("/teacher")}>Teacher</button>
                        </li>
                        {/* Add other menu items as needed */}
                    </ul>
                </div>
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search User..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className="search-button" onClick={handleSearch}>Search</button>
                </div>
                <button className="add-user-button" onClick={handleAddUser}>Add User</button>
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Has</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user.ID}>
                                <td>{user.ID}</td>
                                <td>{user.Name}</td>
                                <td>{user.Email}</td>
                                <td>{user.Password}</td>
                                <td>{user.Has}</td>
                                <td>
                                    <Link to={`/EditUser/${user.ID}`} className="edit-link">Edit</Link>
                                    <button onClick={() => deleteEvent(user.ID)} className="delete-button">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {users.length === 0 && <p className="no-results">No results</p>}
            </div>
        </div>
    );
}
