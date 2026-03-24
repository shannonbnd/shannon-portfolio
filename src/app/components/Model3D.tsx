import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

interface Model3DProps {
  modelPath: string;
  className?: string;
}

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={0.5} position={[0, 0, 0]} />;
}

export default function Model3D({ modelPath, className }: Model3DProps) {
  return (
    <div className={className} style={{ width: "100%", height: "100%" }}>
      <Canvas camera={{ position: [0, 0, 12], fov: 35 }}>
        <ambientLight intensity={2} />
        <directionalLight position={[5, 5, 5]} intensity={3} />
        <Suspense fallback={null}>
          <Model url={modelPath} />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  );
}