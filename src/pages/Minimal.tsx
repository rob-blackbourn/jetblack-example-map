import { Map } from '@jetblack/map'

export default function Minimal() {
  return (
    <div style={{ textAlign: 'center', marginTop: 50 }}>
      <div style={{ margin: '0 auto' }}>
        <Map width={1000} height={600} />
      </div>
    </div>
  )
}
