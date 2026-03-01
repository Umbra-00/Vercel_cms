'use client'

import { ScrollControls, Scroll } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import CameraPath from './CameraPath'

interface ScrollSceneProps {
    children: React.ReactNode
}

export default function ScrollScene({ children }: ScrollSceneProps) {
    return (
        <div className="fixed inset-0 w-full h-full">
            <Canvas
                shadows
                camera={{ position: [0, 0, 10], fov: 30 }}
                gl={{ antialias: true, alpha: true }}
            >
                <Suspense fallback={null}>
                    <ScrollControls pages={6} damping={0.2}>
                        {/* 3D Content Layer */}
                        <Scroll>
                            <CameraPath />
                            {/* 3D background elements for e-commerce will go here */}
                            <ambientLight intensity={0.5} />
                            <pointLight position={[10, 10, 10]} />
                        </Scroll>

                        {/* HTML Content Layer */}
                        <Scroll html style={{ width: '100%', height: '100%' }}>
                            {children}
                        </Scroll>
                    </ScrollControls>
                </Suspense>
            </Canvas>
        </div>
    )
}
