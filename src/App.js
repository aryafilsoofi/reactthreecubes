
import { OrbitControls, softShadows } from '@react-three/drei';
import './App.scss';
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

softShadows();

//Builds spinning shapes (args is scale)
const SpinningMesh = ({position, args, color})=>{
    const mesh = useRef(null);
    useFrame(()=>(mesh.current.rotation.x = mesh.current.rotation.y += 0.01))

    return (
        <mesh
        castShadow
        receiveShadow
        position={position}
        ref={mesh}>
            <boxBufferGeometry attach="geometry" args={args} />
            <meshStandardMaterial attach="material" color={color}/>
        </mesh>
         )
}

function App() {
  return (
        <Canvas
        colorManagement
        shadows = {true}
        camera={{position:[-5,2,10], fov: 60}}>

            {/* Globally illuminate all objects in the scene equally - Does not cast shadows */}

            <ambientLight intensity={0.3}  />

            {/* Directional Lighting & Shadow Controls */}

            <directionalLight
                castShadow
                position={[0, 10, 0]}
                intensity={1.5}
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
                shadow-camera-far={50}
                shadow-camera-left={-10}
                shadow-camera-right={10}
                shadow-camera-top={10}
                shadow-camera-bottom={-10}
            />

            {/* Adds light to left of objects */}

            <pointLight position={[-10,0,-20]} intensity={0.5}/>

            {/* Adds light beneath objects */}

            <pointLight position={[0,-10,0]} intensity={1.5}/>

            {/* Render Ground Plane */}

            <group>
                <mesh
                receiveShadow
                castShadow
                rotation={[-Math.PI/2,0,0]}
                position={[0,-3,0]}>
                    <planeBufferGeometry attach='geometry' args={[100,100]}/>
                    <shadowMaterial attach="material" opacity={0.3} />
                 
                </mesh>
            </group>

            {/* Render Shapes */}

            <SpinningMesh position={[0,1,0]} args={[3,2,1]} color="pink"/>
            <SpinningMesh position={[-2,1,-5]} color="lightblue"/>
            <SpinningMesh position={[5,1,-2]} color="lightblue"/>
            <OrbitControls />
        </Canvas>
  );
}

export default App;
