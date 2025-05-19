import { useMemo } from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";


function markObstacles(object) {
    object.traverse((child) => {
        if (child.isMesh) {
            child.userData.isObstacle = true
            child.castShadow = true
            child.receiveShadow = true
        }
    })
}

function FenceSegment({ position, rotation }) {
    const { scene } = useGLTF(`${import.meta.env.BASE_URL}models/fence/scene.gltf`);

    const model = useMemo(() => {
        const cloned = scene.clone(true);
        markObstacles(cloned);
        return cloned;
    }, [scene]);

    return (
        <primitive
            object={model}
            position={position}
            rotation={rotation}
            scale={[0.03, 0.03, 0.03]}
        />
    );
}




export default function Forest() {
    const size = 800;
    const half = size / 2;
    const spacing = 50;

    const geometry = useMemo(() => {
        const geom = new THREE.PlaneGeometry(size, size, 100, 100);
        const pos = geom.attributes.position;

        for (let i = 0; i < pos.count; i++) {
            const y = 2 * Math.sin(pos.getX(i) * 0.1) + 2 * Math.cos(pos.getY(i) * 0.1);
            pos.setZ(i, y);
        }

        pos.needsUpdate = true;
        geom.computeVertexNormals();
        geom.rotateX(-Math.PI / 2);
        return geom;
    }, []);

    const fenceSegments = [];

    // Перед и зад
    for (let x = 0; x < half*1.2; x += spacing)
    {
    fenceSegments.push(<FenceSegment key={`f-front-${x}`} position={[-half+150, -10, half-600+x]} rotation={[0, Math.PI, 0]} />);
    fenceSegments.push(<FenceSegment key={`f-back-${-x}`} position={[-half+650, -10, half-600+x]} />);
    }
    
    

    for (let x = 0; x < half*1.2; x += spacing)
    {
    fenceSegments.push(<FenceSegment key={`f-left-${x+1}`} position={[-half+170+x, -10, half-620]} rotation={[0, -Math.PI / 2, 0]} />);
    fenceSegments.push(<FenceSegment key={`f-right-${-x+1}`} position={[half-170-x, -10, half-135]} rotation={[0, Math.PI / 2, 0]} />);
    }
    


    return (
        <>
            {/* Земля */}
            <mesh geometry={geometry} receiveShadow name="ground">
                <meshStandardMaterial color="green" />
            </mesh>

            {/* Забор из GLTF */}
            {fenceSegments}
        </>
    );
}
