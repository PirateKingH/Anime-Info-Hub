import React from "react";

export default function AnimeCard({ anime, onEdit, onDelete }) {
  return (
    <div className="card">
      <h3>{anime.title}</h3>
      <p className="small"><strong>Year:</strong> {anime.year || "—"}</p>
      <p className="small"><strong>Characters:</strong> {anime.characters?.join(", ")}</p>
      <p className="small">{anime.storyline?.slice(0, 120)}{anime.storyline && anime.storyline.length>120 ? "..." : ""}</p>
      <div style={{marginTop:10, display:"flex", gap:8}}>
        <button className="button" onClick={() => onEdit(anime)}>Edit</button>
        <button className="button" onClick={() => onDelete(anime._id)}>Delete</button>
      </div>
    </div>
  );
}
