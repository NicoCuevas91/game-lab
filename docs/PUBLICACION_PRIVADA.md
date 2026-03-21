# Publicacion privada (Git y GitHub)

Esta guia deja el proyecto listo para subirlo a un repositorio privado.

## 1) Inicializar repositorio local

```bash
git init -b main
```

Si tu version de Git no acepta `-b`, usa:

```bash
git init
git branch -M main
```

## 2) Revisar archivos incluidos

Ya existe `.gitignore` para excluir `node_modules`, `dist` y logs.

Verifica estado:

```bash
git status
```

## 3) Primer commit

```bash
git add .
git commit -m "docs: documentacion inicial y estructura base"
```

## 4) Crear repositorio privado en GitHub

### Opcion A: Desde la web

1. Crear nuevo repositorio en GitHub.
2. Marcar visibilidad como **Private**.
3. No inicializar con README (porque ya existe localmente).

### Opcion B: Con GitHub CLI

```bash
gh repo create <nombre-repo> --private --source=. --remote=origin --push
```

## 5) Conectar remoto y subir (si usaste la web)

```bash
git remote add origin https://github.com/<usuario>/<nombre-repo>.git
git push -u origin main
```

## 6) Validar privacidad

En GitHub, revisar:
- Settings > General > Danger Zone (visibilidad)
- En la cabecera del repo debe figurar `Private`

## Seguridad basica recomendada

- No subir credenciales ni archivos `.env` reales.
- Activar autenticacion de dos factores en GitHub.
- Revisar el historial antes de publicar (`git log --oneline`).
