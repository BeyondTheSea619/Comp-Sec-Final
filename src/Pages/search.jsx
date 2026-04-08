import { useState, useEffect } from "react";

function Search() {
  // state for search input
  const [query, setQuery] = useState("");
  // state for search results from API
  const [results, setResults] = useState([]);

  // handle search from submission
  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      // call backend search API with query parameter
      const res = await fetch(`http://localhost:5000/api/search?q=${query}`);
      // parse response JSON
      const data = await res.json();
      // update results state
      setResults(data);
    } catch (error) {
      console.error("Search error", error);
    }
  };

  // TODO SEED DATA AND MAKE SURE IT HAS A KEY VALUE PAIR WHERE THE KEY IS NAME AND THE VALUE IS THE ITEM'S NAME I.E. A RESTAURANT.
  // IT ALSO NEEDS A KEY VALUE PAIR FOR RESTAURANT ID WHERE THE VALUE IS AN INTEGER
  //   useEffect(() => {
  //     // loadData();
  //     const filtered = data.filter((item) =>
  //       item.name.toLowerCase().includes(query.toLowerCase()),
  //     );
  //     setResults(filtered);
  //   }, [query, data]);

  return (
    <div>
      {/* updated form new call backend API */}
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {/* display message if no results */}
      {results.length === 0 ? (
        <div>
          <h2>This page has no results</h2>
        </div>
      ) : (
        <div>
          <ul>
            {/* render results returned from backend */}
            {results.map((item) => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        </div>
      )}
      ;
    </div>
  );
}

export default Search;
