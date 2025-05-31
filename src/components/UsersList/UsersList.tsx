import React from "react";
import { User } from '../../types';
import styles from './UsersList.module.css'; // Import CSS module
import { useNavigate } from "react-router-dom";

interface Props {
    users: User[];
}

const UsersList: React.FC<Props> = ({ users }) => {
    const navigate = useNavigate();

    const renderList = (): React.ReactNode[] => {
        return users.map((user) => (
            <li key={user.email} className={styles.listItem}>
                <div className={styles.userInfo}>
                    <h2 className={styles.user}>{user.name}</h2>
                    <h3 className={styles.age}>Age: {user.age}</h3>
                    <p className={styles.email}>{user.email}</p>
                    {/* Edit Button */}
                    <button 
                        className={styles.editButton} 
                        onClick={() => navigate(`/edit/${(user as any)._id}`)}
                    >
                        Edit
                    </button>
                </div>
            </li>
        ));
    };

    return (
        <ul className={styles.list}>
            {renderList()}
        </ul>
    );
};

export default UsersList;
