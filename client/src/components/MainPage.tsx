import styles from './MainPage.module.css';
import ItemCategory from './ItemCategory';

import { useEffect, useState } from 'react';
import Form from './Form';

interface Item {
    name: string,
    description: string,
    item_id: number,
    created_at: string,
    category: string
}

export default function MainPage() {
    const [filter, setFilter] = useState('all');
    const [searchName, setSearchName] = useState('');
    const [searchQuality, setSearchQuality] = useState('');

    const [items, setItems] = useState<Item[]>([]);
  
    useEffect(() => {
      async function fetchItems() {
        const res = await fetch('http://localhost:3000/api/v1/items');
        const data = await res.json();
        const dataFiltered = data.filter((item) => (filter === 'all' ? true : item.category === filter) && item.name.includes(searchName) && (item.quality || item.type).includes(searchQuality));
        setItems(dataFiltered);
      }
      fetchItems();
    }, [filter, searchName, searchQuality]);

    return (
    <>
      <form className={styles.form}>
      <input placeholder='by name' className={styles.search} value={searchName} onChange={(e) => setSearchName(e.target.value)} type="text" />
      <input  placeholder='by quality' className={styles.search} value={searchQuality} onChange={(e) => setSearchQuality(e.target.value)} type="text" />
      <select className={styles.category} value={filter} onChange={(e) => setFilter(e.target.value)} name="">
          <option value="all">all</option>
          <option value="weapon">weapon</option>
          <option value="armor">armor</option>
          <option value="consumables">consumables</option>
      </select>
      </form>

      <hr className={styles.divider}/>

      <ul className={styles.grid}>
      {[...items].map(item => <ItemCategory key={item.item_id} styles={styles} item={item}/>)}
      </ul>

      <hr className={styles.divider}/>

      <Form />
    </>
    )
}