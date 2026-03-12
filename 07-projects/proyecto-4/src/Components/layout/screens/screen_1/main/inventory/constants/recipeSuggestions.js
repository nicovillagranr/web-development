// ================= CONTEXTO MODULO =================
// Catalogo estatico de recetas y fallback.
// Fuente de datos para sugerencias segun coincidencia de ingredientes.

export const RECIPE_CATALOG = [

    // ===== HUEVOS Y TORTILLAS =====
    {
        id: "omelette-queso",
        title: "Omelette de queso",
        ingredients: ["huevo", "queso", "cebolla"],
        steps: [
            "Bate los huevos y agrega una pizca de sal.",
            "Sofrie la cebolla por 2-3 minutos.",
            "Agrega huevo batido, incorpora queso y cocina a fuego medio.",
            "Dobla el omelette y sirve caliente.",
        ],
    },
    {
        id: "huevos-revueltos-jamon",
        title: "Huevos revueltos con jamon",
        ingredients: ["huevo", "jamon", "queso"],
        steps: [
            "Bate los huevos con sal y pimienta.",
            "Dora el jamon picado por 1 minuto.",
            "Agrega los huevos y cocina moviendo.",
            "Termina con queso y sirve.",
        ],
    },
    {
        id: "tortilla-espinaca-queso",
        title: "Tortilla de espinaca y queso",
        ingredients: ["huevo", "espinaca", "queso"],
        steps: [
            "Saltea espinaca por 2 minutos.",
            "Mezcla huevo batido con queso.",
            "Incorpora espinaca y cocina en sarten.",
            "Da vuelta y cocina hasta dorar.",
        ],
    },
    {
        id: "frittata-zapallo-cebolla",
        title: "Frittata de zapallo y cebolla",
        ingredients: ["huevo", "zapallo", "cebolla"],
        steps: [
            "Corta zapallo y cebolla en cubos pequenos.",
            "Saltea hasta ablandar.",
            "Agrega huevo batido y cocina a fuego bajo.",
            "Termina en horno o tapa hasta cuajar.",
        ],
    },
    {
        id: "revuelto-champinon-queso",
        title: "Revuelto de champinon y queso",
        ingredients: ["huevo", "champinon", "queso"],
        steps: [
            "Saltea champinon laminado.",
            "Agrega huevo batido y mezcla.",
            "Termina con queso rallado.",
            "Sirve caliente.",
        ],
    },
    {
        id: "shakshuka-rapida",
        title: "Shakshuka rapida",
        ingredients: ["huevo", "tomate", "pimenton"],
        steps: [
            "Sofrie pimenton y tomate picados.",
            "Haz huecos y agrega huevos.",
            "Tapa y cocina hasta cuajar.",
            "Sirve con pan.",
        ],
    },
    {
        id: "huevos-benedictinos",
        title: "Huevos benedictinos",
        ingredients: ["huevo", "jamon", "pan"],
        steps: [
            "Tuesta el pan hasta dorar.",
            "Calienta el jamon en sarten.",
            "Pochea los huevos en agua con vinagre.",
            "Arma: pan, jamon, huevo y sirve.",
        ],
    },

    // ===== ENSALADAS =====
    {
        id: "ensalada-caprese",
        title: "Ensalada caprese",
        ingredients: ["tomate", "queso", "aceite"],
        steps: [
            "Corta tomate y queso en rodajas.",
            "Alterna capas en un plato amplio.",
            "Alina con aceite y una pizca de sal.",
            "Sirve fria como entrada o acompanamiento.",
        ],
    },
    {
        id: "ensalada-pollo-palta",
        title: "Ensalada de pollo y palta",
        ingredients: ["pollo", "palta", "lechuga"],
        steps: [
            "Desmenuza el pollo cocido.",
            "Corta palta y lava la lechuga.",
            "Mezcla todo con aceite y limon.",
            "Sirve fria.",
        ],
    },
    {
        id: "ensalada-atun-huevo",
        title: "Ensalada de atun y huevo",
        ingredients: ["atun", "huevo", "tomate"],
        steps: [
            "Hierve huevo y cortalo en cuartos.",
            "Mezcla atun con tomate picado.",
            "Integra huevo y adereza con aceite.",
            "Sirve al momento.",
        ],
    },
    {
        id: "ensalada-griega",
        title: "Ensalada griega",
        ingredients: ["pepino", "tomate", "queso"],
        steps: [
            "Corta pepino y tomate en cubos.",
            "Agrega queso en trozos.",
            "Alina con aceite y oregano.",
            "Refrigera 5 minutos y sirve.",
        ],
    },
    {
        id: "ensalada-repollo-zanahoria",
        title: "Ensalada de repollo y zanahoria",
        ingredients: ["repollo", "zanahoria", "mayonesa"],
        steps: [
            "Ralla zanahoria y corta repollo fino.",
            "Mezcla con mayonesa y sal.",
            "Deja reposar 10 minutos en frio.",
            "Sirve como acompanamiento.",
        ],
    },
    {
        id: "ensalada-frutas",
        title: "Ensalada de frutas",
        ingredients: ["manzana", "platano", "naranja"],
        steps: [
            "Lava y corta las frutas en cubos.",
            "Mezcla en un bowl amplio.",
            "Enfria 10 minutos en refrigeracion.",
            "Sirve fresca.",
        ],
    },
    {
        id: "ensalada-garbanzos-fresca",
        title: "Ensalada fresca de garbanzos",
        ingredients: ["garbanzo", "tomate", "pepino"],
        steps: [
            "Escurre garbanzos cocidos.",
            "Corta tomate y pepino en cubos.",
            "Mezcla con aceite y limon.",
            "Sirve fria.",
        ],
    },
    {
        id: "ensalada-quinoa-palta",
        title: "Ensalada de quinoa y palta",
        ingredients: ["quinoa", "palta", "tomate"],
        steps: [
            "Cocina quinoa y deja enfriar.",
            "Corta palta y tomate en cubos.",
            "Mezcla todo con aceite y limon.",
            "Sirve fria.",
        ],
    },

    // ===== BATIDOS Y SMOOTHIES =====
    {
        id: "batido-frutas",
        title: "Batido de frutas",
        ingredients: ["leche", "platano", "frutilla"],
        steps: [
            "Lava y corta la fruta en trozos.",
            "Agrega fruta y leche en una licuadora.",
            "Licua hasta lograr textura suave.",
            "Sirve inmediatamente.",
        ],
    },
    {
        id: "licuado-frutilla-yogur",
        title: "Licuado de frutilla y yogur",
        ingredients: ["frutilla", "yogur", "leche"],
        steps: [
            "Lava y corta las frutillas.",
            "Agrega fruta, yogur y leche en licuadora.",
            "Licua hasta textura cremosa.",
            "Sirve bien frio.",
        ],
    },
    {
        id: "smoothie-verde-fruta",
        title: "Smoothie verde",
        ingredients: ["espinaca", "platano", "leche"],
        steps: [
            "Lava espinaca y corta platano.",
            "Licua con leche hasta integrar.",
            "Ajusta espesor con mas leche.",
            "Sirve de inmediato.",
        ],
    },
    {
        id: "bowl-yogur-fruta",
        title: "Bowl de yogur y fruta",
        ingredients: ["yogur", "platano", "manzana"],
        steps: [
            "Sirve yogur en un bowl.",
            "Corta fruta y agrega encima.",
            "Mezcla suave y sirve.",
        ],
    },
    {
        id: "avena-nocturna-yogur",
        title: "Avena nocturna con yogur",
        ingredients: ["yogur", "leche", "manzana"],
        steps: [
            "Mezcla yogur y leche en frasco.",
            "Agrega manzana picada.",
            "Refrigera toda la noche.",
            "Consume fria por la manana.",
        ],
    },
    {
        id: "jugo-naranja-zanahoria",
        title: "Jugo de naranja y zanahoria",
        ingredients: ["naranja", "zanahoria", "limon"],
        steps: [
            "Exprime las naranjas.",
            "Licua la zanahoria con un poco de agua.",
            "Mezcla ambos jugos con jugo de limon.",
            "Sirve bien frio con hielo.",
        ],
    },
    {
        id: "limonada-menta",
        title: "Limonada con menta",
        ingredients: ["limon", "menta", "agua"],
        steps: [
            "Exprime los limones en una jarra.",
            "Agrega agua fria y azucar al gusto.",
            "Incorpora hojas de menta y hielo.",
            "Revuelve y sirve.",
        ],
    },

    // ===== SANDWICHES Y WRAPS =====
    {
        id: "sandwich-pollo",
        title: "Sandwich de pollo",
        ingredients: ["pollo", "pan", "tomate"],
        steps: [
            "Calienta o desmenuza el pollo cocido.",
            "Tuesta ligeramente el pan.",
            "Agrega pollo y tomate en capas.",
            "Cierra el sandwich y sirve.",
        ],
    },
    {
        id: "sandwich-pavo-queso",
        title: "Sandwich de pavo y queso",
        ingredients: ["pavo", "queso", "pan"],
        steps: [
            "Tuesta levemente el pan.",
            "Agrega laminas de pavo y queso.",
            "Calienta hasta fundir el queso.",
            "Sirve caliente.",
        ],
    },
    {
        id: "quesadilla-jamon-queso",
        title: "Quesadilla de jamon y queso",
        ingredients: ["jamon", "queso", "tortilla"],
        steps: [
            "Rellena tortilla con jamon y queso.",
            "Dobla y cocina en sarten.",
            "Dora por ambos lados.",
            "Corta en triangulos y sirve.",
        ],
    },
    {
        id: "tostada-ricota-tomate",
        title: "Tostada de ricota y tomate",
        ingredients: ["ricota", "tomate", "pan"],
        steps: [
            "Tuesta el pan hasta dorar.",
            "Unta ricota sobre la tostada.",
            "Agrega tomate en laminas.",
            "Termina con aceite y sal.",
        ],
    },
    {
        id: "wrap-huevo-espinaca",
        title: "Wrap de huevo y espinaca",
        ingredients: ["huevo", "espinaca", "tortilla"],
        steps: [
            "Haz un revuelto suave de huevo.",
            "Agrega espinaca salteada.",
            "Rellena la tortilla y enrolla.",
            "Sirve tibio.",
        ],
    },
    {
        id: "pizza-pan-molde",
        title: "Pizza rapida en pan de molde",
        ingredients: ["pan", "queso", "tomate"],
        steps: [
            "Pon pan en bandeja.",
            "Agrega tomate picado y queso.",
            "Hornea hasta derretir el queso.",
            "Sirve caliente.",
        ],
    },
    {
        id: "completo-italiano",
        title: "Completo italiano",
        ingredients: ["pan", "tomate", "palta"],
        steps: [
            "Calienta el pan de hot dog.",
            "Unta palta aplastada.",
            "Agrega tomate picado.",
            "Termina con mayonesa al gusto.",
        ],
    },

    // ===== CARNES Y PROTEINAS =====
    {
        id: "salteado-verduras",
        title: "Salteado de verduras",
        ingredients: ["zanahoria", "pimenton", "cebolla"],
        steps: [
            "Corta las verduras en tiras finas.",
            "Saltea cebolla y pimenton a fuego alto.",
            "Incorpora zanahoria y cocina hasta dorar.",
            "Ajusta sal y sirve como acompanamiento.",
        ],
    },
    {
        id: "pollo-salteado-brocoli",
        title: "Pollo salteado con brocoli",
        ingredients: ["pollo", "brocoli", "cebolla"],
        steps: [
            "Corta pollo en tiras y condimenta.",
            "Saltea cebolla y brocoli 3 minutos.",
            "Agrega pollo y cocina hasta dorar.",
            "Sirve caliente.",
        ],
    },
    {
        id: "pollo-yogur-limon",
        title: "Pollo al yogur y limon",
        ingredients: ["pollo", "yogur", "limon"],
        steps: [
            "Mezcla yogur con jugo de limon.",
            "Marina pollo por 20 minutos.",
            "Cocina en sarten u horno.",
            "Sirve con ensalada.",
        ],
    },
    {
        id: "salmon-limon-mantequilla",
        title: "Salmon con limon",
        ingredients: ["salmon", "limon", "mantequilla"],
        steps: [
            "Sazona el salmon con sal y pimienta.",
            "Agrega limon y mantequilla encima.",
            "Hornea o cocina tapado en sarten.",
            "Sirve con verduras.",
        ],
    },
    {
        id: "lomo-saltado",
        title: "Lomo saltado",
        ingredients: ["carne", "tomate", "cebolla"],
        steps: [
            "Corta la carne en tiras y sazona.",
            "Saltea a fuego muy alto con cebolla.",
            "Agrega tomate y saltea 1 minuto mas.",
            "Sirve con arroz o papas fritas.",
        ],
    },
    {
        id: "albondigas-salsa",
        title: "Albondigas en salsa de tomate",
        ingredients: ["carne", "huevo", "tomate"],
        steps: [
            "Mezcla carne molida con huevo y sal.",
            "Forma bolitas y dora en sarten.",
            "Agrega tomate picado y cocina tapado.",
            "Sirve con pasta o arroz.",
        ],
    },

    // ===== PASTA Y ARROZ =====
    {
        id: "arroz-con-pollo",
        title: "Arroz con pollo",
        ingredients: ["arroz", "pollo", "cebolla"],
        steps: [
            "Dora cebolla con trozos de pollo.",
            "Agrega arroz y mezcla por 1 minuto.",
            "Incorpora agua caliente y cocina tapado.",
            "Reposa 5 minutos y sirve.",
        ],
    },
    {
        id: "arroz-frito-huevo",
        title: "Arroz frito con huevo",
        ingredients: ["arroz", "huevo", "cebolla"],
        steps: [
            "Saltea cebolla picada en aceite.",
            "Agrega arroz cocido y mezcla.",
            "Incorpora huevo batido y cocina.",
            "Sirve caliente.",
        ],
    },
    {
        id: "pasta-cremosa",
        title: "Pasta cremosa",
        ingredients: ["pasta", "crema", "queso"],
        steps: [
            "Cocina la pasta al dente.",
            "Calienta crema en sarten y agrega queso.",
            "Integra la pasta y mezcla hasta espesar.",
            "Sirve con pimienta al gusto.",
        ],
    },
    {
        id: "pasta-atun-limon",
        title: "Pasta de atun y limon",
        ingredients: ["pasta", "atun", "limon"],
        steps: [
            "Cocina pasta al dente.",
            "Mezcla atun con jugo de limon.",
            "Integra con pasta caliente.",
            "Sirve con pimienta.",
        ],
    },
    {
        id: "pasta-pollo-crema",
        title: "Pasta de pollo y crema",
        ingredients: ["pasta", "pollo", "crema"],
        steps: [
            "Cocina pasta y reserva.",
            "Dora pollo en cubos en sarten.",
            "Agrega crema y cocina 2 minutos.",
            "Integra la pasta y sirve.",
        ],
    },
    {
        id: "risotto-champinon",
        title: "Risotto de champinon",
        ingredients: ["arroz", "champinon", "crema"],
        steps: [
            "Saltea champinon laminado.",
            "Agrega arroz y tuesta 1 minuto.",
            "Incorpora caldo de a poco revolviendo.",
            "Termina con crema y sirve.",
        ],
    },

    // ===== SOPAS Y CREMAS =====
    {
        id: "crema-zapallo",
        title: "Crema de zapallo",
        ingredients: ["zapallo", "crema", "cebolla"],
        steps: [
            "Sofrie cebolla por 2 minutos.",
            "Agrega zapallo en cubos y agua.",
            "Cocina hasta ablandar y procesa.",
            "Incorpora crema y sirve caliente.",
        ],
    },
    {
        id: "sopa-verduras",
        title: "Sopa de verduras",
        ingredients: ["zanahoria", "papa", "apio"],
        steps: [
            "Corta verduras en cubos pequenos.",
            "Hierve en agua con sal.",
            "Cocina hasta que esten tiernas.",
            "Sirve caliente.",
        ],
    },
    {
        id: "cazuela-chilena",
        title: "Cazuela chilena",
        ingredients: ["pollo", "papa", "zapallo"],
        steps: [
            "Hierve el pollo con agua y sal.",
            "Agrega papa y zapallo en trozos grandes.",
            "Cocina hasta que todo este tierno.",
            "Sirve en bowl con el caldo.",
        ],
    },
    {
        id: "sopa-lentejas",
        title: "Sopa de lentejas",
        ingredients: ["lenteja", "zanahoria", "cebolla"],
        steps: [
            "Sofrie cebolla y zanahoria picados.",
            "Agrega lentejas y agua hasta cubrir.",
            "Cocina a fuego medio 30 minutos.",
            "Ajusta sal y sirve caliente.",
        ],
    },

    // ===== SNACKS Y COMPLEMENTOS =====
    {
        id: "croquetas-papa-queso",
        title: "Croquetas de papa y queso",
        ingredients: ["papa", "queso", "huevo"],
        steps: [
            "Cocina y muele papas.",
            "Mezcla con queso rallado y huevo.",
            "Forma croquetas y dora en sarten.",
            "Sirve con ensalada.",
        ],
    },
    {
        id: "gratin-coliflor-queso",
        title: "Gratin de coliflor y queso",
        ingredients: ["coliflor", "queso", "crema"],
        steps: [
            "Cocina coliflor al vapor.",
            "Pon en fuente con crema y queso.",
            "Hornea hasta dorar.",
            "Sirve caliente.",
        ],
    },
    {
        id: "pure-papa-queso",
        title: "Pure de papa y queso",
        ingredients: ["papa", "leche", "queso"],
        steps: [
            "Hierve las papas hasta ablandar.",
            "Muele con leche caliente.",
            "Agrega queso y mezcla.",
            "Sirve tibio.",
        ],
    },
    {
        id: "sopaipillas",
        title: "Sopaipillas",
        ingredients: ["zapallo", "harina", "mantequilla"],
        steps: [
            "Cocina el zapallo y aplasta hasta hacer pure.",
            "Mezcla con harina y mantequilla hasta formar masa.",
            "Estira y corta en circulos.",
            "Frie en aceite caliente hasta dorar.",
        ],
    },
    {
        id: "guacamole-tostadas",
        title: "Guacamole con tostadas",
        ingredients: ["palta", "tomate", "limon"],
        steps: [
            "Aplasta la palta con tenedor.",
            "Agrega tomate picado y jugo de limon.",
            "Sazona con sal y mezcla.",
            "Sirve con pan o tostadas.",
        ],
    },
    {
        id: "hummus-casero",
        title: "Hummus casero",
        ingredients: ["garbanzo", "limon", "aceite"],
        steps: [
            "Escurre y procesa los garbanzos.",
            "Agrega limon y aceite.",
            "Procesa hasta obtener pasta suave.",
            "Sirve con pan o verduras.",
        ],
    },

    // ===== BEBIDAS ALCOHOLICAS =====
    {
        id: "piscola-clasica",
        title: "Piscola clasica",
        ingredients: ["pisco", "coca cola", "limon"],
        steps: [
            "Llena un vaso con hielo.",
            "Agrega 1 parte de pisco por 3 de cola.",
            "Exprime medio limon encima.",
            "Revuelve suavemente y sirve.",
        ],
    },
    {
        id: "pisco-sour",
        title: "Pisco Sour",
        ingredients: ["pisco", "limon", "huevo"],
        steps: [
            "Mezcla pisco, jugo de limon y azucar en coctelera.",
            "Agrega clara de huevo.",
            "Agita con hielo vigorosamente.",
            "Cuela en copa fria y sirve con amargo.",
        ],
    },
    {
        id: "borgona-chilena",
        title: "Borgona chilena",
        ingredients: ["vino", "frutilla", "azucar"],
        steps: [
            "Lava y corta las frutillas en mitades.",
            "Mezcla con azucar y deja macerar 10 minutos.",
            "Agrega vino tinto bien frio.",
            "Sirve con hielo.",
        ],
    },
    {
        id: "navegado-chileno",
        title: "Navegado chileno",
        ingredients: ["vino", "naranja", "canela"],
        steps: [
            "Calienta el vino tinto a fuego bajo, sin hervir.",
            "Agrega rodajas de naranja y canela.",
            "Endulza con azucar al gusto.",
            "Sirve caliente en taza.",
        ],
    },
    {
        id: "terremoto",
        title: "Terremoto",
        ingredients: ["vino", "helado", "granadina"],
        steps: [
            "Sirve vino pipeño frio en vaso grande.",
            "Agrega 1 bola de helado de piña encima.",
            "Incorpora un chorro de granadina.",
            "Sirve inmediatamente con sorbete.",
        ],
    },
    {
        id: "clery-chileno",
        title: "Clery chileno",
        ingredients: ["vino", "frutilla", "limon"],
        steps: [
            "Mezcla vino blanco frio con frutillas maceradas.",
            "Agrega jugo de limon y azucar.",
            "Revuelve bien y refrigera 15 minutos.",
            "Sirve con hielo.",
        ],
    },
    {
        id: "chela-limon",
        title: "Chela con limon",
        ingredients: ["cerveza", "limon", "sal"],
        steps: [
            "Sirve la cerveza bien fria en vaso.",
            "Exprime limon al gusto.",
            "Agrega una pizca de sal en el borde.",
            "Sirve inmediatamente.",
        ],
    },
    {
        id: "michelada",
        title: "Michelada",
        ingredients: ["cerveza", "limon", "tomate"],
        steps: [
            "Mezcla jugo de tomate con limon y sal.",
            "Sirve la mezcla en vaso con hielo.",
            "Completa con cerveza fria.",
            "Revuelve suavemente y sirve.",
        ],
    },
    {
        id: "sangria-rapida",
        title: "Sangria rapida",
        ingredients: ["vino", "naranja", "manzana"],
        steps: [
            "Corta naranja y manzana en rodajas.",
            "Mezcla vino tinto con las frutas.",
            "Agrega azucar y refrigera 1 hora.",
            "Sirve con hielo y un chorrito de jugo de naranja.",
        ],
    },

];

