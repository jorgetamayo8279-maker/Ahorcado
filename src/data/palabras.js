// Banco único: las tildes, la diéresis y la Ñ se conservan para mostrarlas.
export const PALABRAS = [
  { palabra: 'CALI', categoria: 'capitales', pista: 'Capital del Valle del Cauca', nivel: 'facil' },
  { palabra: 'TUNJA', categoria: 'capitales', pista: 'Capital de Boyacá', nivel: 'facil' },
  { palabra: 'PASTO', categoria: 'capitales', pista: 'Capital de Nariño', nivel: 'facil' },
  { palabra: 'YOPAL', categoria: 'capitales', pista: 'Capital de Casanare', nivel: 'facil' },
  { palabra: 'MITÚ', categoria: 'capitales', pista: 'Capital del Vaupés', nivel: 'facil' },
  { palabra: 'MEDELLÍN', categoria: 'capitales', pista: 'Capital de Antioquia', nivel: 'medio' },
  { palabra: 'MONTERÍA', categoria: 'capitales', pista: 'Capital de Córdoba', nivel: 'medio' },
  { palabra: 'SINCELEJO', categoria: 'capitales', pista: 'Capital de Sucre', nivel: 'medio' },
  { palabra: 'CARTAGENA', categoria: 'capitales', pista: 'Capital de Bolívar, famosa por su ciudad amurallada', nivel: 'medio' },
  { palabra: 'MANIZALES', categoria: 'capitales', pista: 'Capital de Caldas', nivel: 'medio' },
  { palabra: 'BUCARAMANGA', categoria: 'capitales', pista: 'Capital de Santander, conocida como la Ciudad Bonita', nivel: 'dificil' },
  { palabra: 'BARRANQUILLA', categoria: 'capitales', pista: 'Capital del Atlántico, reconocida por su carnaval', nivel: 'dificil' },
  { palabra: 'VILLAVICENCIO', categoria: 'capitales', pista: 'Capital del Meta, puerta de los Llanos Orientales', nivel: 'dificil' },
  { palabra: 'VALLEDUPAR', categoria: 'capitales', pista: 'Capital del Cesar, reconocida por el vallenato', nivel: 'dificil' },
  { palabra: 'SAN JOSÉ DEL GUAVIARE', categoria: 'capitales', pista: 'Capital del departamento del Guaviare', nivel: 'dificil' },

  { palabra: 'JAGUAR', categoria: 'animales', pista: 'Gran felino americano de pelaje con manchas en forma de roseta', nivel: 'facil' },
  { palabra: 'CÓNDOR', categoria: 'animales', pista: 'Ave de los Andes que aparece en el escudo de Colombia', nivel: 'facil' },
  { palabra: 'TUCÁN', categoria: 'animales', pista: 'Ave tropical con un pico grande y colorido', nivel: 'facil' },
  { palabra: 'IGUANA', categoria: 'animales', pista: 'Reptil con una cresta de espinas que suele descansar en árboles', nivel: 'facil' },
  { palabra: 'PUMA', categoria: 'animales', pista: 'Felino americano de pelaje uniforme, también llamado león de montaña', nivel: 'facil' },
  { palabra: 'CHIGÜIRO', categoria: 'animales', pista: 'El roedor más grande del mundo, común en los Llanos', nivel: 'medio' },
  { palabra: 'ARMADILLO', categoria: 'animales', pista: 'Mamífero protegido por un caparazón de placas', nivel: 'medio' },
  { palabra: 'GUACAMAYA', categoria: 'animales', pista: 'Ave de la familia de los loros con cola larga y plumaje colorido', nivel: 'medio' },
  { palabra: 'ZARIGÜEYA', categoria: 'animales', pista: 'Marsupial que lleva sus crías en una bolsa y suele salir de noche', nivel: 'medio' },
  { palabra: 'COLIBRÍ', categoria: 'animales', pista: 'Ave pequeña que puede mantenerse suspendida mientras toma néctar', nivel: 'medio' },
  { palabra: 'OSO DE ANTEOJOS', categoria: 'animales', pista: 'Oso andino con marcas claras alrededor de los ojos', nivel: 'dificil' },
  { palabra: 'MONO AULLADOR', categoria: 'animales', pista: 'Primate cuyo potente llamado se escucha a gran distancia', nivel: 'dificil' },
  { palabra: 'CAIMÁN AGUJA', categoria: 'animales', pista: 'Reptil de hocico alargado que habita costas y ríos tropicales', nivel: 'dificil' },
  { palabra: 'TORTUGA CAREY', categoria: 'animales', pista: 'Tortuga marina de pico curvo que habita arrecifes', nivel: 'dificil' },
  { palabra: 'DELFÍN ROSADO', categoria: 'animales', pista: 'Mamífero acuático de los ríos amazónicos con tonalidad rosada', nivel: 'dificil' },

  { palabra: 'LULO', categoria: 'frutas', pista: 'Fruta ácida de pulpa verde muy usada en jugos', nivel: 'facil' },
  { palabra: 'PIÑA', categoria: 'frutas', pista: 'Fruta tropical con corona de hojas y cáscara de escamas', nivel: 'facil' },
  { palabra: 'MANGO', categoria: 'frutas', pista: 'Fruta tropical con una semilla grande y pulpa amarilla o anaranjada', nivel: 'facil' },
  { palabra: 'MORA', categoria: 'frutas', pista: 'Fruta de pequeños granos oscuros usada en jugos y mermeladas', nivel: 'facil' },
  { palabra: 'PAPAYA', categoria: 'frutas', pista: 'Fruta de pulpa anaranjada con numerosas semillas negras en el centro', nivel: 'facil' },
  { palabra: 'GUANÁBANA', categoria: 'frutas', pista: 'Fruta verde con espinas blandas y pulpa blanca', nivel: 'medio' },
  { palabra: 'MARACUYÁ', categoria: 'frutas', pista: 'Fruta de cáscara amarilla y pulpa ácida con muchas semillas', nivel: 'medio' },
  { palabra: 'GUAYABA', categoria: 'frutas', pista: 'Fruta aromática con muchas semillas pequeñas, usada para hacer bocadillo', nivel: 'medio' },
  { palabra: 'PITAHAYA', categoria: 'frutas', pista: 'Fruta de cáscara amarilla o roja y pulpa con pequeñas semillas negras', nivel: 'medio' },
  { palabra: 'MANDARINA', categoria: 'frutas', pista: 'Cítrico de cáscara fácil de retirar y gajos dulces', nivel: 'medio' },
  { palabra: 'GRANADILLA', categoria: 'frutas', pista: 'Fruta de cáscara anaranjada dura y semillas rodeadas de pulpa dulce', nivel: 'dificil' },
  { palabra: 'TOMATE DE ÁRBOL', categoria: 'frutas', pista: 'Fruta andina ovalada de sabor ácido, usada en jugos', nivel: 'dificil' },
  { palabra: 'MANGO DE AZÚCAR', categoria: 'frutas', pista: 'Variedad pequeña de mango de pulpa dulce, popular en el Caribe colombiano', nivel: 'dificil' },
  { palabra: 'NARANJA TANGELO', categoria: 'frutas', pista: 'Cítrico híbrido de pulpa jugosa y cáscara anaranjada', nivel: 'dificil' },
  { palabra: 'ZAPOTE COSTEÑO', categoria: 'frutas', pista: 'Fruta tropical de cáscara café y pulpa anaranjada consumida en la costa', nivel: 'dificil' },

  { palabra: 'AREPA', categoria: 'comidas', pista: 'Preparación redonda de masa de maíz que se asa o se fríe', nivel: 'facil' },
  { palabra: 'AJIACO', categoria: 'comidas', pista: 'Sopa bogotana de pollo, papas y guascas', nivel: 'facil' },
  { palabra: 'TAMAL', categoria: 'comidas', pista: 'Masa con relleno que se cocina envuelta en hojas', nivel: 'facil' },
  { palabra: 'OBLEA', categoria: 'comidas', pista: 'Dulce de láminas delgadas que suele rellenarse con arequipe', nivel: 'facil' },
  { palabra: 'MUTE', categoria: 'comidas', pista: 'Sopa santandereana con maíz y carnes', nivel: 'facil' },
  { palabra: 'SANCOCHO', categoria: 'comidas', pista: 'Sopa tradicional con carnes, yuca, plátano y otros tubérculos', nivel: 'medio' },
  { palabra: 'EMPANADA', categoria: 'comidas', pista: 'Masa rellena que suele freírse y servirse con ají', nivel: 'medio' },
  { palabra: 'BUÑUELO', categoria: 'comidas', pista: 'Bola frita de masa con queso, tradicional en Navidad', nivel: 'medio' },
  { palabra: 'CHANGUA', categoria: 'comidas', pista: 'Caldo de leche y huevo típico del altiplano cundiboyacense', nivel: 'medio' },
  { palabra: 'NATILLA', categoria: 'comidas', pista: 'Postre firme de leche y fécula, tradicional en Navidad', nivel: 'medio' },
  { palabra: 'BANDEJA PAISA', categoria: 'comidas', pista: 'Plato antioqueño con fríjoles, arroz, chicharrón y otros acompañamientos', nivel: 'dificil' },
  { palabra: 'ARROZ CON COCO', categoria: 'comidas', pista: 'Acompañamiento de la costa Caribe preparado con un fruto tropical', nivel: 'dificil' },
  { palabra: 'AREPA DE HUEVO', categoria: 'comidas', pista: 'Preparación costeña de maíz frita con un huevo en su interior', nivel: 'dificil' },
  { palabra: 'SOBREBARRIGA', categoria: 'comidas', pista: 'Corte de res que suele servirse en salsa criolla', nivel: 'dificil' },
  { palabra: 'LECHONA TOLIMENSE', categoria: 'comidas', pista: 'Cerdo relleno con arvejas y carne, típico del Tolima', nivel: 'dificil' },
];

