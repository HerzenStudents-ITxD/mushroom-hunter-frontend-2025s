import { useEffect, useState } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";

export default function Trees() {
    const { scene } = useThree();
    const [treeData, setTreeData] = useState([]);
    const gltf = useGLTF(`${import.meta.env.BASE_URL}models/tree/scene.gltf`); 

    useEffect(() => {
        const raycaster = new THREE.Raycaster();
        const down = new THREE.Vector3(0, -1, 0);
        const arr = [];

        for (let i = 0; i < 30; i++) {
            const x = (Math.random() - 0.5) * 400;
            const z = (Math.random() - 0.5) * 400;
            raycaster.set(new THREE.Vector3(x, 50, z), down);
            const hits = raycaster.intersectObjects(scene.children, true);
            const groundHit = hits.find(h => h.object.name === "ground");

            if (groundHit) {
                const y = groundHit.point.y-3;
                arr.push({ x, y, z });
            }
        }

        setTreeData(arr);
    }, [scene]);

    return (
        <>
            {treeData.map(({ x, y, z }, i) => (
                <primitive
                    key={i}
                    object={gltf.scene.clone(true)} // важно: deep clone
                    position={[x, y, z]}
                    scale={[50, 50, 50]} // подгони масштаб
                    castShadow
                    receiveShadow
                />
            ))}
        </>
    );
}
