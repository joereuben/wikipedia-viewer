import {useState} from 'react'
import Result from './Result'
import loading from './loading.gif'

let endPoint = "https://en.wikipedia.org/w/api.php";

function App() {
  const [query, setQuery] = useState("")
  const [errorText, setErrorText] = useState("")
  const [items, setItems] = useState([])
  const [searching, setSearching] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if(!query) return

    setSearching(true)
    setErrorText("")
    var params = {
      action: "query",
      list: "search",
      srsearch: query,
      format: "json"
  };

  var url = endPoint + "?origin=*";
  Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});

  fetch(url)
    .then(function(response){return response.json();})
    .then(function(response) {
      setSearching(false)
      setItems(response.query.search)
    })
    .catch(function(error){
      setItems([])
      setSearching(false)
      setErrorText(error)
      console.log(error);}
    );
  
  }

  return (
    <div className="container">
      <div className="center">
        <h1>Wikipedia Viewer</h1>
        <h4>View Random articles from wikipedia or search for titles</h4>
        <div>
          <a href="https://en.wikipedia.org/wiki/Special:Random" target="_blank" rel="noopener noreferrer">
            <button>
              Click for Random Article
            </button>
          </a> 
        </div>
      </div>
      
      <div>
        <form action="" method="get" onSubmit={handleSubmit} className="center">
          <input id='query' type="search" value={query} onChange={e => setQuery(e.target.value)}/>
          <input id="submit" type="submit" value="Search" />
          {searching && <img src={loading} alt='searching' className='loading'/> }
        </form>
        <div className="results">
          <p>{errorText}</p>
          {!searching && items.map(item => {
            return <Result key={item.pageid} {...item} />
          })}
        </div>
      </div>
      <div className='center'>
        <code>developed by <a href="https://www.freecodecamp.org/reujoe" target="_blank" rel="noopener noreferrer">Joseph Amofa</a>  </code>
     </div>
    </div>
  );
}

export default App;
