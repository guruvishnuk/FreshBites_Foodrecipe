import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PresentationControls, Environment } from '@react-three/drei';

function AbstractFoodModel() {
  const groupRef = useRef<any>();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t / 4) / 4;
      groupRef.current.rotation.z = Math.sin(t / 4) / 4;
      groupRef.current.position.y = Math.sin(t / 1.5) / 10;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        {/* Core sphere - Apple/Tomato abstraction */}
        <mesh position={[0, 0, 0]} castShadow>
          <sphereGeometry args={[1.2, 64, 64]} />
          <meshStandardMaterial color="#10b981" roughness={0.2} metalness={0.1} />
        </mesh>
        
        {/* Orbiting element 1 - Leaf/Garnish abstraction */}
        <mesh position={[1.5, 1.2, 0.5]} rotation={[0.5, 0.5, 0]} castShadow>
          <torusGeometry args={[0.4, 0.1, 16, 32]} />
          <meshStandardMaterial color="#fbbf24" roughness={0.3} metalness={0.8} />
        </mesh>
        
        {/* Orbiting element 2 */}
        <mesh position={[-1.2, -1, -0.5]} rotation={[1, 0, 0.5]} castShadow>
          <icosahedronGeometry args={[0.5, 0]} />
          <meshStandardMaterial color="#f87171" roughness={0.1} metalness={0.5} />
        </mesh>
      </Float>
    </group>
  );
}

export const Hero3D = () => {
  return (
    <div className="w-full h-[500px] lg:h-[700px] relative cursor-grab active:cursor-grabbing">
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 45 }}>
        <color attach="background" args={['transparent']} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <PresentationControls 
          global 
          config={{ mass: 2, tension: 500 }} 
          snap={{ mass: 4, tension: 1500 }} 
          rotation={[0, 0.3, 0]} 
          polar={[-Math.PI / 3, Math.PI / 3]} 
          azimuth={[-Math.PI / 1.4, Math.PI / 2]}
        >
          <AbstractFoodModel />
        </PresentationControls>
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};
