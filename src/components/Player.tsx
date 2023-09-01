import { useEffect, useRef, useState } from "preact/hooks";
import { currentTrack, isPlaying } from "../state";

const PlayIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    class="w-10 h-10 sm:w-14 sm:h-14"
  >
    <path
      fill-rule="evenodd"
      d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
      clip-rule="evenodd"
    ></path>
  </svg>
);

const PauseIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    class="w-10 h-10 sm:w-14 sm:h-14"
  >
    <path
      fill-rule="evenodd"
      d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z"
      clip-rule="evenodd"
    />
  </svg>
);

// This app doesn't have real songs, it only has a few songs
// that we will play over and over as the user uses the app.
const MAX_SONGS = 4;

export default function Player() {
  const audioPlayer = useRef<HTMLAudioElement>(null);
  const progressRef = useRef(null);
  const [songIndex, setSongIndex] = useState(4);
  const [progress, setProgress] = useState(0);

  if (currentTrack.value === null) {
    return null;
  }

  const { title, artist, imageUrl } = currentTrack.value;

  function whilePlaying() {
    if (audioPlayer.current.duration) {
      const percentage =
        (audioPlayer.current.currentTime * 100) / audioPlayer.current.duration;

      setProgress(percentage);
    }

    progressRef.current = requestAnimationFrame(whilePlaying);
  }

  useEffect(() => {
    const newIndex = (songIndex % MAX_SONGS) + 1;
    audioPlayer.current.src = `/mp3/song${newIndex}.mp3`;
    audioPlayer.current.currentTime = 0;
    audioPlayer.current.play();

    setSongIndex(newIndex);
  }, [title]);

  useEffect(() => {
    if (isPlaying.value) {
      audioPlayer.current?.play();
      progressRef.current = requestAnimationFrame(whilePlaying);
    } else {
      audioPlayer.current?.pause();
      cancelAnimationFrame(progressRef.current);
    }
  }, [isPlaying.value]);

  useEffect(() => {
    if (progress >= 99.99) {
      isPlaying.value = false;
      setProgress(0);
    }
  }, [progress]);

  return (
    <div class="fixed bottom-0 left-0 right-0 bg-gray-100">
      <div class="flex-1 bg-gray-200 h-1.5 dark:bg-gray-700">p</div>
    </div>
  );
}
