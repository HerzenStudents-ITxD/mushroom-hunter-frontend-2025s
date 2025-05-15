import { useMemo,useEffect,useState } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Vector3 } from "three/src/Three.Core.js";
export default function Trees(){
    const {scene}=useThree()
    const [treeData,setTreeData]=useState([])
    useEffect(()=>{
        const raycaster=new THREE.Raycaster()
        const down=new THREE.Vector3(0,-1,0)
        const arr=[]
        for (let i=0; i<60; i++){
        const x=(Math.random()-0.5)*100
        const z=(Math.random()-0.5)*100
        raycaster.set(new THREE.Vector3(x,50,z),down)
        const hits=raycaster.intersectObjects(scene.children,true)
        const groundHit=hits.find(h=>h.object.name==="ground")
        if(groundHit){
            const y = groundHit.point.y-1
            const height=8+Math.random()*2
            arr.push({x,y,z,height})
        }
        }
        setTreeData(arr)
    },[scene])
    return(
    <>
    {treeData.map(({x,y,z,height},i)=>(
        <group key={i} position={[x,y,z]}>
            <mesh position={[0,height/2,0]} castShadow>
                <cylinderGeometry args={[0.2,0.2,height]} />
                <meshStandardMaterial color={'brown'} />
            </mesh>
            <mesh position={[0,height+1,0]} castShadow>
                <sphereGeometry args={[1.5,8,8]} />
                <meshStandardMaterial color={'darkgreen'}/>
            </mesh>
        </group>
    ))}
    </>
    )
}