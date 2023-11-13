import React, { useState } from 'react';
import './App.css';
//import search from './component/search';
const ImageCover ='https://media.licdn.com/dms/image/C4E0BAQGpOs_FCmUHHQ/company-logo_200_200/0/1630567089256/truextend_logo?e=1707955200&v=beta&t=oo1biAcBkqNkb9khCWok-AMbs5IEW5NPkX-SezRiuFo';

function App() {
  
  const [searchInput, setSearchInput] = useState('');
  const [entityType, setEntityType] = useState('audiobook');
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    const apiUrl = `https://itunes.apple.com/search?term=${encodeURIComponent(
      searchInput
    )}&entity=${entityType}&limit=25`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        setResults(data.results);
      })
      .catch(error => {
        console.error('Error in making the request', error);
      });
  };

  return (
    <div className="App">
      <div className='form-control mt-5 shadow-lg'>
        <label htmlFor="searchInput"></label>
        <input
          type="text"
          id="searchInput"
          placeholder="Artist"
          className="input"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <select
          id="entitySelector"    
          value={entityType}
          onChange={(e) => setEntityType(e.target.value)}
          className="input"
        >
          <option value="movie">Movies</option>
          <option value="podcast">Podcast</option>
          <option value="audiobook">audiobook</option>
        </select>
        <button onClick={handleSearch} className="btn">Buscar</button>
      </div>
      <div className="search"> 
        {results.map(result => (
          <div key={result.collectionId} className="search-content"> 
            <img className="search-image" src={result.artworkUrl100||ImageCover} alt={ImageCover} />
            <h5 className="search-criteria">{result.collectionName}</h5>
            <h6 className="search-artits">Artist={result.artistName}</h6>
            <p className="search-price">Price={result.collectionPrice}</p>
          </div>
        ))}
      </div>
    </div>
  );
  

}

export default App;