export const niveles = [
  { id: 'facil', nombre: 'FÁCIL', descripcion: 'Ideal para comenzar' },
  { id: 'medio', nombre: 'MEDIO', descripcion: 'Un reto equilibrado' },
  { id: 'dificil', nombre: 'DIFÍCIL', descripcion: 'Para expertos' },
];

// Conserva las listas de textos por nivel que ofrece la interfaz pública actual.
export const categorias = [
  { id: 'capitales', nombre: 'Capitales de Colombia', icono: '🏛️' },
  { id: 'animales', nombre: 'Animales de Colombia', icono: '🐾' },
  { id: 'frutas', nombre: 'Frutas', icono: '🍍' },
  { id: 'comidas', nombre: 'Comidas típicas', icono: '🍲' },
].map((categoria) => ({
  ...categoria,
  palabras: Object.fromEntries(
    niveles.map(({ id }) => [
      id,
      PALABRAS.filter(
        (registro) => registro.categoria === categoria.id && registro.nivel === id
      ).map((registro) => registro.palabra),
    ])
  ),
}));

export function obtenerCategoriaPorId(categoriaId) {
  return categorias.find((categoria) => categoria.id === categoriaId);
}

export function obtenerPalabraAleatoria(categoriaId, nivel) {
  const categoria = obtenerCategoriaPorId(categoriaId);

  if (!categoria || !categoria.palabras[nivel]) {
    return null;
  }

  const lista = categoria.palabras[nivel];
  const indiceAleatorio = Math.floor(Math.random() * lista.length);

  return lista[indiceAleatorio];
}
