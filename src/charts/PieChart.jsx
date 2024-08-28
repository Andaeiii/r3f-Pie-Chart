import React from 'react';
import * as THREE from 'three';

// Utility function to create a pie slice geometry
function createPieSliceGeometry(startAngle, endAngle, radius, thickness) {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.arc(0, 0, radius, startAngle, endAngle, false);
  shape.lineTo(
    Math.cos(endAngle) * (radius - thickness),
    Math.sin(endAngle) * (radius - thickness)
  );
  shape.arc(0, 0, radius - thickness, endAngle, startAngle, true);
  shape.closePath();

  const extrudeSettings = {
    depth: 0.5,
    bevelEnabled: false,
  };

  const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  geometry.rotateX(-Math.PI / 2);

  return geometry;
}

// Slice component
function Slice({ startAngle, endAngle, radius, thickness, color }) {
  const geometry = createPieSliceGeometry(startAngle, endAngle, radius, thickness);

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

//pie not working fully.... 

// PieChart component
function PieChart({ data, radius = 5, thickness = 1 }) {
  const total = data.reduce((sum, datum) => sum + datum.value, 0);
  let cumulativeAngle = 0;

  return (
    <>
      {data.map((datum, index) => {
        const startAngle = cumulativeAngle;
        const sliceAngle = (datum.value / total) * Math.PI * 2;
        cumulativeAngle += sliceAngle;

        return (
          <Slice
            key={index}
            startAngle={startAngle}
            endAngle={startAngle + sliceAngle}
            radius={radius}
            thickness={thickness}
            color={datum.color}
          />
        );
      })}
    </>
  );
}

export default PieChart; 