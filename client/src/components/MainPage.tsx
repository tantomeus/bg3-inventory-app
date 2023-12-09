import styles from './MainPage.module.css';
import ItemCategory from './ItemCategory';

import { useEffect, useState } from 'react';

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
    const [name, setName] = useState('');
    const [damage, setDamage] = useState('');
    const [armor, setArmor] = useState('');
    const [quality, setQuality] = useState('common');
    const [category, setCategory] = useState('weapon');
    const [typeConsum, setTypeConsum] = useState('');
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
          description,
          type: typeConsum
        })
      });
    }
  
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

        <form onSubmit={formHandler} className={styles.form} action=''>
        <input name='name' placeholder='name' className={styles.search} value={name} onChange={(e) => setName(e.target.value)} type="text" />
        <input name='description' placeholder='description' className={styles.search} value={description} onChange={(e) => setDescription(e.target.value)} type="text" />
        {category === 'armor' && <input name='armor' placeholder='armor' className={styles.search} value={armor} onChange={(e) => setArmor(e.target.value)} type="text" />}
        {category === 'weapon' && <input name='damage' placeholder='damage' className={styles.search} value={damage} onChange={(e) => setDamage(e.target.value)} type="text" />}

        <select name="category" className={styles.category} value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="weapon">weapon</option>
            <option value="armor">armor</option>
            <option value="consumables">consumables</option>
        </select>

        {category === 'consumables' && (
            <select name="category" className={styles.category} value={typeConsum} onChange={(e) => setTypeConsum(e.target.value)}>
            <option value="potion">potion</option>
            <option value="food">food</option>
            <option value="scroll">scroll</option>
            </select>
        )}

        {category !== 'consumables' && (
            <select name="category" className={styles.category} value={quality} onChange={(e) => setQuality(e.target.value)}>
            <option value="common">common</option>
            <option value="rare">rare</option>
            <option value="epic">epic</option>
            <option value="legendary">legendary</option>
            </select>
        )}

        <button type='submit'>submit</button>
        </form>
    </>
    )
}