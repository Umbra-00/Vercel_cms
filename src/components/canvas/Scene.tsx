'use client'

import { Canvas } from '@react-three/fiber'
import { Preload } from '@react-three/drei'
import { canvasTunnel } from './Tunnel'

export default function Scene() {
    return (
        <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none">
            <Canvas
                orthographic
                camera={{ zoom: 1, position: [0, 0, 100] }}
                gl={{ alpha: true, antialias: true }}
                dpr={[1, 2]}
            >
                <canvasTunnel.Out />
                <Preload all />
            </Canvas>
        </div>
    )
}
