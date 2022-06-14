import { useRef } from 'react'

import { Coordinate, Map, Marker, OverlayLayer, Point, useDrag, useZoom, CLASS_NAMES } from '@jetblack/map'

const classNames = { customMarker: [CLASS_NAMES.primary, 'custom-marker'].join(' ') }

export interface CustomMarkerProps {
  point: Point
  radius?: number
  strokeWidth?: number
  color?: string
}

function CircleMarker({ radius = 10, strokeWidth = 2, color = 'red' }: CustomMarkerProps) {
  const size = radius * 2 + strokeWidth * 2

  return (
    <svg
      className={classNames.customMarker}
      width={size}
      height={size}
      // viewBox={`0 0 ${radius * 2} ${radius * 2}`}
      // fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        pointerEvents: 'auto',
        transform: `translate(${-size / 2}px, ${-size / 2}px)`,
      }}
    >
      <circle cx={size / 2} cy={size / 2} r={radius} stroke={color} strokeWidth={2} fill="none" />
    </svg>
  )
}

export default function CustomMarker() {
  const GREENWICH_OBSERVATORY: Coordinate = {
    latitude: 51.47684676353231,
    longitude: -0.0005261695762532147,
  }

  const BUCKINGHAM_PALACE: Coordinate = {
    latitude: 51.501200111998415,
    longitude: -0.14182556179982908,
  }

  const ref = useRef<HTMLDivElement>(null)

  const [zoom, setZoom] = useZoom({ ref, defaultZoom: 6 })
  const [center, setCenter] = useDrag({
    ref,
    defaultCenter: GREENWICH_OBSERVATORY,
    zoom,
    tileWidth: 256,
    tileHeight: 256,
  })

  return (
    <div style={{ textAlign: 'center', marginTop: 50 }}>
      <div style={{ margin: '0 auto' }}>
        <Map ref={ref} center={center} zoom={zoom} width={1000} height={600}>
          <OverlayLayer>
            <Marker coordinate={GREENWICH_OBSERVATORY} render={point => <CircleMarker point={point} />} />
            <Marker coordinate={BUCKINGHAM_PALACE} render={point => <CircleMarker point={point} radius={15} />} />
          </OverlayLayer>
        </Map>
      </div>
    </div>
  )
}
