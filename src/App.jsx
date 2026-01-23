import { Routes, Route } from "react-router-dom"

import Events from "./routes/Events"
import News from "./routes/News"
import Home from "./routes/Home"
import Links from "./routes/Links"
import Settings from "./routes/Settings"

import Nav from "./components/Nav"
import Footer from "./components/Footer"

import './styles.css'

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/events" element={<Events />} />
          <Route path="/news" element={<News />} />
          <Route path="/" element={<Home />} />
          <Route path="/links" element={<Links />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
      <Footer />
      <Nav />
    </>
  )
}

export default App
