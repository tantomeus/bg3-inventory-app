import { useState } from 'react';
import styles from './MainPage.module.css';

export default function Form( {method = 'POST', baseVals = {}} ) {
    const [name, setName] = useState(baseVals.name || '');
    const [damage, setDamage] = useState(baseVals.damage || '');
    const [armor, setArmor] = useState(baseVals.armor || '');
    const [quality, setQuality] = useState(baseVals.quality || 'common');
    const [category, setCategory] = useState(baseVals.category || 'weapon');
    const [typeConsum, setTypeConsum] = useState(baseVals.type || '');
    const [description, setDescription] = useState(baseVals.description || '');

    function addItems(e: Event) {
        e.preventDefault();
    
        fetch('http://localhost:3000/api/v1/items', {
          method,
          mode: 'cors',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            item_id: baseVals.item_id || '',
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

    return (
    <form onSubmit={addItems} className={styles.form} action=''>
    <input name='name' placeholder='name' className={styles.search} value={name} onChange={(e) => setName(e.target.value)} type="text" />
    <input name='description' placeholder='description' className={styles.search} value={description} onChange={(e) => setDescription(e.target.value)} type="text" />
    {category === 'armor' && <input name='armor' placeholder='armor' className={styles.search} value={armor} onChange={(e) => setArmor(e.target.value)} type="text" />}
    {category === 'weapon' && <input name='damage' placeholder='damage' className={styles.search} value={damage} onChange={(e) => setDamage(e.target.value)} type="text" />}

    {method === 'POST' && <select name="category" className={styles.category} value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="weapon">weapon</option>
        <option value="armor">armor</option>
        <option value="consumables">consumables</option>
    </select>}

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
    )
}