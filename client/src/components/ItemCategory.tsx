import { useState } from "react";
import { GiCapeArmor, GiMagicPotion, GiSpinningSword } from "react-icons/gi";
import { MdEdit } from "react-icons/md";
import Form from "./Form";
import { createPortal } from "react-dom";

export default function ItemCategory({ item, styles }) {
  const [onMouse, setOnMouse] =  useState(false);
  const [isFormOpen, setIsFormOpen] =  useState(false);

  function deleteHandler() {
    fetch('http://localhost:3000/api/v1/items', {
      method: "delete",
      mode: 'cors',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        item_id: item.item_id,
        category: item.category
      })
    });
  }

  if (item.category === 'consumables') {
    return (
    <>
      <li onMouseEnter={() => setOnMouse(true)} onMouseLeave={() => setOnMouse(false)} className={`${styles.cell} ${styles.common}`}>
        <div>
          <img src="https://bg3.wiki/w/images/thumb/a/aa/Supply_Pack_Icon.png/196px-Supply_Pack_Icon.png" alt="shit"/>
        </div>
        <h3>{item.name}</h3>

        {onMouse && <div className={styles.info}>
        <p>{item.description}</p>
        <div className={styles.attr}><GiMagicPotion /> {item.type}</div>
        <button onClick={() => setIsFormOpen(true)}><MdEdit /></button>
        </div>}

        <button onClick={deleteHandler} className={styles['delete-button']}>x</button>
      </li>

      {isFormOpen && createPortal(<div className={styles.modal}><Form method="PATCH" baseVals={item}/></div>, document.body)}
    </>
    )
  }

  return (
    <>
    <li  onMouseEnter={() => setOnMouse(true)} onMouseLeave={() => setOnMouse(false)} className={`${styles.cell} ${styles[item.quality]}`}>
      <div>
        {item.armor && <img src="https://bg3.wiki/w/images/thumb/2/21/Padded_Armour_Icon.png/196px-Padded_Armour_Icon.png" alt="shit"/>}
        {item.damage && <img src="https://bg3.wiki/w/images/thumb/f/f1/Greataxe_Faded.png/196px-Greataxe_Faded.png" alt="shit"/>}
      </div>
      <h3>{item.name}</h3>

      {onMouse && <div className={styles.info}>
      <p>{item.description}</p>
      {item.damage && <div className={styles.attr}><GiSpinningSword /> {item.damage}</div>}
      {item.armor && <div className={styles.attr}><GiCapeArmor /> {item.armor}</div>}
      <button onClick={() => setIsFormOpen(true)}><MdEdit /></button>
      </div>}

      <button onClick={deleteHandler} className={styles['delete-button']}>x</button>
    </li>

    {isFormOpen && createPortal(<div className={styles.modal}><Form method="PATCH" baseVals={item}/></div>, document.body)}
    </>)
}