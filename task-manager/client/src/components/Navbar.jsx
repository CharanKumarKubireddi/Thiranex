export default function Navbar() {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "10px", background: "#eee" }}>
      <h3>Task Manager</h3>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
