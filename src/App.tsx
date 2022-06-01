import Map from './components/Map'
import Marker from './components/Marker'
import SVGPin from './components/SVGPin'
import { GREENWICH_OBSERVATORY, EMPIRE_STATE_BUILDING } from './components/constants'
import { useRef } from 'react'
import TileLayer from './components/TileLayer'
import OverlayLayer from './components/OverlayLayer'
import useZoomWheel from './components/useZoomWheel'
import useMouseEvents from './components/useMouseEvents'
import { Coordinate, Point } from './components/types'
import useClick from './components/useClick'

export default function App() {
  const ref = useRef<HTMLDivElement>(null)

  const [zoom, zoomRef, setZoom] = useZoomWheel({ ref, defaultZoom: 6 })
  const [center, centerRef, setCenter] = useMouseEvents({
    ref,
    defaultCenter: GREENWICH_OBSERVATORY,
    zoomRef,
  })

  const handleClick = (coordinate: Coordinate, point: Point) => {
    console.log('click', { coordinate, point })
  }

  const handleDoubleClick = (coordinate: Coordinate, point: Point) => {
    console.log('doubleClick', { coordinate, point })
    setCenter(coordinate)
    setZoom(zoom + 1)
  }

  useClick({ ref, centerRef, zoomRef, onClick: handleClick, onDoubleClick: handleDoubleClick })

  return (
    <div style={{ textAlign: 'center', marginTop: 50 }}>
      <div style={{ margin: '0 auto' }}>
        <Map center={center} zoom={zoom} width="1000px" height="600px" ref={ref}>
          <TileLayer />
          <OverlayLayer>
            <Marker coordinate={GREENWICH_OBSERVATORY} render={point => <SVGPin point={point} />} />
            <Marker coordinate={EMPIRE_STATE_BUILDING} render={point => <SVGPin point={point} />} />
          </OverlayLayer>
        </Map>
      </div>
    </div>
  )
}
