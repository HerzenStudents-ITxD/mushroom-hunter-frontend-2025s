export const mushroomsData=[
    {
        id:"mushroom-1",
        modelPath:`${import.meta.env.BASE_URL}models/obj_f_1500_v_752.obj`,
        mtlPath:`${import.meta.env.BASE_URL}models/obj_f_1500_v_752.mtl`,
        scale:[1,1,1],
        rotation:[Math.PI * 1.8, Math.PI, Math.PI / 8],
        info:{
            type:"Козляк (Suillus bovinus)",
            description:"Cъедобный трубчатый гриб с коричневой шляпкой и жёлтой мякотью. Растёт в сосновых лесах, часто в мху. Молодые грибы вкусны, но требуют очистки от слизистой кожицы.",
            image:`${import.meta.env.BASE_URL}images/kozlac.jpg`,
        },
    },
    {
        id:"mushroom-2",
        modelPath:`${import.meta.env.BASE_URL}models/Mushroom_3.obj`,
        mtlPath:`${import.meta.env.BASE_URL}models/Mushroom_3.mtl`,
        scale:[20,20,20],
        rotation: [Math.PI*2, Math.PI, Math.PI*1.95 ],
        info:{
            type:"Мухомор (Amanita muscaria)",
            description:"ядовитый гриб с ярко-красной шляпкой и белыми пятнами. Обладает галлюциногенными свойствами. В сыром виде опасен для здоровья, иногда используется в медицине и фольклоре.",
            image:`${import.meta.env.BASE_URL}images/muhomor.jpg`,
        },
    },

    {
        id:"mushroom-3",
        modelPath:`${import.meta.env.BASE_URL}models/opyata/scene.gltf`,
        mtlPath:"",
        //position:[1,2.8,6],
        scale:[20,20,20],
        rotation: [Math.PI*2, Math.PI, Math.PI*1.95 ],
        info:{
            type:"Опята (Armillaria)",
            description:"съедобные грибы, растут группами на пнях и деревьях. Имеют медово-коричневую шляпку и тонкую ножку с кольцом.",
            image:`${import.meta.env.BASE_URL}images/opyata.png`,
        },
    },

    {
        id:"mushroom-4",
        modelPath:`${import.meta.env.BASE_URL}models/zont/scene.gltf`,
        mtlPath:"",
        //position:[1,2.8,6],
        scale:[0.005,0.005,0.005],
        rotation: [Math.PI*2, Math.PI, Math.PI*1.95 ],
        info:{
            type:"Гриб-зонт пёстрый (Macrolepiota procera)",
            description:"крупный съедобный гриб с чешуйчатой шляпкой-зонтом и длинной тонкой ножкой. Вкусный, но легко спутать с ядовитыми двойниками.",
            image:`${import.meta.env.BASE_URL}images/zont.jpg`,
        },
    },

    {
        id:"mushroom-5",
        modelPath:`${import.meta.env.BASE_URL}models/champ/scene.gltf`,
        mtlPath:"",
        //position:[1,2.8,6],
        scale:[1,1,1],
        rotation: [Math.PI*2, Math.PI, Math.PI*1.95 ],
        info:{
            type:"Шампиньоны (Agaricus)",
            description:"съедобные грибы с белой шляпкой и розовыми/коричневыми пластинками. Часто встречаются на лугах и в садах.",
            image:`${import.meta.env.BASE_URL}images/shamp.jpg`,
        },
    },

    {
        id:"mushroom-6",
        modelPath:`${import.meta.env.BASE_URL}models/bolt/scene.gltf`,
        mtlPath:"",
        //position:[1,2.8,6],
        scale:[1,1,1],
        rotation: [Math.PI*2, Math.PI, Math.PI*1.95 ],
        info:{
            type:"Подберёзовик (Leccinum scabrum)",
            description:"съедобный гриб с бурой шляпкой и характерной шершавой ножкой. Растёт под берёзами, популярен у грибников.",
            image:`${import.meta.env.BASE_URL}images/bolt.jpg`,
        },
    },

    {
        id:"mushroom-7",
        modelPath:`${import.meta.env.BASE_URL}models/lis/scene.gltf`,
        mtlPath:"",
        //position:[1,2.8,6],
        scale:[1,1,1],
        rotation: [Math.PI*2, Math.PI, Math.PI*1.95 ],
        info:{
            type:"Лисички (Cantharellus cibarius)",
            description:"съедобные грибы ярко-жёлтого цвета, с волнистой шляпкой. Имеют фруктовый запах, не червивеют, растут в хвойных и смешанных лесах.",
            image:`${import.meta.env.BASE_URL}images/lis.jpg`,
        },
    },
]