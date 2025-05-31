import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserById, updateUser } from '../../services/usersService';
import { User } from '../../types';

const EditUser = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [userData, setUserData] = useState<User | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await getUserById(id!);
                setUserData(user);
            } catch (error) {
                console.error('Error fetching user', error);
            }
        };
        fetchUser();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData((prev) =>
            prev ? { ...prev, [name]: name === 'age' || name === 'phone' ? Number(value) : value } : null
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (userData) {
            try {
                await updateUser(id!, userData);
                navigate('/');
            } catch (error) {
                alert("Error updating user.");
            }
        }
    };

    if (!userData) return <p>Loading...</p>;

    return (
        <form onSubmit={handleSubmit}>
            <h2>Edit User</h2>
            <input name="name" value={userData.name} onChange={handleChange} />
            <input name="age" type="number" value={userData.age} onChange={handleChange} />
            <input name="email" value={userData.email || ''} onChange={handleChange} />
            <input name="password" value={userData.password || ''} onChange={handleChange} />
            <input name="phone" type="number" value={userData.phone || 0} onChange={handleChange} />
            <button type="submit">Update</button>
        </form>
    );
};

export default EditUser;
