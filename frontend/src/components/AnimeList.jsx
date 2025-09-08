import React, { useEffect, useState } from "react";
import { fetchAnime, addAnime, updateAnime, removeAnime } from "../api";
import AnimeCard from "./AnimeCard";
import AnimeForm from "./AnimeForm";

export default function AnimeList() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(null);
  const [query, setQuery] = useState("");
  const [yearFilter, setYearFilter] = useState("");

  async function load() {
    setLoading(true);
    try {
      const data = await fetchAnime({ search: query || undefined, year: yearFilter || undefined });
      setList(data);
    } finally { setLoading(false); }
  }

  useEffect(() => { load(); }, []); // initial load

  async function handleAdd(data) {
    await addAnime(data);
    setEditing(null);
    load();
  }

  async function handleUpdate(id, data) {
    await updateAnime(id, data);
    setEditing(null);
    load();
  }

  async function handleDelete(id) {
    if (!confirm("Delete this anime?")) return;
    await removeAnime(id);
    load();
  }

  function onEdit(item) { setEditing(item); window.scrollTo({top:0, behavior:"smooth"}); }

  return (
    <div>
      <AnimeForm onSubmit={editing ? (data)=>handleUpdate(editing._id, data) : handleAdd} initial={editing} />
      <div className="controls">
        <input placeholder="Search title, character, storyline..." className="input" value={query} onChange={e=>setQuery(e.target.value)} />
        <input placeholder="Year" className="input" value={yearFilter} onChange={e=>setYearFilter(e.target.value)} />
        <button className="button" onClick={load}>Search</button>
        <button className="button" onClick={() => { setQuery(""); setYearFilter(""); load(); }}>Reset</button>
      </div>

      {loading ? <p>Loading...</p> :
        <div className="grid">
          {list.length === 0 ? <p>No anime found.</p> : list.map(a => (
            <AnimeCard key={a._id} anime={a} onEdit={onEdit} onDelete={handleDelete} />
          ))}
        </div>
      }
    </div>
  );
}
