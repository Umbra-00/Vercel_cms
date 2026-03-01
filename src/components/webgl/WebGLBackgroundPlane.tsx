'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { liquidTransitionShader } from '@/shaders/liquidTransition';

interface WebGLBackgroundPlaneProps {
    texture1: string;
    texture2: string;
    progress: number;
    isVideo1?: boolean;
    isVideo2?: boolean;
}

export default function WebGLBackgroundPlane({
    texture1,
    texture2,
    progress,
    isVideo1 = false,
    isVideo2 = false
}: WebGLBackgroundPlaneProps) {
    const meshRef = useRef<THREE.Mesh>(null);
    const { size } = useThree();
    const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
    const [mouseInfluence, setMouseInfluence] = useState(0);

    // Load static textures (images)
    const loadedTextures = useTexture(
        !isVideo1 && !isVideo2 ? [texture1, texture2] :
            !isVideo1 ? [texture1] :
                !isVideo2 ? [texture2] : []
    );

    // Video textures
    const [videoTexture1, setVideoTexture1] = useState<THREE.VideoTexture | null>(null);
    const [videoTexture2, setVideoTexture2] = useState<THREE.VideoTexture | null>(null);

    useEffect(() => {
        if (isVideo1 && typeof window !== 'undefined') {
            const video = document.createElement('video');
            video.src = texture1;
            video.loop = true;
            video.muted = true;
            video.playsInline = true;
            video.play().catch(() => { });

            const vidTex = new THREE.VideoTexture(video);
            vidTex.minFilter = THREE.LinearFilter;
            vidTex.magFilter = THREE.LinearFilter;
            setVideoTexture1(vidTex);
        }
    }, [texture1, isVideo1]);

    useEffect(() => {
        if (isVideo2 && typeof window !== 'undefined') {
            const video = document.createElement('video');
            video.src = texture2;
            video.loop = true;
            video.muted = true;
            video.playsInline = true;
            video.play().catch(() => { });

            const vidTex = new THREE.VideoTexture(video);
            vidTex.minFilter = THREE.LinearFilter;
            vidTex.magFilter = THREE.LinearFilter;
            setVideoTexture2(vidTex);
        }
    }, [texture2, isVideo2]);

    // Get the correct textures
    const tex1 = isVideo1 ? videoTexture1 : (Array.isArray(loadedTextures) ? loadedTextures[0] : loadedTextures);
    const tex2 = isVideo2 ? videoTexture2 : (Array.isArray(loadedTextures) ? loadedTextures[1] : loadedTextures);

    // Track mouse movement
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({
                x: e.clientX / window.innerWidth,
                y: 1.0 - (e.clientY / window.innerHeight)
            });
            setMouseInfluence(1.0);
        };

        const handleMouseLeave = () => {
            setMouseInfluence(0);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    // Create shader material
    const shaderMaterial = useMemo(() => {
        if (!tex1 || !tex2) return null;

        return new THREE.ShaderMaterial({
            vertexShader: liquidTransitionShader.vertexShader,
            fragmentShader: liquidTransitionShader.fragmentShader,
            uniforms: {
                texture1: { value: tex1 },
                texture2: { value: tex2 },
                progress: { value: progress },
                mouse: { value: new THREE.Vector2(0.5, 0.5) },
                mouseInfluence: { value: 0 },
                time: { value: 0 }
            }
        });
    }, [tex1, tex2]);

    // Update uniforms
    useFrame((state) => {
        if (!meshRef.current || !shaderMaterial) return;

        shaderMaterial.uniforms.progress.value = progress;
        shaderMaterial.uniforms.time.value = state.clock.elapsedTime;

        // Smooth mouse position
        const currentMouse = shaderMaterial.uniforms.mouse.value;
        currentMouse.x += (mousePos.x - currentMouse.x) * 0.1;
        currentMouse.y += (mousePos.y - currentMouse.y) * 0.1;

        // Smooth mouse influence
        const currentInfluence = shaderMaterial.uniforms.mouseInfluence.value;
        shaderMaterial.uniforms.mouseInfluence.value += (mouseInfluence - currentInfluence) * 0.1;
    });

    if (!shaderMaterial || !tex1 || !tex2) return null;

    // Calculate proper plane size to cover viewport
    const aspect = size.width / size.height;
    const planeHeight = 2; // Fill vertical FOV
    const planeWidth = planeHeight * aspect;

    return (
        <mesh ref={meshRef} material={shaderMaterial}>
            <planeGeometry args={[planeWidth, planeHeight]} />
        </mesh>
    );
}
