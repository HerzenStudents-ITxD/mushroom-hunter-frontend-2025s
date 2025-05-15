import {Canvas} from "@react-three/fiber"
import GameScene from "./scenes/GameScene"
import "./App.css"
import BookIcon from "./components/BookIcon"
import { useState,useEffect } from "react"
import BookUI from "./components/BookUI"

export default function App(){
  const [bookOpen,setBookOpen]=useState(false)
  useEffect(()=>{
    const handleKeyDown=(e)=>{
      if(e.key==="t" || e.key==="T" || e.key==="е" || e.key==="Е"){
        setBookOpen((prev)=>!prev)
      }
    }
    window.addEventListener("keydown",handleKeyDown)
    return () => window.removeEventListener("keydown",handleKeyDown)
  },[])
  return(
  <div className="canvas-container">
    <div
      style={{
        position:"absolute",
        top:"50%",
        left:"50%",
        width:"20px",
        height:"20px",
        marginLeft:"-10px",
        marginTop:"-10px",
        pointerEvents:"none",
        zIndex:1000,
      }}
    >
      <div
        style={{
          position:"absolute",
          top:0,
          left:"50%",
          width:"2px",
          height:"100%",
          background:"white",
        }}
      />
      <div
        style={{
          position:"absolute",
          top:"50%",
          left:0,
          width:"100%",
          height:"2px",
          background:"white",
        }}
      />
    </div>
    <Canvas shadows camera={{position:[0,2,5],fov:75}}>
      <GameScene />
    </Canvas>
    <div className="ui-overlay" style={{position:"absolute",top:0,left:0,width:"100%",height:"100%",pointerEvents:"none"}}>
      <div style={{position:"absolute",top:20,right:20,pointerEvents:"auto"}}>
        <BookIcon onClick={()=>setBookOpen(true)} />
      </div>
      {bookOpen && (
        <div style={{pointerEvents:"auto"}}>    
          <BookUI visible={bookOpen} onClose={()=>setBookOpen(false)} />
        </div>
      )}
    </div>
  </div>
  )
}