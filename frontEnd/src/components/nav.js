import { Link } from "react-router-dom";
import "../styles/App.css";

function Nav() {
  const navStyle = {
    textDecoration: "none",
    color: "inherit",
    marginLeft: "24px",
  };

  return (
    <nav>
      <ul>
        <Link className="home" to="/" style={navStyle}>
          <li>Home</li>
        </Link>
      </ul>
    </nav>
  );
}

export default Nav;
