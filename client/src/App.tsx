import { useState } from 'react';
import styles from './App.module.css';

function App() {
  const [select, setSelect] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  return (
  <div className={styles.container}>
    <form className={styles.form} method='POST'>
      <input className={styles.search} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} type="text" />
      <select className={styles.category} value={select} onChange={(e) => setSelect(e.target.value)} name="">
        <option value="all">All</option>
        <option value="weapons">Weapons</option>
        <option value="armor">Armor</option>
        <option value="consumables">Consumables</option>
      </select>
    </form>

    <hr className={styles.divider}/>

    <ul className={styles.grid}>
      {Array(12).fill(<li className={styles.cell}></li>)}
    </ul>
  </div>)
}

export default App;