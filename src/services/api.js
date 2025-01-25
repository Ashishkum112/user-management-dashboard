import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/users";

export const fetchUsers = async () => {
  try {
    const response = await axios.get(API_URL);
    const users = response.data.map((user) => 
      {
      // Safely split the name into first and last names
      const [firstName, ...lastName] = (user.name || "").split(" ");
      
      return {
        id: user.id,
        firstName: firstName || "", // Default to empty if no first name
        lastName: lastName.join(" ") || "", // Join remaining parts for last name
        email: user.email,
        department: user.department || "", // Handle undefined department
      };
    });
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to fetch users. Please try again.");
  }
};

export const addUser = async (user) => {
  try {
    const response = await axios.post(API_URL, {
      name: `${user.firstName} ${user.lastName}`, // Combine firstName and lastName
      email: user.email,
      department: user.department,
    });

    const [firstName, ...lastName] = (response.data.name || "").split(" ");
    return {
      id: response.data.id,
      firstName: firstName || "",
      lastName: lastName.join(" ") || "",
      email: response.data.email,
      department: response.data.department || "",
    };
  } catch (error) {
    console.error("Error adding user:", error);
    throw new Error(
      "Failed to add user. Please check the input and try again."
    );
  }
};

export const updateUser = async (user) => {
  try {
    const response = await axios.put(`${API_URL}/${user.id}`, {
      name: `${user.firstName} ${user.lastName}`, // Combine firstName and lastName
      email: user.email,
      department: user.department,
    });

    const [firstName, ...lastName] = (response.data.name || "").split(" ");
    return {
      id: response.data.id,
      firstName: firstName || "",
      lastName: lastName.join(" ") || "",
      email: response.data.email,
      department: response.data.department || "",
    };
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Failed to update user. Please try again.");
  }
};

export const deleteUser = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Error("Failed to delete user. Please try again.");
  }
};
