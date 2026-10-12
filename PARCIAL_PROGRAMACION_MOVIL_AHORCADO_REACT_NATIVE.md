# El Ahorcado Móvil – App en React Native
## Parcial – Proyecto de Programación Móvil

> **Nota operativa añadida por solicitud del usuario:** este archivo es una transcripción estructurada en Markdown del documento fuente. Debe utilizarse como referencia normativa del proyecto. No deben cambiarse reglas, requisitos, estructura, entregables, casos de prueba ni alcance sin autorización expresa. En caso de duda o discrepancia, prevalece el PDF original.

| Dato | Información |
|---|---|
| Estudiante | [Nombre del estudiante] |
| Institución | Uniciencia |
| Asignatura | Programación Móvil |
| Docente | Carlos Carrascal |
| Tipo de entrega | Parcial basado en proyecto |
| Fecha | Octubre de 2026 |

# 1. Descripción del Proyecto

El Ahorcado Móvil es una aplicación para celular desarrollada con React Native y Expo que recrea el clásico juego de adivinar palabras letra por letra. El jugador escribe su nombre, elige una categoría y un nivel de dificultad, y debe descubrir la palabra oculta tocando las letras de un teclado en pantalla antes de que se complete el dibujo del ahorcado. Cada letra incorrecta agrega una parte al dibujo; si se completan seis errores, la partida se pierde.

El banco de palabras tiene una temática colombiana (capitales, animales, frutas y comidas típicas). La aplicación incluye pistas, puntuación, cronómetro en el nivel difícil, vibración y sonidos al acertar o fallar, y estadísticas guardadas en el propio dispositivo con AsyncStorage. El proyecto inicia con el diseño de las pantallas en Figma o MockFlow y termina con un archivo instalable (APK) para Android.

# 2. Objetivos

## 2.1 Objetivo General

Diseñar y desarrollar una aplicación móvil del juego del ahorcado con React Native y Expo, partiendo de un prototipo elaborado en Figma o MockFlow, que aplique componentes, estado, navegación entre pantallas, almacenamiento local y funciones nativas del dispositivo, y que se distribuya como un archivo instalable para Android.

## 2.2 Objetivos Específicos

- Diseñar los wireframes, los mockups y un prototipo navegable de todas las pantallas de la aplicación en Figma o MockFlow.
- Crear y configurar un proyecto de React Native con Expo, incluyendo el nombre, el ícono y la pantalla de carga (splash) de la aplicación.
- Construir la interfaz con componentes reutilizables (View, Text, Pressable, FlatList, Modal) y estilos con StyleSheet y Flexbox.
- Implementar la navegación entre pantallas con React Navigation.
- Manejar el estado del juego con los hooks useState, useEffect y, de forma opcional, useReducer o un hook personalizado.
- Dibujar el ahorcado de forma progresiva con react-native-svg.
- Guardar las estadísticas y los mejores puntajes con AsyncStorage.
- Usar funciones del dispositivo: vibración (expo-haptics) y sonidos.
- Publicar el código en GitHub y generar el APK con EAS Build.

# 3. Problema a Resolver y Justificación

Muchos juegos de palabras disponibles en las tiendas de aplicaciones están llenos de publicidad, piden permisos innecesarios, requieren conexión permanente a internet y no tienen contenido relacionado con Colombia. Al mismo tiempo, el celular es el dispositivo que más usan los estudiantes, por lo que es un medio ideal para juegos educativos.

El Ahorcado Móvil ofrece una alternativa ligera, sin publicidad, que funciona sin conexión y refuerza el vocabulario y el conocimiento de Colombia. Además, el proyecto permite al estudiante recorrer el ciclo completo de una aplicación móvil: diseño de la experiencia de usuario, desarrollo con un framework multiplataforma, uso de funciones nativas, control de versiones y generación de un instalable.

# 4. Alcance

## 4.1 Incluye

