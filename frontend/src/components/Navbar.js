import { Link } from "react-router-dom";

function Navbar() {
  const navStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    backgroundColor: "#282c34",
    color: "white"
  };

  const linkStyle = {
    margin: "0 15px",
    textDecoration: "none",
    color: "white",
    fontWeight: "bold"
  };

  return (
    <nav style={navStyle}>
      <h2>SafetySnap 🚀</h2>
      <div>
        <Link to="/" style={linkStyle}>Login</Link>
        <Link to="/upload" style={linkStyle}>Upload</Link>
        <Link to="/history" style={linkStyle}>History</Link>
        <Link to="/analytics" style={linkStyle}>Analytics</Link>
      </div>
    </nav>
  );
}

export default Navbar;
