import React, { useRef, Suspense, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment, ContactShadows, Center } from "@react-three/drei";
import * as THREE from "three";

function FloatingModel() {
  const groupRef = useRef();

  // Load the original GLB model
  const { scene } = useGLTF("/models/model.glb");

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh && child.geometry) {
        child.castShadow = true;
        child.receiveShadow = true;

        const geometry = child.geometry;
        const posAttr = geometry.attributes.position;
        if (posAttr && !geometry.attributes.color) {
          const count = posAttr.count;
          const colors = new Float32Array(count * 3);

          for (let i = 0; i < count; i++) {
            const x = posAttr.getX(i);
            const y = posAttr.getY(i);
            const z = posAttr.getZ(i);

            let r = 0.32, g = 0.32, b = 0.32; // Default dark ash/gunmetal gray

            if (y < -0.18) {
              // Base chassis & legs -> Rich Dark Burnt Orange (#7A1F05)
              r = 0.48; g = 0.12; b = 0.02;
            } else if (y >= -0.18 && y < 0.05) {
              // Bed level
              if (Math.abs(x) > 0.80) {
                // Outer side supports & upright ears -> Rich Dark Burnt Orange
                r = 0.48; g = 0.12; b = 0.02;
              } else {
                // Bed surface -> Deep Obsidian Charcoal
                r = 0.28; g = 0.08; b = 0.08;
              }
            } else if (y >= 0.05 && y < 0.28) {
              // Gantry level
              if (Math.abs(z) < 0.35) {
                // Bellows & carriage backing -> Deep Obsidian Charcoal
                r = 0.06; g = 0.06; b = 0.06;
              } else {
                // Side upright ears -> Dark Ash
                r = 0.32; g = 0.32; b = 0.32;
              }
            } else {
              // Top carriage / Spindle (y >= 0.28)
              if (Math.abs(x) < 0.15) {
                if (Math.abs(x) < 0.035) {
                  // Spindle center stripe -> Rich Dark Burnt Orange
                  r = 0.48; g = 0.12; b = 0.02;
                } else {
                  // Spindle casing -> Dark Ash
                  r = 0.32; g = 0.32; b = 0.32;
                }
              } else {
                // Top motor caps & cabling -> Deep Obsidian Charcoal
                r = 0.10; g = 0.10; b = 0.10;
              }
            }

            colors[i * 3] = r;
            colors[i * 3 + 1] = g;
            colors[i * 3 + 2] = b;
          }

          geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        }

        if (child.material) {
          child.material.vertexColors = true;
          child.material.roughness = 0.35;
          child.material.metalness = 0.45;
          child.material.needsUpdate = true;
        }
      }
    });
  }, [scene]);

  // Gentle floating animation (bobbing up and down + subtle sway)
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 0.8) * 0.08;
      groupRef.current.rotation.y = Math.sin(t * 0.6) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} scale={1.9} />
    </group>
  );
}

export const HeroScene = () => {
  return (
    <div className="w-full h-[360px] sm:h-[440px] md:h-[500px] lg:h-[550px] flex items-center justify-center select-none relative overflow-visible">
      <Canvas
        camera={{ position: [0, 1.2, 6.2], fov: 40 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 2]} // High DPI for crystal clear rendering
        shadows
      >
        {/* Lights for depth and reflections */}
        <ambientLight intensity={0.65} />
        <directionalLight
          position={[10, 15, 10]}
          intensity={1.4}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <directionalLight position={[-10, 10, -5]} intensity={0.5} />

        {/* 3D Model with auto centering */}
        <Suspense fallback={null}>
          <Center>
            <FloatingModel />
          </Center>

          {/* Environment preset for realistic reflections */}
          <Environment preset="city" />

          {/* Ground soft shadows */}
          <ContactShadows
            position={[0, -1.3, 0]}
            opacity={0.45}
            scale={7.5}
            blur={2.2}
            far={3.0}
          />
        </Suspense>

        {/* Interactive camera controls */}
        <OrbitControls
          enableZoom={false}
          autoRotate={true}
          autoRotateSpeed={0.6}
          enableDamping={true}
          dampingFactor={0.05}
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.7}
        />
      </Canvas>
    </div>
  );
};

export default HeroScene;
