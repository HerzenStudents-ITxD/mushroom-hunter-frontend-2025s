import Forest from "../components/Forest"
import Player from "../components/Player"
import Sky from "../components/Sky"
import Trees from "../components/Trees"
import Mushroom from "../components/Mushroom"



export default function GameScene(){
    return(
        <>
            <ambientLight intensity={0.6} />
            <directionalLight position={[10,10,5]} intensity={1} castShadow />
            <Forest />
            <Sky />
            <Player />
            <Trees/>
            <Mushroom position={[10,7,2]} />

        </>
    )
}