export const FALLBACK_RECIPES = [

    // ===== FALLBACK: usados cuando no hay coincidencias en el catalogo =====
    {
        id: "wrap-verduras",
        title: "Wrap de verduras",
        ingredients: ["pan", "tomate", "cebolla"],
        steps: [
            "Calienta una tortilla o pan delgado.",
            "Rellena con verduras cortadas.",
            "Enrolla y corta en mitades.",
        ],
    },
    {
        id: "tostadas-palta",
        title: "Tostadas con palta",
        ingredients: ["pan", "palta", "aceite"],
        steps: [
            "Tuesta el pan hasta dorar.",
            "Aplasta la palta y unta sobre el pan.",
            "Termina con aceite y sal.",
        ],
    },
    {
        id: "bowl-yogur-fruta-fallback",
        title: "Bowl de yogur y fruta",
        ingredients: ["yogur", "platano", "frutilla"],
        steps: [
            "Sirve yogur en un bowl.",
            "Agrega fruta picada por encima.",
            "Mezcla suavemente y sirve.",
        ],
    },
    {
        id: "sandwich-queso-tomate",
        title: "Sandwich de queso y tomate",
        ingredients: ["pan", "queso", "tomate"],
        steps: [
            "Tuesta el pan.",
            "Agrega queso y tomate.",
            "Cierra y sirve.",
        ],
    },
    {
        id: "huevos-a-la-plancha",
        title: "Huevos a la plancha",
        ingredients: ["huevo", "mantequilla", "pan"],
        steps: [
            "Calienta sarten con mantequilla.",
            "Cocina huevos al punto deseado.",
            "Sirve con pan.",
        ],
    },
    {
        id: "ensalada-express",
        title: "Ensalada express",
        ingredients: ["lechuga", "tomate", "pepino"],
        steps: [
            "Lava los vegetales.",
            "Corta y mezcla en bowl.",
            "Alina con aceite y sal.",
        ],
    },
    {
        id: "yogur-manzana",
        title: "Yogur con manzana",
        ingredients: ["yogur", "manzana", "miel"],
        steps: [
            "Sirve yogur en un bowl.",
            "Agrega manzana picada.",
            "Termina con miel.",
        ],
    },
    {
        id: "pan-jamon-queso",
        title: "Pan con jamon y queso",
        ingredients: ["pan", "jamon", "queso"],
        steps: [
            "Arma sandwich con jamon y queso.",
            "Calienta en sarten o tostador.",
            "Sirve caliente.",
        ],
    },
    {
        id: "revuelto-rapido",
        title: "Revuelto rapido",
        ingredients: ["huevo", "cebolla", "tomate"],
        steps: [
            "Saltea cebolla y tomate.",
            "Agrega huevo batido.",
            "Cocina revolviendo y sirve.",
        ],
    },
    {
        id: "licuado-leche-platano",
        title: "Licuado de leche y platano",
        ingredients: ["leche", "platano", "yogur"],
        steps: [
            "Agrega todo a la licuadora.",
            "Licua por 30 segundos.",
            "Sirve frio.",
        ],
    },
    {
        id: "salteado-basico",
        title: "Salteado basico",
        ingredients: ["zanahoria", "cebolla", "pimenton"],
        steps: [
            "Corta verduras en tiras.",
            "Saltea a fuego alto.",
            "Sirve como base o acompanamiento.",
        ],
    },
    {
        id: "sopa-rapida-papa",
        title: "Sopa rapida de papa",
        ingredients: ["papa", "leche", "cebolla"],
        steps: [
            "Cocina papa y cebolla en agua.",
            "Procesa hasta obtener crema.",
            "Agrega leche y calienta.",
        ],
    },
    {
        id: "tostada-huevo-palta",
        title: "Tostada de huevo y palta",
        ingredients: ["pan", "huevo", "palta"],
        steps: [
            "Tuesta pan hasta dorar.",
            "Agrega palta molida.",
            "Corona con huevo cocido.",
        ],
    },
    {
        id: "rollitos-pavo-queso",
        title: "Rollitos de pavo y queso",
        ingredients: ["pavo", "queso", "pepino"],
        steps: [
            "Corta pepino en bastones.",
            "Envuelve con pavo y queso.",
            "Sirve frio como snack.",
        ],
    },
    {
        id: "ensalada-pepino-yogur",
        title: "Ensalada de pepino y yogur",
        ingredients: ["pepino", "yogur", "limon"],
        steps: [
            "Corta pepino en rodajas finas.",
            "Mezcla yogur con jugo de limon.",
            "Integra y sirve frio.",
        ],
    },
    {
        id: "plato-frio-queso-tomate",
        title: "Plato frio de queso y tomate",
        ingredients: ["queso", "tomate", "aceite"],
        steps: [
            "Corta queso y tomate en laminas.",
            "Ordena en un plato.",
            "Agrega aceite y sal para terminar.",
        ],
    },
];