- Diseño completo de la aplicación en Figma o MockFlow.
- Juego para un solo jugador que se identifica solo con su nombre.
- Cuatro categorías de palabras y tres niveles de dificultad.
- Teclado en pantalla de la A a la Z, incluida la Ñ.
- Dibujo progresivo del ahorcado en seis etapas.
- Pistas, puntuación y cronómetro en el nivel difícil.
- Vibración y sonidos al acertar, fallar, ganar o perder.
- Estadísticas y top 10 de puntajes guardados en el dispositivo.
- Tema claro y oscuro.
- APK instalable para Android.

## 4.2 No incluye

- Registro de usuarios ni inicio de sesión.
- Servidor, API o base de datos externa.
- Publicación en Google Play o App Store.
- Modo multijugador en línea.

# 5. Tecnologías y Herramientas

| Tecnología / Herramienta | Uso dentro del proyecto |
|---|---|
| Figma o MockFlow | Diseño de wireframes, mockups, guía de estilos y prototipo navegable. |
| React Native | Framework para construir la interfaz nativa con componentes de JavaScript. |
| Expo (SDK más reciente) | Creación, ejecución y configuración del proyecto sin necesidad de Android Studio. |
| JavaScript (ES6+) | Lógica del juego, hooks, arreglos y objetos. Se permite TypeScript de forma opcional. |
| React Navigation | Navegación entre pantallas (stack y, de forma opcional, tabs). |
| react-native-svg | Dibujo del ahorcado con figuras vectoriales. |
| AsyncStorage | Almacenamiento local de estadísticas, puntajes y configuración. |
| expo-haptics y expo-audio (o expo-av) | Vibración y efectos de sonido. |
| Expo Go | Pruebas de la aplicación en un celular físico escaneando un código QR. |
| EAS Build | Generación del archivo APK instalable para Android. |
| Git y GitHub | Control de versiones y alojamiento del código en un repositorio público. |
| Visual Studio Code | Editor de código. |

# 6. Reglas del Juego

1. El jugador escribe su nombre en la pantalla de inicio.
2. Elige una categoría (Capitales de Colombia, Animales de Colombia, Frutas, Comidas típicas o Aleatoria) y un nivel de dificultad.
3. La aplicación elige una palabra al azar y la muestra oculta con guiones, uno por cada letra. En palabras compuestas (por ejemplo, SANTA MARTA) los espacios se muestran desde el inicio.
4. El jugador toca una letra del teclado en pantalla. Cada letra solo puede usarse una vez; después de usarla, su botón se deshabilita y cambia de color.
5. Si la letra está en la palabra, se revela en todas las posiciones donde aparece, se suman puntos y el celular hace una vibración corta.
6. Si la letra no está, se agrega una parte al dibujo (cabeza, cuerpo, brazo izquierdo, brazo derecho, pierna izquierda y pierna derecha) y el celular hace una vibración de error.
7. Las tildes no cuentan como letras distintas: tocar la «O» revela también la «Ó».
8. El jugador gana si descubre la palabra antes de cometer 6 errores; pierde si comete 6 errores o, en el nivel difícil, si se agota el tiempo. En ambos casos se muestra la palabra completa.

## 6.1 Niveles de Dificultad

| Nivel | Longitud de palabra | Pistas | Tiempo | Multiplicador |
|---|---:|---:|---|---:|
| Fácil | 4 a 6 letras | 2 pistas | Sin límite | x1 |
| Medio | 7 a 9 letras | 1 pista | Sin límite | x2 |
| Difícil | 10 o más letras | Sin pistas | 90 segundos | x3 |

La primera pista muestra una descripción de la palabra y la segunda revela una letra al azar.

## 6.2 Sistema de Puntuación

| Acción | Puntos |
|---|---:|
| Letra correcta (por cada aparición) | +10 |
| Letra incorrecta | -5 |
| Usar una pista | -15 |
| Ganar la partida | +50 + (vidas restantes x 10) |
| Puntaje final | Subtotal x multiplicador del nivel |

## 6.3 Banco de Palabras

