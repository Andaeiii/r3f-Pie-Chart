import React, { useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { gsap } from 'gsap';
import PieChart from './charts/PieChart';

const data = [
  { value: 10, color: 'red' },
  { value: 20, color: 'green' },
  { value: 30, color: 'blue' },
  { value: 40, color: 'yellow' },
];

 
function App() {
  const chartRef = useRef();

  useEffect(() => {
    // Animate the pie chart from left to right
    gsap.fromTo(
      chartRef.current.rotation,
      { y: -Math.PI / 2 },  // Start from the left
      { y: Math.PI / 2, duration: 5, ease: 'power3.inOut' }  // Rotate to the right
    );
  }, []);

  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <group ref={chartRef}>
        <PieChart data={data} />
      </group>
    </Canvas>
  );
}

export default App();