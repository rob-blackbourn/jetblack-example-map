import React, { useEffect, useRef, useState } from 'react'

import { Bounds, Coordinate } from './types'

import { GREENWICH_OBSERVATORY, DEFAULT_ZOOM } from './constants'
import MapContext from './MapContext'

export interface MapProps {
  center?: Coordinate
  zoom?: number
  width?: number | string
  height?: number | string
  children?: React.ReactNode
}

const Map = React.forwardRef<HTMLDivElement, MapProps>(
  (
    { center = GREENWICH_OBSERVATORY, zoom = DEFAULT_ZOOM, width = '100%', height = '100%', children },
    forwardedRef
  ) => {
    // Use a local ref if a forwarded ref is not available.
    const localRef = useRef<HTMLDivElement>(null)
    const ref = forwardedRef ? (forwardedRef as React.MutableRefObject<HTMLDivElement>) : localRef

    // The screen coordinate system is bounded by the containing div rectangle.
    const [bounds, setBounds] = useState<Bounds>({ top: 0, left: 0, width: 0, height: 0 })

    useEffect(() => {
      if (ref.current) {
        // Update the bounds when the browser has found them.
        setBounds(ref.current.getBoundingClientRect())
      }
    }, [ref])

    // Wrap everything in a context to allow child components access to the map state.
    return (
      <MapContext.Provider
        value={{
          center,
          zoom,
          bounds,
        }}
      >
        <div
          className="jetblack-map"
          style={{
            width,
            height,
            position: 'relative',
            display: 'inline-block',
            overflow: 'hidden',
            background: '#dddddd',
          }}
          ref={ref}
        >
          {children}
        </div>
      </MapContext.Provider>
    )
  }
)

export default Map
