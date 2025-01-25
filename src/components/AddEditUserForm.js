import React, { useState, useEffect } from "react";

function AddEditUserForm({ user, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    id: null,
    firstName: "",
    lastName: "",
    email: "",
    department: "",
  });

  const [error, setError] = useState(""); // State to track errors

  // Sync formData with the `user` prop when it changes
  useEffect(() => {
    setFormData({
      id: user?.id || null,
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      department: user?.department || "",
    });
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = () => {
    // Regular expression for validating proper email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
    // Check if all fields are filled
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.department) {
      alert("All fields are required.");
      return;
    }
  
    // Check if the email format is valid
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }
  
    // Call the `onSave` function if all validations pass
    onSave(formData);
  };
  

  return (
    <div className="form-container">
      <h2>{user?.id ? "Edit User" : "Add New User"}</h2>
      {error && <div className="error">{error}</div>}
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={formData.firstName}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={handleInputChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="department"
        placeholder="Department"
        value={formData.department}
        onChange={handleInputChange}
      />
      <button className="save-button" onClick={handleSave}>
        {user?.id ? "Save Changes" : "Add User"}
      </button>
      <button className="cancel-button" onClick={onCancel}>
        Cancel
      </button>
    </div>
  );
}

export default AddEditUserForm;
