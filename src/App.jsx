import React from "react";
import axios from "axios";

const App  = () => {
  const [data, setData] = React.useState([])
  React.useEffect(()=> {
    axios.get('http://rickandmortyapi.com/api/character')
      .then(({data}) => setData(data.results))
  }, [])

  return (
    <div className="character-grid">
      {data.map(char => (
        <div className="character-card" key={String(char.id)}>
          <img className="img-responsive" src={char.image} alt={char.name} /> 
          <div className="character-name">{char.name}</div>
        </div>
      ))}
    </div>
  )
}

export default App