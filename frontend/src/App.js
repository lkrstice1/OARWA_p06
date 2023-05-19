import React, {useState, useEffect} from 'react'
import Poruka from './components/Poruka'
import axios from 'axios' //dodana komponenta
import porukeAkcija from './services/poruke'

const App = (props) => {
  const [ poruke, postaviPoruke] = useState([])
  const [ unosPoruke, postaviUnos] = useState('unesi poruku...')
  const [ ispisSve, postaviIspis] = useState(true)
  

  const porukeZaIspis = ispisSve
  ? poruke
  : poruke.filter(poruka => poruka.vazno === true)

  
  useEffect( () => {
    porukeAkcija.dohvatiSve()
    .then(res => postaviPoruke(res.data))
  }, [])

  //funkcija se poziva na klik te generira i sprema novu poruku
  const novaPoruka = (e) => {
    e.preventDefault()
    console.log('Klik', e.target)
    const noviObjekt = {
      sadrzaj: unosPoruke,
      datum: new Date(),
      vazno: Math.random() > 0.5      
    }
    porukeAkcija.stvori(noviObjekt)
      .then(res => {
        postaviPoruke(poruke.concat(res.data))
        postaviUnos('')
      })
  }

  const promjenaUnosa = (e) => {
    console.log(e.target.value);
    postaviUnos(e.target.value)
  }

  const promjenaVaznostiPoruke = (id) => {
    const poruka = poruke.find(p => p.id === id)
    const modPoruka = {
      ...poruka,
      vazno: !poruka.vazno
    }
    porukeAkcija.osvjezi(id, modPoruka)
      .then(response => {
        console.log(response)
        postaviPoruke(poruke.map(p => p.id !== id ? p : response.data))
      })
  }

  const brisiPoruku = (id) => {
    porukeAkcija.brisi(id)
    .then(response => {
      console.log(response);
      postaviPoruke(poruke.filter(p => p.id !== id))
    })
  }

  return (
    <div>
      <h1>Poruke</h1>
      <div>
        <button onClick={() => postaviIspis(!ispisSve)}>
          Prikaži { ispisSve ? "važne" : "sve"}
        </button>
      </div>
      <ul>
        {porukeZaIspis.map(p =>
          <Poruka 
          key={p.id} 
          poruka={p} 
          promjenaVaznosti={() => promjenaVaznostiPoruke(p.id)}
          brisiPoruku={() => brisiPoruku(p.id)}
          />
        )}        
      </ul>
      {/*
        <form onSubmit={novaPoruka}>
        <input value={unosPoruke} onChange={promjenaUnosa} />
        <button type='submit'>Spremi</button>
        </form>
        */}
      
    </div>
  )
}

export default App