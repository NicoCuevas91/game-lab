import '../styles/components/menu.css';

function Menu({ onSelect }) {
  const games = [
    {
      id: 'coin',
      title: 'Cara o Cruz',
      subtitle: 'Lanza una o varias monedas',
      detail: 'Elegi moneda, cantidad y tiempo de revelado.',
      badge: 'Moneda',
      emoji: '🪙',
    },
    {
      id: 'dice6',
      title: 'Dado de 6 caras',
      subtitle: 'Resultado rapido y directo',
      detail: 'Ideal para juegos clasicos y decisiones rapidas.',
      badge: 'D6',
      emoji: '🎲',
    },
    {
      id: 'dice20',
      title: 'Dado de 20 caras',
      subtitle: 'Perfecto para RPG',
      detail: 'Detecta criticos y mira tu historial al instante.',
      badge: 'D20',
      emoji: '⚔️',
    },
  ];

  return (
    <section className="menu">
      <header className="menu-header">
        <p className="menu-kicker">Game Lab</p>
        <h1>Elegi tu proximo juego</h1>
        <p className="menu-description">
          Selecciona un modo y empeza a tirar. Cada juego tiene estilos y reglas propias.
        </p>
      </header>

      <div className="menu-grid">
        {games.map((game) => (
          <article key={game.id} className="menu-card">
            <span className="menu-card-badge">{game.badge}</span>
            <p className="menu-card-emoji" aria-hidden="true">{game.emoji}</p>
            <h2>{game.title}</h2>
            <p className="menu-card-subtitle">{game.subtitle}</p>
            <p className="menu-card-detail">{game.detail}</p>
            <button onClick={() => onSelect(game.id)}>
              Jugar ahora
            </button>
          </article>
        ))}
      </div>

      <footer className="menu-footer">
        Consejo: para empezar, proba Cara o Cruz con 3 monedas y revelado de 3 segundos.
      </footer>
    </section>
  );
}

export default Menu;