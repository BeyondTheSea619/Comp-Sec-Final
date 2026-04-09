import { useState } from "react";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // new: state to display login result message
  const [message, setMessage] = useState("");

  // new: handle form submission and call backend API
  const handleSubmit = async (e) => {
    // prevent page reload
    e.preventDefault();
    try {
      // new: send POST request ot express backend login API
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // sending email and password to server for authentication
        body: JSON.stringify({ email, password }),
      });
      // parse response JSON
      const data = await res.json();
      // check if login success
      if (res.ok) {
        // show success message and user role
        setMessage(`${data.message} (${data.role})`);

        // Saves the token
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("userRole", data.role);
      } else {
        if (data.errors && data.errors.length > 0) {
          setMessage(data.errors[0].msg);
        } else {
          setMessage(data.message || "Login failed");
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("Server error");
    }
  };

  return (
    <div>
      {/* updated action -> onSubmit */}
      <form onSubmit={handleSubmit}>
        <div className="formgroup">
          <label className="formlabel">Email:</label>
          <input
            className="forminput"
            type="text"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              console.log(email);
            }}
          />
        </div>
        <div className="formgroup">
          <label className="formlabel">Password:</label>
          <input
            className="forminput"
            type="password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        {/* add submit button */}
        <button type="submit">Login</button>
      </form>
      {/* display login result */}
      {message && <p>{message}</p>}
    </div>
  );
}

export default Login;