El banco debe tener mínimo 60 palabras, 15 por categoría, con palabras de los tres niveles, y guardarse en el archivo `src/data/palabras.js`. Cada palabra incluye su categoría y una pista.

Ejemplos:

| Categoría | Palabra | Pista | Nivel |
|---|---|---|---|
| Capitales de Colombia | TUNJA | Capital de Boyacá | Fácil |
| Capitales de Colombia | BUCARAMANGA | Capital de Santander, la «Ciudad Bonita» | Difícil |
| Animales de Colombia | CHIGÜIRO | El roedor más grande del mundo | Medio |
| Frutas | LULO | Fruta ácida muy usada en jugos | Fácil |
| Frutas | GUANÁBANA | Fruta verde con espinas blandas y pulpa blanca | Medio |
| Comidas típicas | BANDEJA PAISA | Plato típico de Antioquia | Difícil |

# 7. Diseño de la App en Figma o MockFlow

Antes de escribir código, el estudiante debe diseñar la aplicación completa en Figma o en MockFlow. El diseño es un entregable obligatorio y la aplicación final debe corresponder visualmente a él.

## 7.1 Qué debe contener el diseño

- **Wireframes de baja fidelidad:** bocetos en escala de grises de cada pantalla que muestren la distribución de los elementos.
- **Mockups de alta fidelidad:** las mismas pantallas con colores, tipografías, íconos e imágenes definitivas, en un marco de celular (por ejemplo, 360 x 800 o 393 x 852) y orientación vertical.
- **Guía de estilos:** paleta de colores con sus códigos, tipografías y tamaños, estados de las teclas (disponible, acertada, fallada, deshabilitada) y versión en tema oscuro.
- **Ícono y splash:** diseño del ícono de la aplicación y de la pantalla de carga.
- **Prototipo navegable:** pantallas conectadas entre sí para simular el recorrido del jugador.

## 7.2 Pantallas mínimas

| Pantalla | Elementos principales |
|---|---|
| Splash | Logo y nombre de la aplicación mientras carga. |
| Inicio | Campo para el nombre del jugador y botones «Jugar», «Instrucciones», «Estadísticas» y «Configuración». |
| Instrucciones | Reglas del juego, niveles y sistema de puntuación. |
| Categoría y nivel | Tarjetas de las categorías con ícono, opción «Aleatoria» y selector de dificultad. |
| Juego | Dibujo del ahorcado, palabra oculta, categoría, vidas, puntaje, cronómetro, botón de pista y teclado en pantalla. |
| Resultado | Ventana modal de victoria o derrota con la palabra, el puntaje y los botones «Jugar de nuevo» y «Menú». |
| Estadísticas | Partidas jugadas, ganadas, porcentaje de victorias, mejor racha y top 10 de puntajes. |
| Configuración | Activar o desactivar sonido y vibración, cambiar de tema y borrar estadísticas. |

## 7.3 Guía de estilos sugerida

**Colores:** azul oscuro (`#1F3864`) para fondos y encabezados, azul (`#2E74B5`) para botones, verde (`#2E9E5B`) para letras acertadas, rojo (`#D64545`) para letras falladas y gris claro (`#F2F2F2`) para superficies.

**Componentes:** áreas táctiles de mínimo 48 x 48 dp, teclado distribuido en filas que quepa completo en pantallas pequeñas sin desplazarse, y textos de mínimo 14 sp para facilitar la lectura.

# 8. Estructura del Proyecto

El proyecto de Expo debe organizarse de la siguiente manera:

