import { BrowserRouter, Link, Routes, Route } from 'react-router-dom'

import AllFeatures from './pages/AllFeatures'
import Minimal from './pages/Minimal'
import TileProvider from './pages/TileProviders'
import CustomMarker from './pages/CustomMarker'
import ScaledMarker from './pages/ScaledMarker'
import Geolocation from './pages/Geolocation'

export default function App() {
  return (
    <div>
      <BrowserRouter basename="jetblack-example-map">
        <div>
          <h1>Home</h1>
          <nav>
            <Link to="/">All Features</Link>
            &nbsp;|&nbsp;
            <Link to="/minimal">Minimal Features</Link>
            &nbsp;|&nbsp;
            <Link to="/tile-provider">Tile Provider</Link>
            &nbsp;|&nbsp;
            <Link to="/custom-marker">Custom Marker</Link>
            &nbsp;|&nbsp;
            <Link to="/scaled-marker">Scaled Marker</Link>
            &nbsp;|&nbsp;
            <Link to="/geolocation">Geolocation</Link>
          </nav>
        </div>
        <Routes>
          <Route path="/" element={<AllFeatures />}></Route>
          <Route path="/minimal" element={<Minimal />} />
          <Route path="/tile-provider" element={<TileProvider />} />
          <Route path="/custom-marker" element={<CustomMarker />} />
          <Route path="/scaled-marker" element={<ScaledMarker />} />
          <Route path="/geolocation" element={<Geolocation />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
