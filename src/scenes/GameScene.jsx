import Forest from "../components/Forest"
import Player from "../components/Player"
import Sky from "../components/Sky"
import Trees from "../components/Trees"
import Mushroom from "../components/Mushroom"
import { useMushrooms } from "../contexts/MushroomContext"


export default function GameScene(){
    const {collect}=useMushrooms()
    const handleMushroomInteract=(mushroom)=>{
        collect(mushroom.id,mushroom.info)
    }
    return(
        <>
            <ambientLight intensity={0.6} />
            <directionalLight position={[10,10,5]} intensity={1} castShadow />
            <Forest />
            <Sky />
            <Player />
            <Trees/>
            <Mushroom
            position={[10,4.35,2]}
            id="mushroom1"
            info={{type:"fungus",
            description:"mushroom",
            img:"/images/kozlac.jpg"}}/>
        </>
    )
}