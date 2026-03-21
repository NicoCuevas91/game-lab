import '../styles/components/appMenus.css';

function AppMenus({
  currentGame,
  lastGame,
  preferences,
  onNavigate,
  onRandomGame,
  onResumeLastGame,
  onPreferenceChange,
}) {
  const gameOptions = [
    { id: 'coin', label: 'Cara o Cruz' },
    { id: 'dice6', label: 'Dado 6' },
    { id: 'dice20', label: 'Dado 20' },
  ];

  const currentLabel = gameOptions.find((game) => game.id === currentGame)?.label ?? 'Inicio';
  const lastLabel = gameOptions.find((game) => game.id === lastGame)?.label ?? 'Sin partida previa';

  return (
    <aside className="app-sidebar">
      <div className="sidebar-brand">
        <p className="sidebar-kicker">Game Lab</p>
        <h1>Panel de juego</h1>
        <p className="sidebar-description">
          Navega entre modos, reabre tu ultima partida o lanza un juego al azar.
        </p>
      </div>

      <div className="sidebar-summary">
        <div>
          <span className="sidebar-summary-label">Seccion actual</span>
          <strong>{currentLabel}</strong>
        </div>
        <div>
          <span className="sidebar-summary-label">Ultimo juego</span>
          <strong>{lastLabel}</strong>
        </div>
      </div>

      <div className="sidebar-group">
        <p className="sidebar-group-title">Principal</p>
        <nav className="sidebar-nav" aria-label="Menu principal">
          <button
            className={!currentGame ? 'active' : ''}
            onClick={() => onNavigate(null)}
          >
            Inicio
          </button>
        </nav>
      </div>

      <div className="sidebar-group">
        <p className="sidebar-group-title">Juegos</p>
        <nav className="sidebar-nav" aria-label="Menu de juegos">
          {gameOptions.map((game) => (
            <button
              key={game.id}
              className={currentGame === game.id ? 'active' : ''}
              onClick={() => onNavigate(game.id)}
            >
              {game.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="sidebar-group">
        <p className="sidebar-group-title">Accesos rapidos</p>
        <nav className="sidebar-nav" aria-label="Menu de acciones rapidas">
          <button onClick={onRandomGame}>Juego aleatorio</button>
          <button onClick={onResumeLastGame} disabled={!lastGame}>
            Reabrir ultimo
          </button>
          <button onClick={() => onNavigate(null)} disabled={!currentGame}>
            Salir del juego
          </button>
        </nav>
      </div>

      <div className="sidebar-group">
        <p className="sidebar-group-title">Apariencia</p>
        <div className="sidebar-panel">
          <label className="sidebar-control">
            <span>Tema</span>
            <select
              className="sidebar-select"
              value={preferences.theme}
              onChange={(event) => onPreferenceChange({ theme: event.target.value })}
            >
              <option value="dark">Oscuro</option>
              <option value="light">Claro</option>
            </select>
          </label>

          <label className="sidebar-control">
            <span>Escala</span>
            <select
              className="sidebar-select"
              value={preferences.uiScale}
              onChange={(event) => onPreferenceChange({ uiScale: event.target.value })}
            >
              <option value="compact">Compacta</option>
              <option value="comfortable">Normal</option>
              <option value="spacious">Amplia</option>
            </select>
          </label>

          <label className="sidebar-control">
            <span>Ancho</span>
            <select
              className="sidebar-select"
              value={preferences.widthMode}
              onChange={(event) => onPreferenceChange({ widthMode: event.target.value })}
            >
              <option value="contained">Contenido</option>
              <option value="wide">Equilibrado</option>
              <option value="fluid">Panoramico</option>
            </select>
          </label>
        </div>
      </div>

      <div className="sidebar-group">
        <p className="sidebar-group-title">Audio</p>
        <div className="sidebar-panel">
          <button
            className={`sidebar-audio-toggle ${preferences.musicEnabled ? 'active' : ''}`}
            onClick={() => onPreferenceChange({ musicEnabled: !preferences.musicEnabled })}
          >
            {preferences.musicEnabled ? 'Musica en loop activada' : 'Activar musica en loop'}
          </button>

          <label className="sidebar-control">
            <span>Volumen</span>
            <input
              className="sidebar-range"
              type="range"
              min="0"
              max="100"
              step="1"
              value={Math.round(preferences.musicVolume * 100)}
              onChange={(event) => onPreferenceChange({ musicVolume: Number(event.target.value) / 100 })}
              disabled={!preferences.musicEnabled}
            />
          </label>

          <p className="sidebar-audio-meta">
            {preferences.musicEnabled
              ? `Volumen actual: ${Math.round(preferences.musicVolume * 100)}%`
              : 'Activa la musica para escuchar un loop ambiental suave.'}
          </p>
        </div>
      </div>

      <footer className="sidebar-footer">
        Consejo: usa los accesos rapidos para comparar varios juegos sin volver siempre al inicio.
      </footer>
    </aside>
  );
}

export default AppMenus;
