import { useState } from "react";
function Login() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(`${data.message} (${data.role})`);
        console.log("Token:", data.token);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("Server error");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="formgroup">
          <label className="formlabel">Name:</label>
          <input
            className="forminput"
            type="text"
            name="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              console.log(name);
            }}
          />
        </div>
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
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default Login;
