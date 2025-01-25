import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchUsers, addUser, updateUser, deleteUser } from "./services/api";
import AddEditUserForm from "./components/AddEditUserForm";
import UserList from "./components/UserList";
import "./App.css";


function App() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch {
        setError("Error fetching data from API.");
      }
    };
    loadUsers();
  }, []);

  const handleAddUser = async (newUser) => {
    try {
      const addedUser = await addUser(newUser);
      setUsers([...users, addedUser]);
      toast.success("User Added Successfully!");
    } catch {
      setError("Error adding user.");
    }
  };

  const handleEditUser = async (updatedUser) => {
    try {
      if (!updatedUser.id) {
        setError("User ID is missing for update.");
        return;
      }
      const editedUser = await updateUser(updatedUser);
      setUsers(
        users.map((user) => (user.id === editedUser.id ? editedUser : user))
      );
      toast.success("User Updated Successfully!");
    } catch (err) {
      setError(err.message || "Error updating user.");
    }
  };
  

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      setUsers(users.filter((user) => user.id !== id));
      toast.success("User Deleted Successfully!");
    } catch {
      setError("Error deleting user.");
    }
  };

  return (
    <div className="container">
      <h1 className="title">User Management Dashboard</h1>
      {error && <div className="error">{error}</div>}

      {editingUser !== null ? (
        <AddEditUserForm
          user={editingUser}
          onSave={editingUser.id ? handleEditUser : handleAddUser}
          onCancel={() => setEditingUser(null)}
        />
      ) : (
        <button
          className="add-user-button"
          onClick={() =>
            setEditingUser({ firstName: "", lastName: "", email: "", department: "" })
          }
        >
          Add New User
        </button>
      )}

      <UserList
        users={users}
        onEdit={setEditingUser}
        onDelete={handleDeleteUser}
      />

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
