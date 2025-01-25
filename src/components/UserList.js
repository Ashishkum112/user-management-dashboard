import React from "react";

function UserList({ users, onEdit, onDelete }) {
  return (
    <div className="user-list">
      {users.map((user) => (
        <div key={user.id} className="user-card">
          <p>
            <strong>ID:</strong> {user.id}
          </p>
          <p>
            <strong>Name:</strong> {user.firstName} {user.lastName}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Department:</strong> {user.department}
          </p>
          <div className="button-group">
            <button className="edit-button" onClick={() => onEdit(user)}>
              Edit
            </button>
            <button className="delete-button" onClick={() => onDelete(user.id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserList;
