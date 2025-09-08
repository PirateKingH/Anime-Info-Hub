import React from "react";
import AnimeList from "./components/AnimeList";

export default function App(){
  return (
    <div className="container">
      <header className="header">
        <h1>Anime Info Hub</h1>
        <p className="small">Add, edit, delete and search anime info</p>
      </header>
      <main>
        <AnimeList />
      </main>
    </div>
  );
}
