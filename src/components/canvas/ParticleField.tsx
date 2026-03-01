'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function ParticleField() {
    const count = 2000
    const mesh = useRef<THREE.InstancedMesh>(null)

    const dummy = new THREE.Object3D()
    const particles = new Float32Array(count * 3)

    // Initialize particles in a long vertical tube following the general path
    for (let i = 0; i < count; i++) {
        const i3 = i * 3
        // Random spread around the Y axis
        particles[i3] = (Math.random() - 0.5) * 30     // x
        particles[i3 + 1] = -Math.random() * 80 + 10   // y (spread vertically)
        particles[i3 + 2] = (Math.random() - 0.5) * 30 // z
    }

    useFrame((state) => {
        if (!mesh.current) return

        // Animate particles slightly
        const time = state.clock.getElapsedTime()

        for (let i = 0; i < count; i++) {
            const i3 = i * 3

            // Simple floating motion
            dummy.position.set(
                particles[i3],
                particles[i3 + 1] + Math.sin(time + particles[i3]) * 0.5,
                particles[i3 + 2]
            )

            // Scale based on time to twinkle
            const s = Math.sin(time * 2 + i) * 0.5 + 0.5
            dummy.scale.setScalar(s * 0.1 + 0.05)

            dummy.updateMatrix()
            mesh.current.setMatrixAt(i, dummy.matrix)
        }
        mesh.current.instanceMatrix.needsUpdate = true
    })

    return (
        <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
            <sphereGeometry args={[1, 8, 8]} />
            <meshBasicMaterial color="#4ade80" transparent opacity={0.6} />
        </instancedMesh>
    )
}
