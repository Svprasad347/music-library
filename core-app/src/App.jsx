import React, { Suspense, useEffect, useState } from "react";
import Login from "./Authorization/Login";
import { getToken, logout } from "./Authorization/auth";

const MusicApp = React.lazy(() => import("music_library/MusicApp"));

function App() {
  const [user, setUser] = useState(getToken());

  useEffect(() => {
    setUser(getToken());
  }, []);

  if (!user) return <Login onLogin={setUser} />;

  return (
    <div
      className="container mt-4"
      style={{
        background: "linear-gradient(135deg, #6e8efb, #a777e3)",
        backgroundSize: "cover",
      }}
    >
      <div className="d-flex justify-content-between align-items-center mb-3 ">
        <h4 className="mb-0 text-muted mt-3">
          Welcome, <span className="fw-semibold text-dark">{user.username}</span>
          &nbsp;|&nbsp; Role: <span className="badge bg-primary text-uppercase">{user.role}</span>
        </h4>{" "}
        <button
          className="btn btn-sm btn-danger mt-3"
          onClick={() => {
            logout();
            setUser(null);
          }}
        >
          Logout
        </button>
      </div>
      <Suspense fallback={<div>Loading Music Library...</div>}>
        <MusicApp role={user.role} />
      </Suspense>
    </div>
  );
}

export default App;
