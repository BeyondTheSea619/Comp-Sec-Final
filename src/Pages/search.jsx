import { useState, useEffect } from "react";
import { data } from "react-router-dom";

function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [data, setData] = useSTate([]);
  async function loadData() {
    async function fetchData() {
      try {
        const res = await fetch("/seeded");

        if (!res.ok) {
          throw new Error(`Request failed: ${res.status}`);
        }

        const data = await res.json();
        return data;
      } catch (err) {
        console.error("Error fetching seeded data:", err);
        return [];
      }
    }

    const data = await fetchData();
    setData(data);
  }

  //TODO SEED DATA AND MAKE SURE IT HAS A KEY VALUE PAIR WHERE THE KEY IS NAME AND THE VALUE IS THE ITEM'S NAME I.E. A RESTAURANT.
  useEffect(() => {
    loadData();
    const filtered = data.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase()),
    );
    setResults(filtered);
  }, [query, data]);

  return results.length == 0 ? (
    <h1>This page has no results</h1>
  ) : (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ul>
        {results.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
export default Search;
