// TODO - decide if single video controls are enabled while sync playing.
import { useState, useRef, useEffect, createRef } from "react"; // , useEffect
import { Video } from "../../types/video";
// import VideoItem from "../video-item/VideoItem";
import ReactPlayer from 'react-player'
import c from "./VideoList.module.scss"


type Props = {
  videos: Video[];
};

export default function VideoList({ videos }: Props) {
  const [isSyncPlay, setIsSyncPlay] = useState(false);
  const timelineIntervalId = useRef(0);
  const [timelineTime, setTimelineTime] = useState(0);
  const timelineStartTime = videos[0].startTime;
  const lastVideoIndex = videos.length - 1;
  const [volume, setVolume] = useState(0.5);
  const playersRef = useRef([createRef<ReactPlayer>()]);
  // console.log({ timelineTime });

  useEffect(() => {
    if (isSyncPlay) {
      timelineIntervalId.current = setInterval(() => {
        setTimelineTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(timelineIntervalId.current);
  }, [isSyncPlay]);


  function setSyncPlayingAndTimeline() {
    if (!isSyncPlay) {
      setIsSyncPlay(!isSyncPlay);
    } else {
      clearInterval(timelineIntervalId.current);
      setIsSyncPlay(!isSyncPlay);
    }
  }

  function handlePause() {
    setIsSyncPlay(false);
    clearInterval(timelineIntervalId.current);
  }

  function restartTimeline() {
    console.log("restartTimeline");
    setIsSyncPlay(true);
    setTimelineTime(0);
    playersRef.current.map((player) => {
      const internalPlayer = player.current?.getInternalPlayer();
      if (internalPlayer) {
        internalPlayer.seekTo(0);
      }
    });
  }

  function isSyncPlayHandle(startTime: Date): boolean | undefined {
    if (isSyncPlay) {
      console.log("timelineTime:", timelineTime * 1000);
      console.log(startTime.getTime() - timelineStartTime.getTime());
      const isTimelineTimeInVideoPeriod = timelineTime * 1000 >= startTime.getTime() - timelineStartTime.getTime();
      if (isTimelineTimeInVideoPeriod) {
        return true;
      }
    }
    return false;
  }

  function handleTimelineEnd() {
    if (timelineTime !== 0) {
      setIsSyncPlay(false)
      setTimelineTime(0);
      clearInterval(timelineIntervalId.current);
    }
  }

  function volumeChange(e: React.ChangeEvent<HTMLInputElement>) {
    setVolume(parseFloat(e.target.value));
  }

  return (
    <div>
      <button onClick={setSyncPlayingAndTimeline}>{isSyncPlay ? "Pause" : "Play All"}</button>
      {!isSyncPlay && timelineTime !== 0 && <button onClick={restartTimeline}>Restart</button>}
      {/* TODO - check this code - is React specific */}
      <input type="range" id="volume" name="volume" min="0" max="1" step="0.1" onChange={volumeChange} />
      <label htmlFor="volume">Volume</label>

      <div className={c.videoTimeline}>
        {videos.map((video: Video, index: number) => (
          <ReactPlayer
            key={video.id}
            ref={playersRef.current[index]}
            url={video.url}
            playing={isSyncPlayHandle(video.startTime)}
            className={c.videoItem}
            controls={true}
            config={{
              youtube: {
                embedOptions: {
                  width: video.orientation == "Landscape" ? "560" : "315",
                  height: video.orientation == "Landscape" ? "315" : "560"
                  // start: video.startTime.getTime() / 1000
                }
              }
            }}
            onPause={handlePause}
            onEnded={() => index === lastVideoIndex && handleTimelineEnd()}
            volume={volume}
          />
        ))}
      </div>
    </div>
  );
}
