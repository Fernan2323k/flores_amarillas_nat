# Flores para Natalia 💛

Un regalo digital en forma de experiencia interactiva: un jardín nocturno
que crece frente a los ojos, acompañado de música y un mensaje.

## Cómo ejecutar

```bash
npm install
npm run dev          # desarrollo → http://localhost:5173
npm run build        # build de producción
npm run preview      # vista previa del build
```

## Dónde colocar la música

Coloca tu canción en:

```
public/assets/musica.mp3
```

La experiencia reproduce automáticamente `./assets/musica.mp3` en el momento
en que se pulsa "Descúbrelo ✨" (gesto del usuario → el navegador permite el autoplay).

> Nota: si `musica.mp3` no existe, la página funciona igual y el botón de música
> se oculta. Si no tienes canción aún, puedes iniciar con el archivo de ejemplo
> `public/assets/musica.mp3`.

## Estructura

```
src/
  App.jsx                      # orquesta fases + línea temporal
  index.css                    # estilos de toda la experiencia
  hooks.js                     # useMedia / useReducedMotion
  components/
    SvgDefs.jsx                # gradientes y patrones compartidos (SVG)
    FlowerSVG.jsx              # girasol / flor dorada generada en SVG
    FlowerGarden.jsx           # jardín: capas, parallax, escalonado
    Particles.jsx              # polvo dorado + destellos al hacer clic
    Intro.jsx                  # pantalla inicial + botón
    Message.jsx                # mensajes con fade/blur
    FinalMoment.jsx            # momento final
    MusicPlayer.jsx            # pausar / reanudar / silenciar
```

## Personalizar

- Cambiar tonos de flores: `TONES` en `src/components/FlowerSVG.jsx`.
- Distribución del jardín: `LAYERS` en `src/components/FlowerGarden.jsx`.
- Tiempos del guion: `useEffect` de la línea temporal en `src/App.jsx`.
- Textos: `Intro.jsx`, `Message.jsx` y `FinalMoment.jsx`.