```text
ahorcado-app/
├── App.js                         → Punto de entrada y proveedor de navegación
├── app.json                       → Nombre, ícono, splash y configuración
├── eas.json                       → Configuración de EAS Build (APK)
├── assets/
│   ├── icon.png, splash.png
│   └── sonidos/                   → acierto, error, victoria, derrota
├── src/
│   ├── navigation/
│   │   └── AppNavigator.js        → Stack de pantallas
│   ├── screens/
│   │   ├── InicioScreen.js
│   │   ├── InstruccionesScreen.js
│   │   ├── CategoriaScreen.js
│   │   ├── JuegoScreen.js
│   │   ├── EstadisticasScreen.js
│   │   └── ConfiguracionScreen.js
│   ├── components/
│   │   ├── Ahorcado.js            → Dibujo con react-native-svg
│   │   ├── PalabraOculta.js
│   │   ├── Teclado.js
│   │   ├── Marcador.js            → Vidas, puntaje y cronómetro
│   │   └── ModalResultado.js
│   ├── hooks/
│   │   └── useJuego.js            → Lógica y estado de la partida
│   ├── data/
│   │   └── palabras.js            → Banco de palabras
│   ├── storage/
│   │   └── almacenamiento.js      → Funciones con AsyncStorage
│   └── theme/
│       └── colores.js             → Paleta clara y oscura
├── docs/diseno/                   → Exportación del diseño
└── README.md
```

# 9. Funcionalidades

| Pantalla / Módulo | Funcionalidades |
|---|---|
| Inicio | Ingreso del nombre (obligatorio) y navegación a las demás pantallas. |
| Categoría y nivel | Selección de categoría y dificultad; muestra el mejor puntaje del jugador en esa categoría. |
| Juego | Palabra oculta, teclado táctil, dibujo progresivo, vidas, puntaje, pistas y cronómetro. |
| Resultado | Modal con la palabra, el resultado, el puntaje y opciones para continuar. |
| Estadísticas | Totales, porcentaje de victorias, mejor racha y top 10 de puntajes en una FlatList. |
| Configuración | Sonido, vibración, tema claro u oscuro y borrado de estadísticas con confirmación (Alert). |
| Funciones del dispositivo | Vibración con expo-haptics, sonidos, manejo del botón «atrás» de Android durante la partida. |

# 10. Requerimientos

## 10.1 Requerimientos Funcionales

| Código | Requerimiento | Prioridad |
|---|---|---|
| RF-01 | La app debe solicitar el nombre del jugador y no permitir un nombre vacío. | Alta |
| RF-02 | La app debe permitir seleccionar categoría y nivel de dificultad. | Alta |
| RF-03 | La app debe seleccionar una palabra aleatoria según la categoría y el nivel. | Alta |
| RF-04 | La app debe mostrar la palabra oculta con un guion por letra y los espacios visibles. | Alta |
| RF-05 | La app debe mostrar un teclado en pantalla de la A a la Z, incluida la Ñ. | Alta |
| RF-06 | La app debe validar la letra y revelarla en todas sus posiciones, ignorando las tildes. | Alta |
| RF-07 | La app debe deshabilitar las letras ya usadas y colorearlas según el resultado. | Alta |
| RF-08 | La app debe dibujar una parte del ahorcado por cada error. | Alta |
| RF-09 | La app debe detectar la victoria y la derrota y mostrar el modal de resultado. | Alta |
| RF-10 | La app debe calcular y mostrar el puntaje en tiempo real. | Media |
| RF-11 | La app debe ofrecer pistas según el nivel, descontando puntos. | Media |
| RF-12 | La app debe manejar un cronómetro de 90 segundos en el nivel difícil. | Media |
| RF-13 | La app debe vibrar y reproducir sonidos según la configuración del jugador. | Media |
| RF-14 | La app debe guardar estadísticas, puntajes y configuración con AsyncStorage. | Alta |
| RF-15 | La app debe pedir confirmación si el jugador presiona «atrás» en medio de una partida. | Media |

## 10.2 Requerimientos No Funcionales

