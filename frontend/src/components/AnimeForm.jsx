import React, { useState, useEffect } from "react";

export default function AnimeForm({ onSubmit, initial }) {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [characters, setCharacters] = useState("");
  const [storyline, setStoryline] = useState("");

  useEffect(() => {
    if (initial) {
      setTitle(initial.title || "");
      setYear(initial.year || "");
      setCharacters((initial.characters || []).join(", "));
      setStoryline(initial.storyline || "");
    } else {
      setTitle(""); setYear(""); setCharacters(""); setStoryline("");
    }
  }, [initial]);

  function submit(e) {
    e.preventDefault();
    if (!title.trim()) return alert("Title required");
    onSubmit({
      title: title.trim(),
      year: year ? parseInt(year) : undefined,
      characters: characters.split(",").map(s => s.trim()).filter(Boolean),
      storyline
    });
  }

  return (
    <form className="form" onSubmit={submit}>
      <label>Title
        <input className="input" value={title} onChange={e=>setTitle(e.target.value)} />
      </label>
      <label>Year
        <input className="input" value={year} onChange={e=>setYear(e.target.value)} />
      </label>
      <label>Characters (comma separated)
        <input className="input" value={characters} onChange={e=>setCharacters(e.target.value)} />
      </label>
      <label>Storyline
        <textarea className="input" value={storyline} onChange={e=>setStoryline(e.target.value)} />
      </label>
      <button className="button" type="submit">Save</button>
    </form>
  );
}
