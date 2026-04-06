import { useState } from "react";
import "../Styles/login.css";
function Login() {
  const [count, setCount] = useState(0);

  return (
    <form>
      <div className="formgroup">
        <label className="formlabel">Name:</label>
        <input className="forminput" type="text" name="name" />
      </div>
      <div className="formgroup">
        <label className="formlabel">Email:</label>
        <input className="forminput" type="text" name="email" />
      </div>
      <div className="formgroup">
        <label className="formlabel">Password:</label>
        <input className="forminput" type="password" name="password" />
      </div>
    </form>
  );
}

export default Login;
