import { createContext,useContext,useState } from "react";
const MushroomsContext=createContext();
export function MushroomsProvider({children}){
    const [collected,setCollected]=useState([]);
    const collect = (id,info)=>{
        setCollected((c)=>(c.find(x=>x.id===id) ? c : [...c,{id,info}]));
    };
    return(
        <MushroomsContext.Provider value={{collected,collect}}>
            {children}
        </MushroomsContext.Provider>
    );
}
export const useMushrooms = () => useContext(MushroomsContext);