import React from 'react';
import axios from 'axios';

function DeleteStudent({ studentId }) {
    const handleDelete = async () => {
        try {
            await axios.delete(`http://your-api-url.com/students.php?id=${studentId}`);
            // สั่งให้โหลดข้อมูลใหม่หลังจากลบ
            window.location.reload();
        } catch (error) {
            console.error('Failed to delete student', error);
        }
    };

    return (
        <div>
            <button onClick={handleDelete}>Delete Student</button>
        </div>
    );
}

export default DeleteStudent;
