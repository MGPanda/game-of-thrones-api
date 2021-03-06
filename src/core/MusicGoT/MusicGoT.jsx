
import React, { useState } from "react";
import './_MusicGoT.scss';
import minusIcon   from "../../assets/images/minus.svg";
import plusIcon    from "../../assets/images/plus.svg";
import musicIcon   from "../../assets/images/music.svg";
import pauseIcon   from "../../assets/images/pause.svg";



export function MusicGoT(props) {

  const [audioState, setAudioState] = useState({vol: 0.5, paused: true})
  
  function changeVolume(option) {
    const audio$$ = document.querySelector("#MusicGoT-audio");
    let newVol = audio$$.volume;
    if (option === "+") {
      newVol = (audioState.vol + 0.1 > 1) ? 1 : audioState.vol + 0.1; 
      setAudioState({...audioState, vol: newVol})
    }
    if (option === "-") {
      newVol = (audioState.vol - 0.1 < 0) ? 0 : audioState.vol - 0.1; 
      setAudioState({...audioState, vol: newVol})
    }
    audio$$.volume = newVol;
  };

  function togglePlay() {
    const paused = !audioState.paused;
    const audio$$ = document.querySelector("#MusicGoT-audio");
    setAudioState({...audioState, paused});
    (paused) ? audio$$.pause() : audio$$.play();
  }

  function showVolumeButtons() {
    document.querySelector("#MusicGoT-volUp").classList.remove("MusicGoT__button--hidden");
    document.querySelector("#MusicGoT-volDown").classList.remove("MusicGoT__button--hidden");
    document.querySelector("#MusicGoT-mid").classList.add("MusicGoT__button--mid");
  }

  function hideVolumeButtons() {
    document.querySelector("#MusicGoT-volUp").classList.add("MusicGoT__button--hidden");
    document.querySelector("#MusicGoT-volDown").classList.add("MusicGoT__button--hidden");
    document.querySelector("#MusicGoT-mid").classList.remove("MusicGoT__button--mid");
  }

  return(
    <div className="MusicGoT">

      <audio loop paused="true" id="MusicGoT-audio" className="MusicGoT__audio">
        <source type="audio/mpeg" src="/assets/sounds/GoT.mp3"/>
      </audio>

      <div className="MusicGoT__controls" onMouseEnter={showVolumeButtons} onMouseLeave={hideVolumeButtons}>
        <button 
          id="MusicGoT-volUp"
          className="MusicGoT__button MusicGoT__button--hidden" 
          onClick={() => changeVolume("+")}>
            <img src={plusIcon} alt=""/>
        </button>
        <button 
          id="MusicGoT-mid" 
          className="MusicGoT__button" onClick={togglePlay}>
            {audioState.paused  && <img src={musicIcon} alt=""/>}
            {!audioState.paused && <img src={pauseIcon} alt=""/>}
        </button>
        <button 
          id="MusicGoT-volDown"
          className="MusicGoT__button MusicGoT__button--hidden" 
          onClick={() => changeVolume("-")}>
            <img src={minusIcon} alt=""/>
        </button>
      </div>

    </div>
  )
}