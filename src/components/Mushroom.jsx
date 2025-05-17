import { useEffect, useRef, useMemo } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { OBJLoader, MTLLoader } from "three-stdlib";
import * as THREE from "three";
import { useMushrooms } from "../contexts/MushroomContext";
import { useState } from "react";
export default function Mushroom({position=[0,0,0],id,info,playerRef}){
    const groupRef=useRef();
    const [visible,setVisible]=useState(true)
    const [isHovered,setIsHovered]=useState(false)
    const {collect}=useMushrooms()
    const materials=useLoader(MTLLoader,"/models/obj_f_1500_v_752.mtl");
    const obj=useLoader(OBJLoader,"/models/obj_f_1500_v_752.obj",(loader)=>{
        materials.preload()
        loader.setMaterials(materials)
    })
    const meshes=useMemo(()=>{
        const output=[]
        obj.traverse(child=>{
            if(child.isMesh){
                child.geometry.computeBoundingBox()
                const center=new THREE.Vector3()
                child.geometry.boundingBox.getCenter(center)
                child.geometry.translate(-center.x,-center.y,-center.z)

                const material=child.material.clone()
                material.emissive=new THREE.Color(0x000000)
                material.emissiveIntensity=0.6

                const mesh=new THREE.Mesh(child.geometry,material)
                child.castShadow=true
                child.receiveShadow=true
                output.push(mesh)
            }
        })
        return output
    },[obj])
    useFrame(()=>{
        if (!visible || !playerRef?.current || !groupRef?.current) return
        const playerPos=new THREE.Vector3().setFromMatrixPosition(playerRef.current.matrixWorld)
        const mushroomPos=new THREE.Vector3().setFromMatrixPosition(groupRef.current.matrixWorld)
        const distance=playerPos.distanceTo(mushroomPos)
        if (distance<10 && isHovered){
            collect(id,info)
            setVisible(false)
        }
    })

    const handlePointOver=()=>{
        setIsHovered(true)
        meshes.forEach((mesh)=>{
            mesh.material.emissive.set(0xffffff)
        })
    }
    const handlePointOut=()=>{
        setIsHovered(false)
        meshes.forEach((mesh)=>{
            mesh.material.emissive.set(0x000000)
        })
    }
    const handleClick=()=>{
        if (isHovered && visible){
            collect(id,info)
            setVisible(false)
        }
    }
    if (!visible) return null
return(
    <group
     position={position}
     scale={[1,1,1]}
     rotation={[Math.PI*1.8,Math.PI,Math.PI/8]}
     onPointerOver={handlePointOver}
     onPointerOut={handlePointOut}
     onClick={handleClick}>
        {meshes.map((mesh,i)=>(
        <primitive key={i} object={mesh} />
        ))}
    </group>
)
}