| Código | Categoría | Requerimiento |
|---|---|---|
| RNF-01 | Diseño | La aplicación debe corresponder al diseño elaborado en Figma o MockFlow. |
| RNF-02 | Plataforma | Debe funcionar en Android 10 o superior; el funcionamiento en iOS es opcional. |
| RNF-03 | Adaptabilidad | Debe verse correctamente en pantallas desde 5 pulgadas y respetar las zonas seguras (SafeAreaView). |
| RNF-04 | Usabilidad | Áreas táctiles de mínimo 48 x 48 dp y navegación intuitiva. |
| RNF-05 | Rendimiento | La respuesta al tocar una letra debe ser inmediata y sin bloqueos. |
| RNF-06 | Disponibilidad | La aplicación debe funcionar sin conexión a internet. |
| RNF-07 | Mantenibilidad | Código organizado en pantallas, componentes y hooks, con nombres descriptivos y comentarios. |
| RNF-08 | Distribución | Debe generarse un APK instalable con EAS Build. |

# 11. Historias de Usuario

| ID | Como... | Quiero... | Para... |
|---|---|---|---|
| HU-01 | jugador | elegir la categoría y el nivel | jugar sobre temas que me interesan con el reto adecuado. |
| HU-02 | jugador | tocar las letras en un teclado grande | jugar cómodamente con una mano. |
| HU-03 | jugador | sentir una vibración al acertar o fallar | saber el resultado sin mirar fijamente la pantalla. |
| HU-04 | jugador | pedir una pista | no perder cuando no conozco la palabra. |
| HU-05 | jugador | ver mis estadísticas | saber cómo mejoro con el tiempo. |
| HU-06 | jugador | jugar sin internet | usar la app en cualquier lugar. |
| HU-07 | jugador | desactivar el sonido | jugar en lugares silenciosos. |

# 12. Flujo de la Aplicación

1. El jugador abre la aplicación; se muestra el splash mientras se cargan la configuración y las estadísticas desde AsyncStorage.
2. En la pantalla de inicio escribe su nombre y toca «Jugar».
3. Elige categoría y nivel; la app navega a la pantalla de juego y selecciona la palabra.
4. El jugador toca letras; cada toque actualiza el estado, la palabra, el dibujo, el puntaje y activa la vibración o el sonido.
5. La app verifica si hubo victoria, derrota o tiempo agotado; si no, espera la siguiente letra.
6. Al terminar, se muestra el modal de resultado y se guardan las estadísticas.
7. El jugador elige jugar de nuevo (vuelve al paso 3) o volver al menú.

# 13. Modelo de Datos

El estado de la partida y el banco de palabras se representan con objetos de JavaScript:

```js
// Banco de palabras (src/data/palabras.js)
export const PALABRAS = [
  { palabra: 'TUNJA', categoria: 'capitales', pista: 'Capital de Boyacá' },
  { palabra: 'LULO', categoria: 'frutas', pista: 'Fruta ácida para jugos' },
  // ... mínimo 60 palabras
];

// Estado de la partida (src/hooks/useJuego.js)
const estadoInicial = {
  palabra: '',
  pista: '',
  letrasAcertadas: [],
  letrasFalladas: [],
  errores: 0,
  pistasDisponibles: 1,
  puntaje: 0,
  tiempoRestante: null,
  estado: 'jugando'  // 'jugando' | 'ganado' | 'perdido'
};
```

En AsyncStorage se guardan tres claves:

- `@ahorcado_stats`: `{ jugadas, ganadas, perdidas, rachaActual, mejorRacha }`
- `@ahorcado_ranking`: arreglo de `{ nombre, puntaje, categoria, nivel, fecha }`
- `@ahorcado_config`: `{ sonido, vibracion, tema }`

Todas convertidas con `JSON.stringify` y `JSON.parse`.

# 14. Componentes y Funciones Principales

