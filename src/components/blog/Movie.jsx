import { Group, Image as KonvaImage, Text } from "react-konva";
import useImage from "use-image";

const SANS_FONT =
  'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif';

const SERIF_FONT = '"source-serif-pro", serif';

const MOVIE_WIDTH = 150;
const POSTER_HEIGHT = 225;

function formatDate(dateString) {
  if (!dateString) return "";

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export default function Movie({ film, x, y }) {
  /*
   * rss2json gives us the Letterboxd poster URL.
   *
   * useImage needs crossOrigin enabled for Konva,
   * but Letterboxd does not allow localhost directly.
   *
   * The poster URL is therefore passed through
   * images.weserv.nl, which acts as an image proxy.
   */
  const proxiedPoster = film.poster
    ? `https://images.weserv.nl/?url=${encodeURIComponent(
        film.poster
      )}`
    : "";

  const [image] = useImage(
    proxiedPoster,
    "anonymous"
  );

  return (
    <Group x={x} y={y}>
      {/* Poster */}

      {image && (
        <KonvaImage
          image={image}
          x={0}
          y={0}
          width={MOVIE_WIDTH}
          height={POSTER_HEIGHT}
          cornerRadius={4}
        />
      )}

      {/* Title */}

      <Text
        x={0}
        y={POSTER_HEIGHT + 12}
        width={MOVIE_WIDTH}
        text={film.title}
        fontFamily={SERIF_FONT}
        fontSize={14}
        fontStyle="bold"
        fill="#202124"
        lineHeight={1.25}
      />

      {/* Year */}

      {film.year && (
        <Text
          x={0}
          y={POSTER_HEIGHT + 13}
          width={MOVIE_WIDTH}
          text={film.year}
          fontFamily={SANS_FONT}
          fontSize={13}
          fontStyle="normal"
          fill="#202124"
          align="right"
        />
      )}

      {/* Rating */}

      {film.rating && (
        <Text
          x={0}
          y={POSTER_HEIGHT + 34}
          width={MOVIE_WIDTH}
          text={film.rating}
          fontFamily={SANS_FONT}
          fontSize={13}
          fill="#444"
          lineHeight={1.2}
        />
      )}

      {/* Date */}

      {film.watchedDate && (
        <Text
          x={0}
          y={POSTER_HEIGHT + 53}
          width={MOVIE_WIDTH}
          text={formatDate(film.watchedDate)}
          fontFamily={SANS_FONT}
          fontSize={13}
          fill="#666"
          lineHeight={1.2}
        />
      )}
    </Group>
  );
}
