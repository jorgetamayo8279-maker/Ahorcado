export const categorias = [
  {
    id: 'animales',
    nombre: 'Animales',
    icono: '🐾',
    palabras: {
      facil: [
        'GATO',
        'PERRO',
        'PATO',
        'OSO',
        'LEON',
      ],
      medio: [
        'JIRAFA',
        'DELFIN',
        'TORTUGA',
        'CONEJO',
        'PANTERA',
      ],
      dificil: [
        'COCODRILO',
        'RINOCERONTE',
        'HIPOPOTAMO',
        'ORNITORRINCO',
        'CHIMPANCE',
      ],
    },
  },

  {
    id: 'tecnologia',
    nombre: 'Tecnología',
    icono: '💻',
    palabras: {
      facil: [
        'MOUSE',
        'WIFI',
        'DATOS',
        'RED',
        'APP',
      ],
      medio: [
        'CODIGO',
        'ROUTER',
        'SERVIDOR',
        'ANDROID',
        'MEMORIA',
      ],
      dificil: [
        'PROGRAMACION',
        'CIBERSEGURIDAD',
        'INTELIGENCIA',
        'ALGORITMO',
        'COMPUTADORA',
      ],
    },
  },

  {
    id: 'paises',
    nombre: 'Países',
    icono: '🌎',
    palabras: {
      facil: [
        'CHILE',
        'PERU',
        'CHINA',
        'INDIA',
        'CUBA',
      ],
      medio: [
        'COLOMBIA',
        'ECUADOR',
        'CANADA',
        'MEXICO',
        'PANAMA',
      ],
      dificil: [
        'ARGENTINA',
        'VENEZUELA',
        'GUATEMALA',
        'AUSTRALIA',
        'NICARAGUA',
      ],
    },
  },

  {
    id: 'deportes',
    nombre: 'Deportes',
    icono: '🏆',
    palabras: {
      facil: [
        'GOLF',
        'TENIS',
        'RUGBY',
        'BOXEO',
        'FUTBOL',
      ],
      medio: [
        'CICLISMO',
        'NATACION',
        'BEISBOL',
        'PATINAJE',
        'ESGRIMA',
      ],
      dificil: [
        'BALONCESTO',
        'AUTOMOVILISMO',
        'HALTEROFILIA',
        'MOTOCICLISMO',
        'TRIATLON',
      ],
    },
  },
];

export const niveles = [
  {
    id: 'facil',
    nombre: 'FÁCIL',
    descripcion: 'Ideal para comenzar',
  },
  {
    id: 'medio',
    nombre: 'MEDIO',
    descripcion: 'Un reto equilibrado',
  },
  {
    id: 'dificil',
    nombre: 'DIFÍCIL',
    descripcion: 'Para expertos',
  },
];

export function obtenerCategoriaPorId(categoriaId) {
  return categorias.find(
    (categoria) => categoria.id === categoriaId
  );
}

export function obtenerPalabraAleatoria(categoriaId, nivel) {
  const categoria = obtenerCategoriaPorId(categoriaId);

  if (!categoria || !categoria.palabras[nivel]) {
    return null;
  }

  const lista = categoria.palabras[nivel];

  const indiceAleatorio = Math.floor(
    Math.random() * lista.length
  );

  return lista[indiceAleatorio];
}
