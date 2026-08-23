"use client";

import { useEffect, useState } from "react";

import {
  Group,
  Image as KonvaImage,
  Rect,
  Text,
} from "react-konva";

import useImage from "use-image";

const SANS_FONT =
  'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif';

const SERIF_FONT = '"source-serif-pro", serif';

const ALBUM_SIZE = 190;
const MUSIC_GAP = 24;
const CARD_HEIGHT = 245;
const COLUMNS = 4;

const SPOTIFY_API =
  "https://my-spotify-app-tau.vercel.app/api/spotify/playlist";

export default function Music({
  x = 0,
  y = 0,
}) {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [playing, setPlaying] = useState(null);
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    async function loadMusic() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(SPOTIFY_API);

        if (!response.ok) {
          let message = `Spotify API error: ${response.status}`;

          try {
            const data = await response.json();

            if (data?.error) {
              message =
                typeof data.error === "string"
                  ? data.error
                  : data.error.message || message;
            }
          } catch {
            // Ignore JSON parsing errors.
          }

          throw new Error(message);
        }

        const data = await response.json();

        if (!Array.isArray(data.tracks)) {
          throw new Error(
            "Spotify API returned an invalid tracks response"
          );
        }

        setTracks(data.tracks);
      } catch (err) {
        console.error(
          "Failed to load Spotify music:",
          err
        );

        setError(
          err instanceof Error
            ? err.message
            : "Failed to load Spotify music"
        );
      } finally {
        setLoading(false);
      }
    }

    loadMusic();
  }, []);

  function stopCurrentAudio() {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }

    setAudio(null);
    setPlaying(null);
  }

  function playTrack(track) {
    if (playing === track.id) {
      stopCurrentAudio();
      return;
    }

    stopCurrentAudio();

    if (!track.previewUrl) {
      console.log(
        `No preview available for "${track.name}"`
      );

      if (track.spotifyUrl) {
        window.open(
          track.spotifyUrl,
          "_blank",
          "noopener,noreferrer"
        );
      }

      return;
    }

    const newAudio = new Audio(
      track.previewUrl
    );

    newAudio.addEventListener(
      "ended",
      () => {
        setPlaying(null);
        setAudio(null);
      }
    );

    newAudio
      .play()
      .catch((err) => {
        console.error(
          "Could not play preview:",
          err
        );

        setPlaying(null);
        setAudio(null);
      });

    setAudio(newAudio);
    setPlaying(track.id);
  }

  // ------------------------------------------------------------
  // LOADING
  // ------------------------------------------------------------

  if (loading) {
    return (
      <Group x={x} y={y}>
        <Text
          text="Loading music..."
          fontFamily={SANS_FONT}
          fontSize={16}
          fill="#666"
        />
      </Group>
    );
  }

  // ------------------------------------------------------------
  // ERROR
  // ------------------------------------------------------------

  if (error) {
    return (
      <Group x={x} y={y}>
        <Text
          text={`Spotify error: ${error}`}
          fontFamily={SANS_FONT}
          fontSize={14}
          fill="#b00020"
          width={500}
        />
      </Group>
    );
  }

  // ------------------------------------------------------------
  // EMPTY
  // ------------------------------------------------------------

  if (tracks.length === 0) {
    return (
      <Group x={x} y={y}>
        <Text
          text="No playlist tracks found."
          fontFamily={SANS_FONT}
          fontSize={16}
          fill="#666"
        />
      </Group>
    );
  }

  // ------------------------------------------------------------
  // GRID
  // ------------------------------------------------------------

  return (
    <Group x={x} y={y}>
      {tracks.map((track, index) => {
        const column = index % COLUMNS;
        const row = Math.floor(
          index / COLUMNS
        );

        const cardX =
          column *
          (ALBUM_SIZE + MUSIC_GAP);

        const cardY =
          row *
          (CARD_HEIGHT + MUSIC_GAP);

        return (
          <MusicCard
            key={`${track.id}-${index}`}
            track={track}
            x={cardX}
            y={cardY}
            playing={playing === track.id}
            onPlay={() =>
              playTrack(track)
            }
          />
        );
      })}
    </Group>
  );
}

// ============================================================
// MUSIC CARD
// ============================================================

function MusicCard({
  track,
  x,
  y,
  playing,
  onPlay,
}) {
  const [image] = useImage(
    track.image || ""
  );

  const [hovered, setHovered] =
    useState(false);

  return (
    <Group
      x={x}
      y={y}
      onMouseEnter={(e) => {
        setHovered(true);

        const stage =
          e.target.getStage();

        if (stage) {
          stage
            .container()
            .style.cursor = "pointer";
        }
      }}
      onMouseLeave={(e) => {
        setHovered(false);

        const stage =
          e.target.getStage();

        if (stage) {
          stage
            .container()
            .style.cursor = "grab";
        }
      }}
      onClick={onPlay}
    >
      {/* Album artwork */}

      {image ? (
        <KonvaImage
          image={image}
          x={0}
          y={0}
          width={ALBUM_SIZE}
          height={ALBUM_SIZE}
        />
      ) : (
        <Rect
          x={0}
          y={0}
          width={ALBUM_SIZE}
          height={ALBUM_SIZE}
          fill="#ddd"
        />
      )}

      {/* Hover overlay */}

      {hovered && (
        <Rect
          x={0}
          y={0}
          width={ALBUM_SIZE}
          height={ALBUM_SIZE}
          fill="rgba(0,0,0,0.45)"
          listening={false}
        />
      )}

      {/* Play button */}

      {hovered && (
        <Group listening={false}>
          <Rect
            x={ALBUM_SIZE - 52}
            y={ALBUM_SIZE - 52}
            width={38}
            height={38}
            cornerRadius={19}
            fill="#fff"
          />

          <Text
            x={ALBUM_SIZE - 44}
            y={ALBUM_SIZE - 45}
            width={24}
            height={24}
            text={playing ? "■" : "▶"}
            fontFamily={SANS_FONT}
            fontSize={13}
            fill="#202124"
            align="center"
            verticalAlign="middle"
          />
        </Group>
      )}

      {/* Song name */}

      <Text
        x={0}
        y={ALBUM_SIZE + 10}
        width={ALBUM_SIZE}
        text={track.name}
        fontFamily={SERIF_FONT}
        fontSize={16}
        fontStyle="bold"
        fill="#222"
        wrap="none"
        ellipsis={true}
        height={20}
      />

      {/* Artist */}

      <Text
        x={0}
        y={ALBUM_SIZE + 34}
        width={ALBUM_SIZE}
        text={track.artist}
        fontFamily={SANS_FONT}
        fontSize={13}
        fill="#666"
        wrap="none"
        ellipsis={true}
        height={18}
      />
    </Group>
  );
}
