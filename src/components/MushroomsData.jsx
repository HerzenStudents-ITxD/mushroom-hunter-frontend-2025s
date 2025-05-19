export const mushroomsData=[
    {
        id:"mushroom-1",
        modelPath:`${import.meta.env.BASE_URL}models/obj_f_1500_v_752.obj`,
        mtlPath:`${import.meta.env.BASE_URL}models/obj_f_1500_v_752.mtl`,
        position:[10,4.35,2],
        info:{
            type:"Козляк",
            description:"съедобный гриб",
            image:`${import.meta.env.BASE_URL}images/kozlac.jpg`,
        },
    },
    {
        id:"mushroom-2",
        modelPath:`${import.meta.env.BASE_URL}models/obj_f_1500_v_752.obj`,
        mtlPath:`${import.meta.env.BASE_URL}models/obj_f_1500_v_752.mtl`,
        position:[1,4.35,6],
        info:{
            type:"Поганка",
            description:"несъедобный гриб",
            image:`${import.meta.env.BASE_URL}images/poganka.png`,
        },
    }
]