import React from "react";
import SongsList from "./Components/SongsList";
  
const MusicApp = ({ role }) => {
  return (
    <div className="p-3">
      <SongsList role={role} />
    </div>
  );
};

export default MusicApp;
