import { useState } from "react";
import API from "../api";

export default function Login() {
  const [data, setData] = useState({ email: "", password: "" });

  const login = async () => {
    try {
      const res = await API.post("/auth/login", data);
      localStorage.setItem("token", res.data.token);
      window.location.href = "/dashboard";
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Login</h2>

      <input placeholder="Email"
        onChange={(e) => setData({ ...data, email: e.target.value })} /><br /><br />

      <input type="password" placeholder="Password"
        onChange={(e) => setData({ ...data, password: e.target.value })} /><br /><br />

      <button onClick={login}>Login</button>

      <p onClick={() => (window.location.href = "/register")} style={{ cursor: "pointer" }}>
        Create account
      </p>
    </div>
  );
}