| Elemento | Ubicación | Responsabilidad |
|---|---|---|
| `<Ahorcado errores={n} />` | `components/Ahorcado.js` | Dibuja con SVG las partes correspondientes al número de errores. |
| `<PalabraOculta />` | `components/PalabraOculta.js` | Muestra las letras descubiertas, los guiones y los espacios. |
| `<Teclado onLetra={fn} />` | `components/Teclado.js` | Renderiza las teclas y su estado (disponible, acertada, fallada). |
| `<ModalResultado />` | `components/ModalResultado.js` | Muestra el resultado final con las opciones de continuar. |
| `useJuego(categoria, nivel)` | `hooks/useJuego.js` | Hook personalizado con el estado y las funciones de la partida. |
| `elegirPalabra()` | `hooks/useJuego.js` | Filtra por categoría y longitud, y devuelve una palabra al azar. |
| `procesarLetra(letra)` | `hooks/useJuego.js` | Valida la letra, actualiza aciertos, errores y puntaje. |
| `normalizar(texto)` | `hooks/useJuego.js` | Quita tildes para comparar letras (la Ñ se conserva). |
| `guardarDatos() / leerDatos()` | `storage/almacenamiento.js` | Leen y escriben en AsyncStorage con try/catch. |

# 15. Plan de Pruebas

| ID | Caso de prueba | Resultado esperado |
|---|---|---|
| CP-01 | Tocar «Jugar» sin escribir el nombre. | Aparece un mensaje y no se avanza. |
| CP-02 | Iniciar una partida en la categoría Frutas, nivel fácil. | La palabra oculta tiene entre 4 y 6 letras y pertenece a la categoría. |
| CP-03 | Tocar una letra que existe en la palabra. | La letra se revela en todas sus posiciones, la tecla se pone verde y el celular vibra. |
| CP-04 | Tocar una letra que no existe. | Se dibuja una parte del ahorcado, la tecla se pone roja y baja una vida. |
| CP-05 | Tocar de nuevo una letra usada. | No ocurre nada; la tecla está deshabilitada. |
| CP-06 | Tocar la «U» con la palabra «CHIGÜIRO». | Se revela la «Ü». |
| CP-07 | Jugar con «BANDEJA PAISA». | El espacio aparece desde el inicio y no se adivina. |
| CP-08 | Cometer 6 errores. | Aparece el modal de derrota con la palabra completa. |
| CP-09 | Dejar agotar el tiempo en nivel difícil. | La partida termina como derrota. |
| CP-10 | Presionar el botón «atrás» de Android durante la partida. | Aparece una confirmación antes de salir. |
| CP-11 | Cerrar la aplicación por completo y volver a abrirla. | Las estadísticas, el ranking y la configuración se conservan. |
| CP-12 | Desactivar el sonido y la vibración en Configuración. | El juego deja de sonar y vibrar. |
| CP-13 | Instalar el APK en un celular Android. | La app se instala con su nombre, ícono y splash, y funciona sin internet. |
| CP-14 | Comparar la app con el diseño en Figma o MockFlow. | Las pantallas, colores y componentes coinciden con el diseño. |

# 16. Cronograma de Desarrollo

| Semana | Actividades | Entregable |
|---|---|---|
| 1 | Análisis, wireframes, guía de estilos, ícono y splash en Figma o MockFlow. | Wireframes y guía de estilos |
| 2 | Mockups de alta fidelidad y prototipo navegable. Redacción del banco de palabras. | Diseño completo y banco de palabras |
| 3 | Creación del proyecto con Expo, repositorio, navegación y maquetación de las pantallas. | App navegable sin lógica |
| 4 | Lógica del juego: hook useJuego, teclado, palabra oculta y dibujo SVG. | Juego funcional básico |
| 5 | Pistas, puntaje, cronómetro, vibración, sonidos, AsyncStorage y tema oscuro. | Versión completa |
| 6 | Pruebas en celular físico, ajustes frente al diseño, README, APK con EAS Build y video. | Entrega final |

# 17. Entregables del Parcial

Para la entrega final, el estudiante debe presentar los siguientes cuatro elementos. La falta de cualquiera de ellos se considera una entrega incompleta.

## 17.1 Diseño en Figma o MockFlow

- Enlace al archivo de Figma o MockFlow con permiso de visualización para el docente.
- Debe incluir todo lo solicitado en la sección 7: wireframes, mockups, guía de estilos, ícono, splash y prototipo navegable.
- Exportar las pantallas (PDF o PNG) y guardarlas en la carpeta `docs/diseno` del repositorio.

