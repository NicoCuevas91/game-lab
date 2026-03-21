function Menu({ onSelect }) {
  return (
    <div className="menu">
      <h1>¿Qué juego querés jugar?</h1>
      <div className="buttons">
        <button onClick={() => onSelect('coin')}>Cara o Cruz</button>
        <button onClick={() => onSelect('dice6')}>Dado de 6 caras</button>
        <button onClick={() => onSelect('dice20')}>Dado de 20 caras</button>
      </div>
    </div>
  );
}

export default Menu;