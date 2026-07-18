import React, { useRef, Suspense, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment, ContactShadows, Center } from "@react-three/drei";

function FloatingModel() {
  const groupRef = useRef();

  // Load the GLB model
  const { scene } = useGLTF("/models/model.glb");

  // Traverse the scene to optimize materials for a sleek, visible, metal-finished design
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material) {
          // Enhance the material PBR properties
          child.material.roughness = 0.35;
          child.material.metalness = 0.55;
          
          // Inject custom shader to color different portions of the single unified mesh
          child.material.onBeforeCompile = (shader) => {
            // Vertex Shader: Pass local position coordinate to fragment shader
            shader.vertexShader = shader.vertexShader.replace(
              '#include <common>',
              `#include <common>
               varying vec3 vLocalPosition;`
            );
            shader.vertexShader = shader.vertexShader.replace(
              '#include <begin_vertex>',
              `#include <begin_vertex>
               vLocalPosition = position;`
            );
            
            // Fragment Shader: Calculate and assign colors dynamically based on geometry coordinates
            shader.fragmentShader = shader.fragmentShader.replace(
              '#include <common>',
              `#include <common>
               varying vec3 vLocalPosition;`
            );
            shader.fragmentShader = shader.fragmentShader.replace(
              'vec4 diffuseColor = vec4( diffuse, opacity );',
              `
              vec3 finalColor = vec3(0.88, 0.88, 0.88); // Default white/light gray
              
              float x = vLocalPosition.x;
              float y = vLocalPosition.y;
              float z = vLocalPosition.z;
              
              if (y < -0.18) {
                // Bottom chassis & base frame -> Shusa Vibrant Orange
                finalColor = vec3(0.92, 0.22, 0.05); // #EB380D
              } else if (y >= -0.18 && y < 0.05) {
                // Bed and side rails
                if (abs(x) > 0.82) {
                  // Outer side rails/supports -> Orange-red
                  finalColor = vec3(0.92, 0.22, 0.05); 
                } else {
                  // Bed surface -> Dark carbon gray
                  finalColor = vec3(0.18, 0.18, 0.18); 
                }
              } else if (y >= 0.05 && y < 0.28) {
                // Gantry crossbeam level
                if (abs(z) < 0.35) {
                  // Gantry bellows & carriage backing -> Matte Black
                  finalColor = vec3(0.12, 0.12, 0.12);
                } else {
                  // Gantry side upright ears -> White/Light Gray
                  finalColor = vec3(0.88, 0.88, 0.88);
                }
              } else {
                // Z-axis spindle and top carriage (y >= 0.28)
                if (abs(x) < 0.15) {
                  // Spindle casing -> White with vertical orange stripe in center
                  if (abs(x) < 0.035) {
                    finalColor = vec3(0.92, 0.22, 0.05); // Orange vertical stripe
                  } else {
                    finalColor = vec3(0.88, 0.88, 0.88); // White spindle casing
                  }
                } else {
                  // Top cabling, motor caps, structure -> Black/Gray/White
                  finalColor = vec3(0.2, 0.2, 0.2); // Dark details
                }
              }
              
              vec4 diffuseColor = vec4( finalColor, opacity );
              `
            );
          };
          child.material.needsUpdate = true;
        }
      }
    });
  }, [scene]);

  // Gentle floating animation (bobbing up and down + subtle sway)
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 0.8) * 0.12;
      groupRef.current.rotation.y = Math.sin(t * 0.2) * 0.05;
      groupRef.current.rotation.z = Math.cos(t * 0.4) * 0.03;
    }
  });

  return (
    <group ref={groupRef}>
      <primitive
        object={scene}
        scale={1.7} // Center will auto-contain and size it. Reducing to 1.7 makes it a bit shorter/better proportioned.
      />
    </group>
  );
}

export const HeroScene = () => {
  return (
    <div className="w-full h-[380px] sm:h-[450px] md:h-[500px] lg:h-[550px] flex items-center justify-center select-none relative">
      <Canvas
        camera={{ position: [0, 1.5, 6], fov: 38 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]} // Performance optimized
        shadows
      >
        {/* Lights for premium rendering and depth */}
        <ambientLight intensity={0.4} />
        <directionalLight 
          position={[10, 15, 10]} 
          intensity={1.5} 
          castShadow 
          shadow-mapSize-width={1024} 
          shadow-mapSize-height={1024} 
        />
        <directionalLight position={[-10, 10, -5]} intensity={0.5} color="#E8F0F5" />
        <pointLight position={[0, -2, 3]} intensity={0.8} color="#D4C5A9" />

        {/* 3D Model with auto centering */}
        <Suspense fallback={null}>
          <Center>
            <FloatingModel />
          </Center>
          
          {/* Environment preset provides realistic reflections on metallic surfaces */}
          <Environment preset="city" />
          
          {/* Ground soft shadows for depth */}
          <ContactShadows 
            position={[0, -1.8, 0]} 
            opacity={0.5} 
            scale={8} 
            blur={2.4} 
            far={3.0} 
          />
        </Suspense>

        {/* Interactive camera controls */}
        <OrbitControls 
          enableZoom={false} // Prevent page scroll hijack
          autoRotate={true} // Slowly rotate camera around model
          autoRotateSpeed={0.5} // Ultra-gentle spin
          enableDamping={true} // Smooth drag inertia
          dampingFactor={0.05}
          enablePan={false} // Keep it centered
          minPolarAngle={Math.PI / 4} // Limit top view angle
          maxPolarAngle={Math.PI / 1.7} // Limit bottom view angle to avoid clipping under the model
        />
      </Canvas>
    </div>
  );
};

export default HeroScene;
