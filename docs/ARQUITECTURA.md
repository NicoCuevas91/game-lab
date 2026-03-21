# Arquitectura del proyecto

## Resumen

Game Lab es una SPA (Single Page Application) en React con arquitectura simple por componentes y estado local. No usa backend ni persistencia remota; toda la logica de juego se ejecuta en cliente.

## Tipo de arquitectura

- Frontend monolitico ligero
- Composicion por componentes
- Estado local con hooks (`useState`, `useEffect`)

## Capas actuales

1. Presentacion
- Componentes React y estilos CSS.
- Manejo de vistas en `App.jsx`.

2. Logica de juego
- Cada juego encapsula su logica de azar, animacion e historial en hooks dedicados.
- Hooks: `useCoinGame`, `useDice6Game`, `useDice20Game`.
- Componentes: `Coin.jsx`, `Dice6.jsx`, `Dice20.jsx`.

3. Recursos estaticos
- Imagenes de moneda en `src/assets`.

## Enrutamiento

No existe enrutamiento con URL. La navegacion se controla con estado en `App.jsx` mediante `currentGame`.

## Estado y datos

- Estado efimero por componente.
- Historial mantenido en memoria (se reinicia al recargar pagina).
- No hay almacenamiento local (`localStorage`) ni base de datos.

## Estilos

- Estilos globales y compartidos en `src/index.css`.
- Estilos por componente en `src/styles/components`.

## Ventajas del enfoque actual

- Baja complejidad.
- Rapidez de desarrollo.
- Facil de entender para proyectos educativos o demostrativos.

## Riesgos tecnicos y mejoras recomendadas

1. Escalabilidad de navegacion
- Al crecer el numero de juegos, conviene migrar a `react-router`.

2. Reutilizacion de logica
- Se extrajo la logica principal de cada juego a hooks dedicados.
- Queda como mejora futura extraer hooks mas genericos (`useRollHistory`, `useCountdown`).

3. Organizacion de estilos
- Los estilos ya estan divididos por modulo (`menu.css`, `coin.css`, etc.).
- Como mejora futura, se puede migrar a CSS Modules para encapsular clases.

4. Calidad de codigo
- Se elimino el archivo residual `Coin 0 0 0.jsx` para evitar confusiones.

## Propuesta de evolucion (opcional)

- Introducir carpeta `src/games` con un contrato comun para cada juego.
- Definir configuracion de juegos en un solo lugar (nombre, limite historial, duracion).
- Agregar pruebas de componentes con Vitest + Testing Library.
