import React, { useEffect, useState } from 'react';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [beError, setBeError] = useState(null); // Use state to track errors

    useEffect(() => {
        fetch('http://localhost:5000/api/users')
            .then(
                (response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                }
            )
            .then((data) => setUsers(data))
            .catch(
                (error) => {
                    setBeError(error.message); // Save the error message to state
                    console.error('Error fetching users:', error);
                }
            );
    }, []);

    // Conditional rendering based on state
    if (beError) {
        return (
            <div>
                <h1>Error</h1>
                <p>Unable to fetch users: { beError }</p>
            </div>
        );
    }

    if (users.length === 0) {
        return (
            <div>
                <h1>Users</h1>
                <p>Loading or no users found...</p>
            </div>
        );
    }

    return (
        <div>
            <h1>Users</h1>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.name} ({user.email})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
