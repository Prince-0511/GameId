// src/components/3dmodel.tsx

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';

// Model component without the useFrame hook
function Model() {
  const { scene } = useGLTF('/controller.glb');
  return <primitive object={scene} scale={2.5} position={[0, -1, 0]} />;
}

export default function Controller3D() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 2, 7], fov: 50 }}
        gl={{ alpha: true }} 
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <pointLight position={[-10, -10, -5]} intensity={1} color="#8a2be2" />
        
        <Suspense fallback={null}>
          <Model />
        </Suspense>

        {/* OrbitControls allows you to control the model with the mouse */}
        <OrbitControls enableZoom={false} />

      </Canvas>
    </div>
  );
}