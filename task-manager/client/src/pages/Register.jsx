import { useState } from "react";
import API from "../api";

export default function Register() {
  const [data, setData] = useState({ name: "", email: "", password: "" });

  const register = async () => {
    await API.post("/auth/register", data);
    window.location.href = "/";
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Register</h2>

      <input placeholder="Name"
        onChange={(e) => setData({ ...data, name: e.target.value })} /><br /><br />

      <input placeholder="Email"
        onChange={(e) => setData({ ...data, email: e.target.value })} /><br /><br />

      <input type="password" placeholder="Password"
        onChange={(e) => setData({ ...data, password: e.target.value })} /><br /><br />

      <button onClick={register}>Register</button>
    </div>
  );
}
