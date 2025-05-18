import Forest from "../components/Forest"
import Player from "../components/Player"
import Sky from "../components/Sky"
import Trees from "../components/Trees"
import Mushroom from "../components/Mushroom"
import { useMushrooms } from "../contexts/MushroomContext"
import { mushroomsData } from "../components/MushroomsData"

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
            {mushroomsData.map((mushroom)=>
            <Mushroom
            key={mushroom.id}
            id={mushroom.id}
            info={mushroom.info}
            position={mushroom.position}
            modelPath={mushroom.modelPath}
            mtlPath={mushroom.mtlPath}
            playerRef={mushroom.playerRef}
            />
            )}
        </>
    )
}