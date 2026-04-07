import { useState } from "react";
function Login() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (formData) => {};
  return (
    <form action={handleSubmit}>
      <div className="formgroup">
        <label className="formlabel">Name:</label>
        <input
          className="forminput"
          type="text"
          name="name"
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
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
    </form>
  );
}

export default Login;
