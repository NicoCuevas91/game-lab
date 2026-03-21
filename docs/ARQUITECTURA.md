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
- Cada juego encapsula su logica de azar, animacion e historial.
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

- Estilos centralizados en `src/styles/app.css`.
- `src/index.css` esta casi vacio y puede mantenerse para estilos globales futuros.

## Ventajas del enfoque actual

- Baja complejidad.
- Rapidez de desarrollo.
- Facil de entender para proyectos educativos o demostrativos.

## Riesgos tecnicos y mejoras recomendadas

1. Escalabilidad de navegacion
- Al crecer el numero de juegos, conviene migrar a `react-router`.

2. Reutilizacion de logica
- Las estructuras de historial y animacion se repiten entre componentes.
- Conviene extraer hooks reutilizables (`useRollHistory`, `useCountdown`).

3. Organizacion de estilos
- `app.css` concentra muchos estilos.
- Conviene dividir por modulo (`menu.css`, `coin.css`, etc.) o usar CSS Modules.

4. Calidad de codigo
- Hay un archivo probable de respaldo: `Coin 0 0 0.jsx`.
- Se recomienda eliminar o mover a una carpeta de backup fuera de `src/components`.

## Propuesta de evolucion (opcional)

- Introducir carpeta `src/games` con un contrato comun para cada juego.
- Definir configuracion de juegos en un solo lugar (nombre, limite historial, duracion).
- Agregar pruebas de componentes con Vitest + Testing Library.
