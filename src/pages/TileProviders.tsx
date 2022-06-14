import { Map, stamenTileProviderFactory } from '@jetblack/map'

export default function TileProvider() {
  const tileProvider = stamenTileProviderFactory('terrain')

  return (
    <div style={{ textAlign: 'center', marginTop: 50 }}>
      <div style={{ margin: '0 auto' }}>
        <Map tileProvider={tileProvider} width={1000} height={600} />
      </div>
    </div>
  )
}
