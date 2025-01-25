import React from "react";



function UserCard({ user, onEdit, onDelete }) {
  return (
    <div className="form-container">
  <h2>Edit User Details</h2>
  <input type="text" placeholder="First Name" value={firstName} onChange={handleFirstNameChange} />
  <input type="text" placeholder="Last Name" value={lastName} onChange={handleLastNameChange} />
  <input type="email" placeholder="Email" value={email} onChange={handleEmailChange} />
  <div>
    <button className="save-button" onClick={handleSave}>
      Save
    </button>
    <button className="cancel-button" onClick={handleCancel}>
      Cancel
    </button>
  </div>
</div>

  );
}

export default UserCard;
