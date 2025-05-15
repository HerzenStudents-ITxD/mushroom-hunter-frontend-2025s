import { useEffect,useState } from "react"
import "./BookUI.css"
const mockPages=[
    "Подберезовик\nОписание:ростет в березовых рощах",
    "Сыроешка\nОписание:ростет в березовых рощах",
    "Белый гриб\nОписание:ростет в березовых рощах",
    "Поганка\nОписание:ростет в березовых рощах",
]
export default function BookUI({visible,onClose}){
    const [page,setPage]=useState(0)
    useEffect(()=>{
        if(!visible) return
        const handleKey =(e)=>{
            if (e.key==="q" || e.key==="Q" || e.key==="Й" || e.key==="й"){
                setPage((p)=>Math.max(0,p-2))
            }
            else if(e.key==="e" || e.key==="E" || e.key==="у" || e.key==="У"){
                setPage((p)=>Math.min(mockPages.length-1,p+2))
            }
            else if(e.key==="Escape"){
                onClose()
            }
        }
        window.addEventListener("keydown",handleKey)
        return ()=>window.removeEventListener("keydown",handleKey)
    },[visible,onClose])

    if (!visible) return null
    return(
        <div className="book-ui">
            <div className="book">
                <div className="page left">
                    <div className="page-content">{mockPages[page] ?? ""}</div>
                    <div className="page-number">{page+1}</div>
                </div>
                <div className="page right">
                    <div className="page-content">{mockPages[page+1] ?? "пусто"}</div>
                    <div className="page-number">{page+2<=mockPages.length ? page+2:""}</div>
                </div>
            </div>
            <div className="controls">
                <span>Q:влево</span>
                <span>Esc:закрыть</span>
                <span>E:вправо</span>
            </div>
        </div>
    )
}