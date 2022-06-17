import { useContext, useRef } from 'react'

import { Coordinate, Map, MapContext, Marker, OverlayLayer, Point, useDrag, useZoom, CLASS_NAMES } from '@jetblack/map'

const classNames = { customMarker: [CLASS_NAMES.primary, 'custom-marker'].join(' ') }

export interface ScaledMarkerProps {
  point: Point
  color?: string
  radius?: number
}

function ScaledMarker({ radius = 5, color = 'red' }: ScaledMarkerProps) {
  // Get zoom info from the context.
  const {
    zoom,
    tileProvider: { minZoom, maxZoom },
  } = useContext(MapContext)

  // Calculate the scale and apply it to the radius of the circle.
  const scale = (zoom - minZoom) / (maxZoom - minZoom)
  const scaledRadius = radius + 20 * radius * scale

  const strokeWidth = 2
  const size = scaledRadius * 2 + strokeWidth * 2

  return (
    <svg
      className={classNames.customMarker}
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      style={{
        pointerEvents: 'auto',
        transform: `translate(${-size / 2}px, ${-size / 2}px)`,
      }}
    >
      <circle cx={size / 2} cy={size / 2} r={scaledRadius} stroke={color} strokeWidth={2} fill="none" />
    </svg>
  )
}

const tileSize = { width: 256, height: 256 }

export default function CustomMarker() {
  const LONDON: Coordinate = {
    latitude: 51.54692324195448,
    longitude: -0.10641109282470851,
  }

  const PARIS: Coordinate = {
    latitude: 48.86802593798236,
    longitude: 2.2687449681233223,
  }

  const ref = useRef<HTMLDivElement>(null)

  const [zoom, setZoom] = useZoom({ ref, defaultZoom: 4 })
  const [center, setCenter] = useDrag({
    ref,
    defaultCenter: LONDON,
    zoom,
    tileSize,
  })

  return (
    <div style={{ textAlign: 'center', marginTop: 50 }}>
      <div style={{ margin: '0 auto' }}>
        <Map ref={ref} center={center} zoom={zoom} width={1000} height={600}>
          <OverlayLayer>
            <Marker coordinate={LONDON} render={point => <ScaledMarker point={point} />} />
            <Marker coordinate={PARIS} render={point => <ScaledMarker point={point} />} />
          </OverlayLayer>
        </Map>
      </div>
    </div>
  )
}
