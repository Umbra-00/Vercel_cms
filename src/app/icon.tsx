import { ImageResponse } from 'next/og'
 
export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'
 
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#044161',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Outer circle */}
        <div
          style={{
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            border: '2px solid #FECC00',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#fff',
          }}
        >
          {/* Wheat symbol simplified */}
          <div
            style={{
              fontSize: '18px',
              color: '#FECC00',
              fontWeight: 'bold',
              display: 'flex',
            }}
          >
            🌾
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
