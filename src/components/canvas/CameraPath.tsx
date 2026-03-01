'use client'

import { useScroll } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useMemo } from 'react'

export default function CameraPath() {
    const scroll = useScroll()
    const { camera } = useThree()

    // Define the cinematic path
    const curve = useMemo(() => {
        return new THREE.CatmullRomCurve3([
            new THREE.Vector3(0, 0, 10),    // Start (Hero)
            new THREE.Vector3(0, -10, 5),   // Products
            new THREE.Vector3(5, -20, 0),   // Partners
            new THREE.Vector3(-5, -30, 5),  // Quality
            new THREE.Vector3(-5, -40, 0),  // Market Intel
            new THREE.Vector3(0, -50, 10),  // Sustainability
            new THREE.Vector3(0, -60, 20),  // End
        ], false, 'catmullrom', 0.5)
    }, [])

    // Visual guide for the path (optional, for debug)
    // const linePoints = useMemo(() => curve.getPoints(100), [curve])

    useFrame(() => {
        // Get scroll offset (0 to 1)
        const offset = scroll.offset

        // Get point on curve
        const point = curve.getPoint(offset)
        const lookAtPoint = curve.getPoint(Math.min(offset + 0.1, 1))

        // Move camera
        camera.position.copy(point)
        camera.lookAt(lookAtPoint)
    })

    return null
}
