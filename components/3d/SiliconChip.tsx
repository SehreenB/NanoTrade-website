"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Text } from "@react-three/drei";

export default function SiliconChip() {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            // Gentle floating animation
            groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
            // Slight tilt responding to time
            groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
            groupRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.5) * 0.05;
        }
    });

    return (
        <group ref={groupRef}>
            {/* Outer Thick Glass Casing */}
            <mesh receiveShadow castShadow position={[0, 0.25, 0]}>
                <boxGeometry args={[3.4, 0.5, 3.4]} />
                <meshPhysicalMaterial
                    color="#ffffff"
                    transmission={0.95} // High transmission for glass look
                    opacity={1}
                    transparent={true}
                    metalness={0.1}
                    roughness={0.02} // Very smooth, high gloss
                    ior={1.5}        // Index of refraction for glass (acrylic/glass)
                    thickness={0.8}  // Refraction thickness
                    clearcoat={1}
                    clearcoatRoughness={0.05}
                />
            </mesh>

            {/* Inner Dark Ceramic Package Base */}
            <mesh receiveShadow castShadow position={[0, 0.05, 0]}>
                <boxGeometry args={[3.0, 0.1, 3.0]} />
                <meshPhysicalMaterial
                    color="#111111"
                    metalness={0.8}
                    roughness={0.4}
                />
            </mesh>

            {/* Central Main Die (Dark polished silicon) */}
            <mesh receiveShadow castShadow position={[0, 0.12, 0]}>
                <boxGeometry args={[1.8, 0.06, 1.8]} />
                <meshPhysicalMaterial
                    color="#0a0a0a"
                    metalness={0.9}
                    roughness={0.1}
                    clearcoat={1}
                />
            </mesh>

            {/* NanoTrade Logo Text */}
            <Text
                position={[0, 0.16, 0]}
                rotation={[-Math.PI / 2, 0, 0]}
                fontSize={0.25}
                color="#ffffff"
                font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2"
                anchorX="center"
                anchorY="middle"
                outlineWidth={0.005}
                outlineColor="#ffffff"
            >
                NANOTRADE
            </Text>

            {/* "ASIC M1" style subtext */}
            <Text
                position={[0, 0.16, 0.4]}
                rotation={[-Math.PI / 2, 0, 0]}
                fontSize={0.08}
                color="#888888"
                font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2"
                anchorX="center"
                anchorY="middle"
            >
                INSTITUTIONAL SERIES
            </Text>

            {/* Secondary Glowing Coprocessor Die (Left) - Anomaly Engine */}
            <mesh position={[-1.1, 0.12, 0]}>
                <boxGeometry args={[0.3, 0.05, 1.0]} />
                <meshStandardMaterial
                    color="#0071e3" // Apple Blue glow
                    emissive="#0071e3"
                    emissiveIntensity={4}
                    toneMapped={false}
                />
            </mesh>

            {/* Secondary Glowing Coprocessor Die (Right) - Matching Engine */}
            <mesh position={[1.1, 0.12, 0]}>
                <boxGeometry args={[0.3, 0.05, 1.0]} />
                <meshStandardMaterial
                    color="#00f0ff" // Cyan glow
                    emissive="#00f0ff"
                    emissiveIntensity={4}
                    toneMapped={false}
                />
            </mesh>
        </group>
    );
}
