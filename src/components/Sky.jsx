import {Sky} from "@react-three/drei"
export default function mySky(){
    return(
        <Sky
            distance={450000}
            sunPosition={[100,100,100]}
            inclination={0.49}
            azimuth={0.25}
        />
    )
}