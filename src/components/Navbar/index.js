import { Link, useNavigate } from "react-router-dom"
import Cookies from "js-cookie"
import "./index.css"

export default function Navbar() {
  const token = Cookies.get("jwt_token")
  const navigate = useNavigate()

  const handleLogout = () => {
    Cookies.remove("jwt_token")
    navigate("/login")
  }

  return (
    <nav className="app-nav navbar navbar-dark bg-dark px-3">
      <div className="container-fluid">
        <Link to="/notes" className="navbar-brand">Notes App</Link>
        <div>
          {token ? (
            <button className="btn btn-danger btn-sm" onClick={handleLogout}>Logout</button>
          ) : (
            <>
              <Link to="/login" className="btn btn-light btn-sm me-2">Login</Link>
              <Link to="/register" className="btn btn-primary btn-sm">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
