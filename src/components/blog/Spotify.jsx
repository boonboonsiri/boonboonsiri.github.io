'use client';

export default function SpotifyEmbed() {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >
      <iframe
        data-testid="embed-iframe"
        src="https://open.spotify.com/embed/playlist/2s6WmvXNs5rrZmAZ1HDInf"
        width="100%"
        height="450"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        style={{
          borderRadius: "16px",
          display: "block",
        }}
      />
    </div>
  );
}
