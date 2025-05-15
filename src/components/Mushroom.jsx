import { useEffect, useRef } from "react";
import { useLoader } from "@react-three/fiber";
import { OBJLoader, MTLLoader } from "three-stdlib";
import * as THREE from "three";
import { useMushrooms } from "../contexts/MushroomContext";
import { useState } from "react";
export default function Mushroom({position=[0,0,0],id,info,playerRef}){
    const groupRef=useRef();
    const [visible,setVisible]=useState(true)
    const {collect,collected}=useMushrooms()
    const materials=useLoader(MTLLoader,"/models/obj_f_1500_v_752.mtl");
    const obj=useLoader(OBJLoader,"/models/obj_f_1500_v_752.obj",(loader)=>{
        materials.preload()
        loader.setMaterials(materials)
    })
    const meshes=[]
        obj.traverse(child=>{
            if(child.isMesh){
                child.geometry.computeBoundingBox()
                const center=new THREE.Vector3()
                child.geometry.boundingBox.getCenter(center)
                child.geometry.translate(-center.x,-center.y,-center.z)
                child.castShadow=true
                child.receiveShadow=true
                meshes.push(child.clone())
            }
        })
    
return(
    <group
     position={position}
     scale={[5,5,5]}
     rotation={[Math.PI*1.8,Math.PI,Math.PI/8]}>
        {meshes.map((mesh,i)=>(
        <primitive key={i} object={mesh} />
        ))}
    </group>
)
}