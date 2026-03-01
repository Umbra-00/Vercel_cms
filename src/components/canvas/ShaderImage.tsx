'use client'

import React, { useRef, Suspense } from 'react'
import { useFrame, useThree, extend } from '@react-three/fiber'
import { useTexture, shaderMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { canvasTunnel } from './Tunnel'

class ImageErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
    constructor(props: { children: React.ReactNode }) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError() {
        return { hasError: true }
    }

    componentDidCatch(error: any) {
        console.error("ShaderImage Texture Error:", error)
    }

    render() {
        if (this.state.hasError) {
            return null
        }
        return this.props.children
    }
}

// Custom Shader Material
const LiquidShaderMaterial = shaderMaterial(
    {
        uTexture: new THREE.Texture(),
        uVelocity: 0,
        uTime: 0,
        uResolution: new THREE.Vector2(1, 1),
        uImageResolution: new THREE.Vector2(1, 1),
    },
    // Vertex Shader - ENHANCED LIQUID DISTORTION
    `
    varying vec2 vUv;
    uniform float uVelocity;
    uniform float uTime;

    void main() {
      vUv = uv;
      vec3 pos = position;
      
      // DRAMATIC liquid wave distortion effect
      // Create multiple wave frequencies for complex liquid motion
      float wave1 = sin(vUv.x * 3.14159 * 2.0 + uTime * 0.5) * uVelocity * 0.8;
      float wave2 = sin(vUv.y * 3.14159 * 1.5 - uTime * 0.3) * uVelocity * 0.5;
      float wave3 = sin((vUv.x + vUv.y) * 3.14159 * 3.0) * abs(uVelocity) * 0.3;
      
      // Combine waves for complex liquid motion
      float totalDistortion = wave1 + wave2 + wave3;
      
      // Apply to both X and Y for more dynamic effect
      pos.x += totalDistortion * 0.5;
      pos.y += totalDistortion;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
    // Fragment Shader - ENHANCED RGB SHIFT & DISTORTION
    `
    uniform sampler2D uTexture;
    uniform vec2 uResolution;
    uniform vec2 uImageResolution;
    uniform float uVelocity;
    uniform float uTime;
    varying vec2 vUv;

    // Enhanced RGB Shift with distortion
    vec4 rgbShift(sampler2D t, vec2 uv, float amount) {
      // Add wave distortion to UV coordinates
      float wave = sin(uv.y * 10.0 + uTime * 2.0) * amount * 0.5;
      
      float r = texture2D(t, uv + vec2(amount + wave, 0.0)).r;
      float g = texture2D(t, uv).g;
      float b = texture2D(t, uv - vec2(amount + wave, 0.0)).b;
      return vec4(r, g, b, 1.0);
    }

    void main() {
      // Cover fit logic
      vec2 ratio = vec2(
        min((uResolution.x / uResolution.y) / (uImageResolution.x / uImageResolution.y), 1.0),
        min((uResolution.y / uResolution.x) / (uImageResolution.y / uImageResolution.x), 1.0)
      );
      
      vec2 uv = vec2(
        vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
        vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
      );

      // DRAMATIC chromatic aberration based on velocity
      // Increased from 0.005 to 0.02 (4x stronger!)
      float shiftStrength = abs(uVelocity) * 0.02;
      
      // Add liquid distortion to UV coordinates
      float liquidWave = sin(uv.y * 8.0 + uTime * 3.0) * abs(uVelocity) * 0.01;
      uv.x += liquidWave;
      
      vec4 color = rgbShift(uTexture, uv, shiftStrength);

      gl_FragColor = color;
    }
  `
)

extend({ LiquidShaderMaterial })

interface ShaderImageProps {
    src: string
    alt?: string
    className?: string
}

export default function ShaderImage({ src, alt, className }: ShaderImageProps) {
    const imgRef = useRef<HTMLImageElement>(null)

    return (
        <>
            {/* The Ghost */}
            <img
                ref={imgRef}
                src={src}
                alt={alt}
                className={`opacity-0 ${className}`}
            />

            {/* The Skin */}
            <canvasTunnel.In>
                <ImageErrorBoundary>
                    <Suspense fallback={null}>
                        <WebGLImage
                            imgRef={imgRef}
                            src={src}
                        />
                    </Suspense>
                </ImageErrorBoundary>
            </canvasTunnel.In>
        </>
    )
}

function WebGLImage({ imgRef, src }: { imgRef: React.RefObject<HTMLImageElement | null>, src: string }) {
    const meshRef = useRef<THREE.Mesh>(null)
    const materialRef = useRef<any>(null)
    const texture = useTexture(src)
    const { viewport, size } = useThree()

    useFrame((state) => {
        if (!imgRef.current || !meshRef.current || !materialRef.current) return

        const img = imgRef.current
        const rect = img.getBoundingClientRect()

        // Sync Position & Scale
        // Calculate width and height relative to the viewport
        const width = (rect.width / size.width) * viewport.width
        const height = (rect.height / size.height) * viewport.height

        // Calculate position relative to the center of the screen
        // (0,0) in Three.js is the center of the screen
        // X: (rect.left + width/2) / windowWidth * viewportWidth - viewportWidth/2
        // Y: -((rect.top + height/2) / windowHeight * viewportHeight - viewportHeight/2)

        const x = ((rect.left + rect.width / 2) / size.width) * viewport.width - viewport.width / 2
        const y = -(((rect.top + rect.height / 2) / size.height) * viewport.height - viewport.height / 2)

        meshRef.current.position.set(x, y, 0)
        meshRef.current.scale.set(width, height, 1)

        // Update Uniforms
        if ((window as any).lenis) {
            const velocity = (window as any).lenis.velocity || 0
            materialRef.current.uVelocity = velocity
            // Debug: Log velocity to verify it's working
            if (Math.abs(velocity) > 0.1) {
                console.log('Scroll velocity:', velocity)
            }
        }

        // Update time for animated wave effects
        materialRef.current.uTime = state.clock.elapsedTime

        materialRef.current.uResolution.set(rect.width, rect.height)
        const texImage = texture.image as HTMLImageElement
        materialRef.current.uImageResolution.set(texImage.width, texImage.height)
    })

    return (
        <mesh ref={meshRef}>
            <planeGeometry args={[1, 1, 32, 32]} />
            {/* @ts-ignore */}
            <liquidShaderMaterial
                ref={materialRef}
                uTexture={texture}
                transparent
            />
        </mesh>
    )
}
