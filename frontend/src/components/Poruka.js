import React from 'react'
import './Poruka.css'

const Poruka = ({poruka, promjenaVaznosti, brisiPoruku}) => {
  const oznaka = poruka.vazno 
  ? 'Oznaci kao nevazno' : 'oznaci kao vazno'

  return (
    <li>
      <span className={poruka.vazno ? 'vazno' : 'nevazno'}>{poruka.sadrzaj}</span>
      <button onClick={promjenaVaznosti}>{oznaka}</button>
      <button onClick={brisiPoruku}><span role='img' aria-label="delete">❌</span></button>
    </li>
  )
}

export default Poruka