import { useEffect, useState } from 'react';
import styles from './App.module.css';

interface Item {
  name: string,
  description: string,
  item_id: number,
  created_at: string,
  category: string
}

function App() {
  const [select, setSelect] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [name, setName] = useState('');
  const [damage, setDamage] = useState('');
  const [armor, setArmor] = useState('');
  const [quality, setQuality] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [items, setItems] = useState<Item[]>([]);

  function formHandler(e: Event) {
    e.preventDefault();

    fetch('http://localhost:3000/api/v1/items', {
      method: 'POST',
      mode: 'cors',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        damage,
        armor,
        quality,
        category,
        description
      })
    });
  }

  useEffect(() => {
    async function fetchItems() {
      const res = await fetch('http://localhost:3000/api/v1/items');
      const data = await res.json();
      setItems(data);
    }
    fetchItems();
  }, []);

  return (
  <div className={styles.container}>
    <form className={styles.form}>
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
      {[...items ].map(item => <li key={item.item_id} className={styles.cell}>
        <h3>{item.name}</h3>
        <p>{item.description}</p>
      </li>)}
    </ul>

    <hr className={styles.divider}/>

    <form onSubmit={formHandler} className={styles.form} action=''>
      <input name='name' placeholder='name' className={styles.search} value={name} onChange={(e) => setName(e.target.value)} type="text" />
      <input name='quality' placeholder='quality' className={styles.search} value={quality} onChange={(e) => setQuality(e.target.value)} type="text" />
      <input name='description' placeholder='description' className={styles.search} value={description} onChange={(e) => setDescription(e.target.value)} type="text" />
      <input name='armor' placeholder='armor' className={styles.search} value={armor} onChange={(e) => setArmor(e.target.value)} type="text" />
      <input name='damage' placeholder='damage' className={styles.search} value={damage} onChange={(e) => setDamage(e.target.value)} type="text" />

      <select name="category" className={styles.category} value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="all">All</option>
        <option value="weapons">Weapons</option>
        <option value="armor">Armor</option>
        <option value="consumables">Consumables</option>
      </select>

      <button type='submit'>submit</button>
    </form>
  </div>)
}

export default App;