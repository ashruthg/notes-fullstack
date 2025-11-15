import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Navbar from "./components/Navbar"
import Login from "./components/Login"
import Register from "./components/Register"
import NotesList from "./components/NotesList"
import ProtectedRoute from "./components/ProtectedRoute"

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/notes" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/notes"
          element={
            <ProtectedRoute>
              <NotesList />
            </ProtectedRoute>
          }
        />
        {/* fallback */}
        <Route path="*" element={<div className="container mt-5"><h3>Page not found</h3></div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App