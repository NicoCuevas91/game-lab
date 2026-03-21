# Game Lab

Aplicacion web construida con React + Vite para simular juegos aleatorios simples:

- Cara o Cruz
- Dado de 6 caras
- Dado de 20 caras

## Objetivo

Ofrecer una interfaz rapida y visual para lanzar simulaciones con historial de resultados y animaciones.

## Stack tecnologico

- React 19
- Vite 7
- ESLint 9
- CSS plano (sin framework de estilos)

## Estructura del proyecto

```text
game-lab/
	public/
	src/
		assets/
		components/
			Coin.jsx
			Dice6.jsx
			Dice20.jsx
			Menu.jsx
			hooks/
				useCoinGame.js
				useDice6Game.js
				useDice20Game.js
		styles/
				components/
					coin.css
					dice6.css
					dice20.css
					menu.css
		App.jsx
		index.css
		main.jsx
	index.html
	package.json
	vite.config.js
	eslint.config.js
```

## Flujo funcional

1. El usuario entra al menu principal.
2. Selecciona uno de los tres juegos.
3. Se ejecuta una animacion y luego se muestra el resultado final.
4. Se guarda historial limitado por juego.
5. El usuario puede volver al menu.

## Comportamiento por juego

- Cara o Cruz (`Coin.jsx`)
	- Duracion del giro: 5 segundos.
	- Contador regresivo durante la animacion.
	- Historial de ultimos 10 resultados.

- Dado de 6 (`Dice6.jsx`)
	- Duracion del lanzamiento: 3 segundos.
	- Simulacion visual de numeros durante la tirada.
	- Historial de ultimos 10 resultados.

- Dado de 20 (`Dice20.jsx`)
	- Animacion rapida por intervalos.
	- Resaltado visual al obtener 20.
	- Historial de ultimos 20 resultados.

## Requisitos

- Node.js 20 o superior recomendado
- npm 10 o superior

## Instalacion y uso

```bash
npm install
npm run dev
```

## Scripts disponibles

- `npm run dev`: entorno de desarrollo
- `npm run build`: compilacion para produccion
- `npm run preview`: vista previa de build
- `npm run lint`: analisis estatico con ESLint

## Documentacion adicional

- Arquitectura y decisiones: `docs/ARQUITECTURA.md`
- Guia para publicacion privada con Git/GitHub: `docs/PUBLICACION_PRIVADA.md`

## Notas de mantenimiento

- La logica de cada juego esta separada en hooks para facilitar mantenimiento y pruebas.
- Los estilos estan separados por componente para evitar un CSS monolitico.
