import { Link, Route, Routes } from 'react-router-dom'
import './App.css'

function HomePage() {
  return (
    <section style={{ padding: '2rem' }}>
      <h1>Home</h1>
      <p>Welcome to the UG Campus Service client.</p>
    </section>
  )
}

function AboutPage() {
  return (
    <section style={{ padding: '2rem' }}>
      <h1>About</h1>
      <p>This app now uses React Router for page navigation.</p>
    </section>
  )
}

function NotFoundPage() {
  return (
    <section style={{ padding: '2rem' }}>
      <h1>404</h1>
      <p>The page you are looking for does not exist.</p>
    </section>
  )
}

function App() {
  return (
    <div style={{ fontFamily: 'sans-serif', minHeight: '100vh', padding: '1rem' }}>
      <nav style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  )
}

export default App
