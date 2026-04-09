import { useState, useEffect } from "react";

function Admin() {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    // get saved token and role
    const token = localStorage.getItem("authToken");
    const role = localStorage.getItem("userRole");

    if (role !== "admin" || !token) {
      setMessage("Access Denied: Admins only.");
      return;
    }

    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/admin/users", {
          method: "GET",
          headers: {
            // Send token to backend
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setUsers(data);
          setMessage("");
        } else {
          setMessage(data.error || "Failed to load data");
        }
      } catch (error) {
        setMessage("Server connection error");
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>

      {/* Show Access Denied, Loading, or Error messages here */}
      {message && <p style={{ color: "red", fontWeight: "bold" }}>{message}</p>}

      {users.length > 0 && (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.email} (Role: {user.role})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Admin;
