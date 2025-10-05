// src/pages/Login.js
import { useState } from "react";
import { API_BASE_URL } from "../api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("✅ Login successful!");
        console.log("User data:", data);
      } else {
        setMessage("❌ " + (data.message || "Login failed"));
      }
    } catch (err) {
      setMessage("⚠️ Error: " + err.message);
    }
  };

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h2>Login to SafetySnap</h2>
      <form onSubmit={handleLogin} style={{ display: "inline-block", marginTop: "20px" }}>
        <div>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{ padding: "10px", margin: "10px", width: "250px" }}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ padding: "10px", margin: "10px", width: "250px" }}
          />
        </div>
        <button type="submit" style={{ padding: "10px 20px", marginTop: "20px" }}>
          Login
        </button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default Login;
