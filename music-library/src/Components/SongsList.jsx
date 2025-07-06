import React, { useState } from "react";

const initialSongs = [
 
  { id: 1, title: "Tum Hi Ho", artist: "Arijit Singh", album: "Aashiqui 2" },
  { id: 2, title: "Tera Ban Jaunga", artist: "Akhil Sachdeva", album: "Kabir Singh" },
  { id: 3, title: "Ghungroo", artist: "Arijit Singh", album: "War" },
  { id: 4, title: "Kalank", artist: "Arijit Singh", album: "Kalank" }, 
  { id: 5, title: "Butta Bomma", artist: "Armaan Malik", album: "Ala Vaikunthapurramuloo" },
  { id: 6, title: "Rowdy Baby", artist: "Dhanush & Dhee", album: "Maari 2" },
  { id: 7, title: "Naatu Naatu", artist: "Rahul Sipligunj & Kaala Bhairava", album: "RRR" },
  { id: 8, title: "Samajavaragamana", artist: "Sid Sriram", album: "Ala Vaikunthapurramuloo" }
];


let nextId = 5;

const SongsList = ({ role ,songs: propSongs}) => {
   const [songs, setSongs] = useState(propSongs || initialSongs);
   const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("");
  const [groupBy, setGroupBy] = useState("");

  const [newSong, setNewSong] = useState({
    title: "",
    artist: "",
    album: "",
  });

  const addSong = (e) => {
    e.preventDefault();
    const song = { ...newSong, id: nextId++ };
    setSongs([...songs, song]);
    setNewSong({ title: "", artist: "", album: "" });
  };

  const deleteSong = (id) => {
    if (window.confirm("Delete this song?")) {
      setSongs(songs.filter((s) => s.id !== id));
    }
  };

  const filtered = songs
    .filter(
      (song) =>
        song.title.toLowerCase().includes(search.toLowerCase()) ||
        song.artist.toLowerCase().includes(search.toLowerCase()) ||
        song.album.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (!sortKey) return 0;
      return a[sortKey].localeCompare(b[sortKey]);
    });

  const groupedSongs = groupBy
    ? filtered.reduce((acc, song) => {
        const key = song[groupBy];
        if (!acc[key]) acc[key] = [];
        acc[key].push(song);
        return acc;
      }, {})
    : { All: filtered };

  return (
    <div className="container">
      {/* Filter & Sort */}
      <div className="row mb-3">
        <div className="col-md-4 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title, artist, album"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="col-md-4 mb-2">
          <select
            className="form-select"
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value)}
          >
            <option value="">-- Sort By --</option>
            <option value="title">Title</option>
            <option value="artist">Artist</option>
            <option value="album">Album</option>
          </select>
        </div>
        <div className="col-md-4 mb-2">
          <select
            className="form-select"
            value={groupBy}
            onChange={(e) => setGroupBy(e.target.value)}
          >
            <option value="">-- Group By --</option>
            <option value="album">Album</option>
            <option value="artist">Artist</option>
            <option value="title">Title</option>
          </select>
        </div>
      </div>

      {/* Admin Add Form */}
      {role === "admin" && (
        <div className="card mb-4 shadow-sm">
          <div className="card-body">
            
            <form onSubmit={addSong}>
              <div className="row mb-2">
                <div className="col-md-4">
                  <input
                    className="form-control"
                    placeholder="Title"
                    value={newSong.title}
                    required
                    onChange={(e) =>
                      setNewSong({ ...newSong, title: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-4">
                  <input
                    className="form-control"
                    placeholder="Artist"
                    value={newSong.artist}
                    required
                    onChange={(e) =>
                      setNewSong({ ...newSong, artist: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-4">
                  <input
                    className="form-control"
                    placeholder="Album"
                    value={newSong.album}
                    required
                    onChange={(e) =>
                      setNewSong({ ...newSong, album: e.target.value })
                    }
                  />
                </div>
              </div>
              <button className="btn btn-success">Add Song</button>
            </form>
          </div>
        </div>
      )}

      {/* Grouped Songs */}
      {Object.keys(groupedSongs).map((group) => (
        <div key={group} className="mb-4">
          <h5 className="">
            {groupBy ? `${groupBy.toUpperCase()}: ${group}` : "All Songs"}
          </h5>
          <ul className="list-group">
            {groupedSongs[group].map((song) => (
              <li
                className="list-group-item d-flex justify-content-between align-items-center"
                key={song.id}
              >
                <span>
                  <strong>{song.title}</strong> - {song.artist} ({song.album})
                </span>
                {role === "admin" && (
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => deleteSong(song.id)}
                  >
                    🗑 Delete
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default SongsList;
