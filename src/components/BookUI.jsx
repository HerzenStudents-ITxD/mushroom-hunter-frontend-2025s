import { useEffect,useState } from "react"
import "./BookUI.css"
import { useMushrooms } from "../contexts/MushroomContext"
export default function BookUI({visible,onClose}){
    const [page,setPage]=useState(0)
    const {collected}=useMushrooms()
    useEffect(() => {
        if (!visible) return;
        const handleKey = (e) => {
            if (e.key === "q" || e.key === "Q" || e.key === "Й" || e.key === "й") {
                setPage((p) => Math.max(0, p - 2));
            } else if (e.key === "e" || e.key === "E" || e.key === "у" || e.key === "У") {
                setPage((p) => (p + 2 < collected.length ? p + 2 : p));
            } else if (e.key === "Escape") {
                onClose();
            }
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [visible, collected.length, onClose]);


    if (!visible) return null
    const mushroom=collected[page]
    return(
        <div className="book-ui">
            <div className="book">
                <div className="page left">
                    <div className="page-content">
                        {mushroom ? (
                            <>
                            <h3>{mushroom.info.type}</h3>
                            <p>{mushroom.info.description}</p>
                            {mushroom.info.image && (
                                <img src={mushroom.info.image} alt={mushroom.info.type} className="mushroom-image" />
                            )} 
                            </>
                        ):"пусто"}
                    </div>
                    <div className="page-number">{page+1}</div>
                </div>
                <div className="page right">
                    <div className="page-content">
                        {collected[page+1] ? (
                            <>
                            <h3>{collected[page+1].info.type}</h3>
                            <p>{collected[page+1].info.description}</p>
                            {collected[page+1].info.image && (
                                <img src={collected[page+1].info.image} alt={collected[page+1].info.type} className="mushroom-image" />
                            )} 
                            </>
                        ):"пусто"}
                    </div>
                    <div className="page-number">{page+2<=collected.length ? page+2:""}</div>
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