## 17.2 Código fuente en GitHub

- Repositorio público en GitHub con la estructura de la sección 8.
- Historial con commits frecuentes y mensajes descriptivos que evidencien el desarrollo progresivo. No se acepta un único commit con todo el proyecto.
- No subir la carpeta `node_modules` (debe estar en `.gitignore`).
- `README.md` con: descripción, tecnologías, instrucciones para ejecutar el proyecto con Expo, capturas de pantalla del celular y enlaces al diseño, al APK y al video.

## 17.3 APK instalable

- Generar el APK con EAS Build (perfil «preview» con `buildType` «apk» en `eas.json`).
- Compartir el enlace de descarga que entrega Expo o subir el APK a Google Drive con acceso público, e incluir el enlace en el README.
- La app instalada debe mostrar su propio nombre, ícono y splash, y funcionar correctamente sin conexión a internet.

## 17.4 Video explicativo (máximo 5 minutos)

El estudiante debe grabar un video de máximo 5 minutos explicando el desarrollo del proyecto. El video puede subirse a YouTube (como no listado) o a Google Drive con acceso público, y su enlace debe incluirse en el README.

**Requisito obligatorio:** el estudiante debe aparecer mostrando su rostro con la cámara encendida durante todo el video (por ejemplo, en una ventana pequeña en una esquina mientras comparte pantalla) y explicar con su propia voz. No se aceptan videos sin cámara, con voz generada por inteligencia artificial o narrados por otra persona.

**Demostración en celular real:** la demostración del juego debe hacerse con la app instalada desde el APK en un celular físico, mostrando la pantalla del celular (por ejemplo, con scrcpy o la función de duplicar pantalla) o grabándolo con otra cámara.

Se sugiere la siguiente distribución del tiempo:

| Tiempo | Contenido |
|---|---|
| 0:00 – 0:30 | Presentación del estudiante en cámara (rostro visible), nombre del proyecto y objetivo. |
| 0:30 – 1:15 | Recorrido por el diseño en Figma o MockFlow: guía de estilos, pantallas y prototipo. |
| 1:15 – 2:30 | Demostración de la app instalada en el celular: una partida ganada, una perdida, pista, vibración y estadísticas. |
| 2:30 – 4:15 | Explicación del código: estructura, navegación, hook useJuego, componente Teclado, dibujo SVG y AsyncStorage. |
| 4:15 – 4:40 | Repositorio en GitHub, historial de commits y generación del APK con EAS Build. |
| 4:40 – 5:00 | Dificultades encontradas, cómo se resolvieron y conclusiones. |

## 17.5 Forma de entrega

Enviar a través de la plataforma indicada por el docente un mensaje o documento con los siguientes enlaces:

| Entregable | Enlace |
|---|---|
| Diseño (Figma o MockFlow) | `https://www.figma.com/...` o `https://app.mockflow.com/...` |
| Repositorio en GitHub | `https://github.com/usuario/ahorcado-app` |
| APK (Expo o Google Drive) | `https://expo.dev/artifacts/...` o `https://drive.google.com/...` |
| Video explicativo | `https://youtu.be/...` |

# 18. Mejoras Futuras

- Modo de dos jugadores en el mismo celular: uno escribe la palabra y el otro la adivina.
- Animaciones con Reanimated al revelar letras y dibujar el ahorcado.
- Ranking en línea con un backend y base de datos.
- Notificaciones locales para recordar el reto diario.
- Publicación en Google Play.

# 19. Conclusión

El Ahorcado Móvil permite aplicar de forma práctica los fundamentos de la programación móvil con React Native: diseño de la experiencia de usuario en Figma o MockFlow, construcción de interfaces con componentes y estilos, manejo del estado con hooks, navegación entre pantallas, almacenamiento local, uso de funciones nativas del dispositivo y generación de un instalable para Android. El resultado es una aplicación real, funcional sin conexión y con contenido colombiano, que el estudiante puede instalar y mostrar en su propio celular.
