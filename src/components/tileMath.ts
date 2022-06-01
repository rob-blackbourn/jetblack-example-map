import { Coordinate, Point, TileProvider, TileInfo, ScaleInfo } from './types'
import { boundValue } from './math'

// https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames

const lng2tile = (lon: number, zoom: number): number => ((lon + 180) / 360) * Math.pow(2, zoom)

const lat2tile = (lat: number, zoom: number): number =>
  ((1 - Math.log(Math.tan((lat * Math.PI) / 180) + 1 / Math.cos((lat * Math.PI) / 180)) / Math.PI) / 2) *
  Math.pow(2, zoom)

function tile2lng(x: number, zoom: number): number {
  return (x / Math.pow(2, zoom)) * 360 - 180
}

function tile2lat(y: number, zoom: number): number {
  const n = Math.PI - (2 * Math.PI * y) / Math.pow(2, zoom)
  return (180 / Math.PI) * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n)))
}

export const latLng2Tile = (latLng: Coordinate, zoom: number): Point => ({
  x: lng2tile(latLng.longitude, zoom),
  y: lat2tile(latLng.latitude, zoom),
})

export const tile2LatLng = (tile: Point, zoom: number): Coordinate => ({
  latitude: tile2lat(tile.y, zoom),
  longitude: tile2lng(tile.x, zoom),
})

export function calcScaleInfo(zoom: number, width: number, height: number): ScaleInfo {
  const roundedZoom = Math.round(zoom)
  const zoomDiff = zoom - roundedZoom

  const scale = Math.pow(2, zoomDiff)
  const scaleWidth = width / scale
  const scaleHeight = height / scale

  return {
    roundedZoom,
    scale,
    scaleWidth,
    scaleHeight,
  }
}

export function calcTileInfo(center: Coordinate, zoom: number, width: number, height: number): TileInfo {
  const { roundedZoom, scale, scaleWidth, scaleHeight } = calcScaleInfo(zoom, width, height)

  const tileCenter = latLng2Tile(center, roundedZoom)

  const halfWidth = scaleWidth / 2 / 256
  const halfHeight = scaleHeight / 2 / 256

  const tileMin = {
    x: Math.floor(tileCenter.x - halfWidth),
    y: Math.floor(tileCenter.y - halfHeight),
  }
  const tileMax = {
    x: Math.floor(tileCenter.x + halfWidth),
    y: Math.floor(tileCenter.y + halfHeight),
  }

  return {
    tileMin,
    tileMax,
    tileCenter,
    roundedZoom,
    scaleWidth,
    scaleHeight,
    scale,
  }
}

export function srcSet(dprs: number[], tileProvider: TileProvider, x: number, y: number, z: number): string {
  if (dprs.length === 0) {
    return ''
  }
  const attr = dprs.map(dpr => tileProvider(x, y, z, dpr) + (dpr === 1 ? '' : ` ${dpr}x`)).join(', ')
  return attr
}

export function pointToCoordinate(
  point: Point,
  center: Coordinate,
  zoom: number,
  width: number,
  height: number
): Coordinate {
  const pointDiff = {
    x: (point.x - width / 2) / 256,
    y: (point.y - height / 2) / 256,
  }

  const tile = latLng2Tile(center, zoom)
  const adjTile = { x: tile.x + pointDiff.x, y: tile.y + pointDiff.y }

  const coordinate = tile2LatLng(adjTile, zoom)
  const latitude = boundValue(-90, coordinate.latitude, 90)
  let longitude = coordinate.longitude
  while (longitude < -180) {
    longitude += 360
  }
  while (longitude > 180) {
    longitude -= 360
  }

  return {
    latitude,
    longitude,
  }
}

export function pointToCoordinates(
  point: Point,
  center: Coordinate,
  zoom: number,
  width: number,
  height: number
): Coordinate {
  const pointDiff = {
    x: (point.x - width / 2) / 256,
    y: (point.y - height / 2) / 256,
  }

  const tile = latLng2Tile(center, zoom)
  const adjTile = { x: tile.x + pointDiff.x, y: tile.y + pointDiff.y }

  const coordinate = tile2LatLng(adjTile, zoom)
  const latitude = boundValue(-90, coordinate.latitude, 90)
  let longitude = coordinate.longitude
  while (longitude < -180) {
    longitude += 360
  }
  while (longitude > 180) {
    longitude -= 360
  }

  return {
    latitude,
    longitude,
  }
}

export function coordinateToPoint(
  coord: Coordinate,
  center: Coordinate,
  zoom: number,
  width: number,
  height: number
): Point {
  const tileCenter = latLng2Tile(center, zoom)

  const tile = latLng2Tile(coord, zoom)

  return {
    x: (tile.x - tileCenter.x) * 256 + width / 2,
    y: (tile.y - tileCenter.y) * 256 + height / 2,
  }
}
