"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, PerspectiveCamera, OrbitControls, ContactShadows } from "@react-three/drei";
import { Suspense } from "react";
import SiliconChip from "./SiliconChip";

export default function Scene() {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none md:pointer-events-auto">
            <Canvas shadows>
                <PerspectiveCamera makeDefault position={[0, 2, 6]} fov={45} />

                <ambientLight intensity={0.5} />
                <spotLight position={[5, 10, 5]} angle={0.15} penumbra={1} intensity={2} attach="light" />
                <pointLight position={[-5, -5, -5]} color="#F59E0B" intensity={8} />
                <pointLight position={[5, -5, 5]} color="#8B5CF6" intensity={8} />

                <Suspense fallback={null}>
                    <SiliconChip />
                    <Environment preset="city" />
                    <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={10} blur={2} far={4} />
                </Suspense>

                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate
                    autoRotateSpeed={0.5}
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={Math.PI / 3}
                />
            </Canvas>
        </div>
    );
}
