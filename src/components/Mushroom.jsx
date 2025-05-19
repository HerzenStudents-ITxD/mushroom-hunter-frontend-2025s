import { useEffect, useRef, useMemo, useState } from "react";
import { useLoader, useFrame, useThree } from "@react-three/fiber";
import { OBJLoader, MTLLoader } from "three-stdlib";
import * as THREE from "three";
import { useMushrooms } from "../contexts/MushroomContext";
import { useGLTF } from "@react-three/drei";

export default function Mushroom({ scale, rotation, id, info, playerRef, modelPath, mtlPath }) {
    const groupRef = useRef();
    const [visible, setVisible] = useState(true);
    const [isHovered, setIsHovered] = useState(false);
    const [position, setPosition] = useState(null);
    const { collect } = useMushrooms();
    const { scene } = useThree();
    const GLOBAL_SEED = Math.floor(Math.random() * 100000);
    const gltfRef = useRef();

    const isGLTF = modelPath.endsWith(".gltf") || modelPath.endsWith(".glb");

    const gltf = isGLTF ? useGLTF(modelPath) : null;

    const obj = !isGLTF ? useLoader(OBJLoader, modelPath, (loader) => {
        if (mtlPath) {
            const materials = useLoader(MTLLoader, mtlPath);
            materials.preload();
            loader.setMaterials(materials);
        }
    }) : null;


    const meshes = useMemo(() => {
        if (!obj) return [];
        const output = [];
        obj.traverse(child => {
            if (child.isMesh) {
                child.geometry.computeBoundingBox();
                const center = new THREE.Vector3();
                child.geometry.boundingBox.getCenter(center);
                child.geometry.translate(-center.x, -center.y, -center.z);

                const material = child.material.clone();
                material.emissive = new THREE.Color(0x000000);
                material.emissiveIntensity = 0.6;

                const mesh = new THREE.Mesh(child.geometry, material);
                mesh.castShadow = true;
                mesh.receiveShadow = true;
                output.push(mesh);
            }
        });
        return output;
    }, [obj]);

    function hashStringToNumber(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = (hash << 5) - hash + str.charCodeAt(i);
        hash |= 0;
    }
    return hash;
    }

    function seededRandom(seed) {
        const x = Math.sin(seed) * 10000;
        return x - Math.floor(x);
    }


    useEffect(() => {
        // Найдём позицию на земле
        const raycaster = new THREE.Raycaster();
        const down = new THREE.Vector3(0, -1, 0);
        for (let attempt = 0; attempt < 100; attempt++) {
            const seedBase = GLOBAL_SEED + hashStringToNumber(id);
            const x = (seededRandom(seedBase + 1) - 0.5) * 400;
            const z = (seededRandom(seedBase + 2) - 0.5) * 400;

            raycaster.set(new THREE.Vector3(x, 50, z), down);
            const hits = raycaster.intersectObjects(scene.children, true);
            const groundHit = hits.find(h => h.object.name === "ground");
            if (groundHit) {
                const y = groundHit.point.y+1;
                setPosition([x, y, z]);
                break;
            }
        }
    }, [scene]);

    useFrame(() => {
        if (!visible || !playerRef?.current || !groupRef?.current || !position) return;
        const playerPos = new THREE.Vector3().setFromMatrixPosition(playerRef.current.matrixWorld);
        const mushroomPos = new THREE.Vector3().setFromMatrixPosition(groupRef.current.matrixWorld);
        const distance = playerPos.distanceTo(mushroomPos);
        if (distance < 2 && isHovered) {
            collect(id, info);
            setVisible(false);
        }
    });

    const handlePointOver = () => {
    setIsHovered(true);

    if (isGLTF && gltfRef.current) {
        gltfRef.current.traverse((child) => {
            if (child.isMesh && child.material && 'emissive' in child.material) {
                child.material.emissive.set(0xffffff);
            }
        });
    } else {
        meshes.forEach((mesh) => {
            mesh.material.emissive.set(0xffffff);
        });
    }
};


    const handlePointOut = () => {
    setIsHovered(false);

    if (isGLTF && gltfRef.current) {
        gltfRef.current.traverse((child) => {
            if (child.isMesh && child.material && 'emissive' in child.material) {
                child.material.emissive.set(0x000000);
            }
        });
    } else {
        meshes.forEach((mesh) => {
            mesh.material.emissive.set(0x000000);
        });
    }
};


    const handleClick = () => {
        if (isHovered && visible) {
            collect(id, info);
            setVisible(false);
        }
    };

    if (!visible || !position) return null;

    return (
        <group
            ref={groupRef}
            position={position}
            scale={scale}
            rotation={rotation}
            onPointerOver={handlePointOver}
            onPointerOut={handlePointOut}
            onClick={handleClick}
            userData={{ isMushroom: true }}
        >
            {isGLTF
                ? <primitive object={gltf.scene.clone()} ref={gltfRef} />
                : meshes.map((mesh, i) => (
                    <primitive key={i} object={mesh} />
                ))
            }
        </group>
    );
}
