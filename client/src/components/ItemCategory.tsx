import { useState } from "react"

export default function ItemCategory({ item, styles }) {
  const [onMouse, setOnMouse] =  useState(false);


  if (item.category === 'consumables') {
    return (
    <li onMouseEnter={() => setOnMouse(true)} onMouseLeave={() => setOnMouse(false)} className={`${styles.cell} ${styles.common}`}>
      <div>
        <img src="https://bg3.wiki/w/images/thumb/a/aa/Supply_Pack_Icon.png/196px-Supply_Pack_Icon.png" alt="shit"/>
      </div>
      <h3>{item.name}</h3>

      {onMouse && <div className={styles.info}>
      {item.description}
      </div>}

    </li>)
  }

  return <li className={`${styles.cell} ${styles[item.quality]}`}>
  <div>
    {item.armor && <img src="https://bg3.wiki/w/images/thumb/2/21/Padded_Armour_Icon.png/196px-Padded_Armour_Icon.png" alt="shit"/>}
    {item.damage && <img src="https://bg3.wiki/w/images/thumb/f/f1/Greataxe_Faded.png/196px-Greataxe_Faded.png" alt="shit"/>}
  </div>
  <h3>{item.name}</h3>
</li>
}