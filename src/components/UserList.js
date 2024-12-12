import React, { useEffect, useState } from 'react';

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/users')
            .then(
                (response) => {
                    let $res = response.json();
                    console.log("4444 ", $res)
                    return $res
                })
            .then((data) => setUsers(data))
            .catch((error) => console.error('Error fetching users:', error));
    }, []);

    return (
        <div>
            <h1>Users</h1>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>{user.name} ({user.email})</li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
