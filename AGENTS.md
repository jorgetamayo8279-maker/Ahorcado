# El Ahorcado Móvil

Aplicación móvil. Priorizar patrones mobile-first, rendimiento y compatibilidad entre plataformas.

## Tecnología

- React Native.
- Expo.
- JavaScript.
- React Navigation con Native Stack.
- StyleSheet de React Native.
- AsyncStorage se incorporará posteriormente para persistencia, previa autorización para instalar la dependencia.

## Arquitectura obligatoria

```text
src/navigation/
  AppNavigator.js

src/screens/
  InicioScreen.js
  InstruccionesScreen.js
  CategoriaScreen.js
  JuegoScreen.js
  EstadisticasScreen.js
  ConfiguracionScreen.js

src/components/
  Ahorcado.js
  PalabraOculta.js
  Teclado.js
  Marcador.js
  ModalResultado.js

src/hooks/
  useJuego.js

src/data/
  palabras.js

src/storage/
  almacenamiento.js

src/theme/
  colors.js
```

## Reglas de arquitectura

- No reconstruir el proyecto.
- No utilizar Expo Router, rutas basadas en archivos ni otra arquitectura de navegación.
- No crear src/app/.
- No renombrar las carpetas o archivos existentes sin autorización.
- Mantener archivos .js aunque contengan JSX. No crear archivos .jsx.
- No utilizar CSS web. Usar StyleSheet de React Native.
- AppNavigator.js controla la navegación mediante React Navigation con Native Stack.
- useJuego.js concentra la lógica del juego.
- palabras.js contiene el banco de palabras.
- almacenamiento.js concentra la persistencia.
- colors.js concentra colores y temas.
- JuegoScreen.js orquesta la partida, pero no debe contener toda la lógica.
- Los componentes visuales deben permanecer separados y reutilizables.
- Resultado se implementará mediante ModalResultado.js dentro del flujo de Juego, sin una pantalla independiente.
- Splash se gestiona mediante Expo/app.json y assets, no como un Screen.js.

## Dependencias y forma de trabajo

- No instalar nuevas dependencias sin autorización previa.
- No modificar package.json salvo autorización.
- Trabajar por módulos y probar cada módulo antes de avanzar.
- Ejecutar las comprobaciones disponibles y pertinentes a cada módulo. No instalar herramientas ni generar configuración sin autorización para habilitar lint o comprobaciones de tipos.
- Antes de cada commit, revisar git status y git diff.
- No hacer commit ni push sin autorización expresa.

## Documentación de Expo y React Native

Expo puede introducir cambios incompatibles entre SDK. Antes de escribir código que utilice APIs de Expo, EAS o React Native:

1. Leer la versión mayor del paquete expo en package.json.
2. Consultar la documentación correspondiente: https://docs.expo.dev/versions/v<major>.0.0/
3. Para otros temas de Expo, consultar https://docs.expo.dev/llms.txt y seguir sus enlaces a la documentación específica. No asumir APIs de memoria.

## Comandos

Usar bunx en lugar de npx si existe bun.lock. No ejecutar comandos que instalen dependencias o modifiquen su configuración sin autorización.

```bash
npx expo start              # iniciar el servidor de desarrollo
npx expo-doctor             # diagnosticar dependencias y configuración
npx expo install <package>  # solo con autorización; resuelve versiones compatibles con el SDK
npx expo install --fix      # solo con autorización para modificar dependencias
```

Si lint o las comprobaciones de tipos ya están configurados, ejecutarlos cuando correspondan al cambio. El proyecto mantiene JavaScript; no migrarlo a TypeScript para habilitar estas comprobaciones.

## Configuración nativa y EAS

- Si ios/ y android/ no existen, usar Continuous Native Generation: configurar el comportamiento nativo mediante app.json y config plugins, sin crear ni editar esas carpetas a mano.
- Expo Go solo incluye sus módulos nativos integrados. Tras incorporar una biblioteca nativa autorizada que no esté incluida, utilizar una development build.
- Para builds, firma, envío y actualizaciones OTA autorizados, utilizar EAS. Ejecutar la CLI mediante bunx eas-cli en proyectos Bun o npx eas-cli@latest en los demás.
- Consultar https://docs.expo.dev/eas/index.md antes de trabajar con EAS.
