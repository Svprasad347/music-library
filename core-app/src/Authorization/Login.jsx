import React, { useState } from "react";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("user");

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = {
      username,
      role,
      expiry: Date.now() + 60 * 60 * 1000,
    };
    localStorage.setItem("token", JSON.stringify(token));
    onLogin(token);
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        height: "100vh",
        background: "linear-gradient(135deg, #6e8efb, #a777e3)",
        backgroundSize: "cover",
      }}
    >
      <div
        className="card shadow p-4 w-100"
        style={{
          maxWidth: 420,
          borderRadius: "1rem",
          backgroundColor: "#fff",
        }}
      >
        <div className="card-body">
          <div className="text-center mb-4">
            <h3 className="fw-bold text-primary">
               
             BeatBoxx
            </h3>
            <p className="text-muted mb-0">Login to continue</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label  htmlFor="username" className="form-label fw-semibold">Username</label>
              <input
              id="username"
                type="text"
                className="form-control rounded-pill"
                placeholder="Your name"
                value={username}
                required
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label  htmlFor="role" className="form-label fw-semibold">Role</label>
              <select
              id="role"
                className="form-select rounded-pill"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 rounded-pill fw-bold"
              style={{ letterSpacing: 1 }}
            >
            Login
            </button>
          </form>
        </div>

         
      </div>
    </div>
  );
};

export default Login;
