import './App.scss';
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

//Builds spinning shapes (args is scale)
const SpinningMesh = ({position, args, color})=>{
    const mesh = useRef(null);
    useFrame(()=>(mesh.current.rotation.x = mesh.current.rotation.y += 0.01))

    return (
        <mesh position={position} ref={mesh}>
            <boxBufferGeometry attach="geometry" args={args} />
            <meshStandardMaterial attach="material" color={color}/>
        </mesh>
         )
}

function App() {
  return (
        <Canvas colorManagement camera={{position:[-5,2,10], fov: 60}}>
            {/* Globally illuminate all objects in the scene equally - Does not cast shadows */}
            <ambientLight intensity={0.3}  />
            <SpinningMesh position={[0,1,0]} args={[3,2,1]} color="pink"/>
            <SpinningMesh position={[-2,1,-5]} color="lightblue"/>
            <SpinningMesh position={[5,1,-2]} color="lightblue"/>

        </Canvas>
  );
}

export default App;
