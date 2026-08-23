"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  Stage,
  Layer,
  Group,
  Rect,
  Text,
  Line,
} from "react-konva";

import { books } from "../../content/books";

import Book from "./Book";
import Movie from "./Movie";
import Music from "./Music";

import "../../styles/Library.scss";

const MIN_ZOOM = 0.25;
const MAX_ZOOM = 3;
const ZOOM_SPEED = 1.08;

const SANS_FONT =
  'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif';

const SERIF_FONT =
  '"source-serif-pro", serif';

/* ============================================
   BOOK SETTINGS
   ============================================ */

const BOOK_WIDTH = 170;
const BOOK_HEIGHT = 255;
const BOOK_GAP = 26;
const BOOKS_PER_ROW = 6;
const ROW_HEIGHT = 330;

const SECTION_PADDING_X = 30;
const SECTION_PADDING_TOP = 65;
const SECTION_PADDING_BOTTOM = 45;

const PLANK_HEIGHT = 20;

const SECTION_WIDTH =
  BOOKS_PER_ROW * BOOK_WIDTH +
  (BOOKS_PER_ROW - 1) * BOOK_GAP +
  SECTION_PADDING_X * 2;

const INTRO_HEIGHT = 180;
const SECTION_GAP = 10;

/* ============================================
   MOVIE SETTINGS
   ============================================ */

const MOVIE_WIDTH = 150;
const MOVIE_GAP = 22;
const MOVIES_PER_ROW = 5;
const MOVIE_ROW_HEIGHT = 315;

/*
 * This is the horizontal distance between
 * the bookshelf and the movie section.
 */

const MOVIE_OFFSET_X = 300;

/*
 * First movie row relative to the top
 * of the movie section.
 */

const MOVIE_CONTENT_Y = 145;

const LETTERBOXD_URL =
  "https://letterboxd.com/boonboonsiri/films/by/entry-rating/";

/* ============================================
   MUSIC SETTINGS
   ============================================ */

/*
 * Music sits to the LEFT of the bookshelf.
 *
 * Change this if you want more/less space
 * between Music and Books.
 */

const MUSIC_OFFSET_X = 1180;

/*
 * Music cards are controlled by Music.jsx.
 * This only determines where the section begins.
 */

const MUSIC_SECTION_Y = 0;

const SPOTIFY_PLAYLIST_URL =
  "https://open.spotify.com/playlist/2s6WmvXNs5rrZmAZ1HDInf";

/* ============================================
   LIBRARY
   ============================================ */

export default function Library() {
  const stageRef = useRef(null);

  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });

  const [camera, setCamera] = useState({
    x: 0,
    y: 100,
    zoom: 0.6,
  });

  const [films, setFilms] = useState([]);

  /* ==========================================
     GROUP BOOKS BY SHELF
     ========================================== */

  const sections = useMemo(() => {
    const order = [];
    const map = new Map();

    for (const book of books) {
      if (!map.has(book.shelf)) {
        map.set(book.shelf, []);
        order.push(book.shelf);
      }

      map.get(book.shelf).push(book);
    }

    return order.map((name) => ({
      name,
      books: map.get(name),
    }));
  }, []);

  /* ==========================================
     BUILD BOOK SECTION POSITIONS
     ========================================== */

  const sectionItems = useMemo(() => {
    let currentY = INTRO_HEIGHT;

    return sections.map((section) => {
      const rows = [];

      for (
        let i = 0;
        i < section.books.length;
        i += BOOKS_PER_ROW
      ) {
        rows.push(
          section.books.slice(
            i,
            i + BOOKS_PER_ROW
          )
        );
      }

      const height =
        SECTION_PADDING_TOP +
        rows.length * ROW_HEIGHT +
        SECTION_PADDING_BOTTOM;

      const result = {
        ...section,
        x: -SECTION_WIDTH / 2,
        y: currentY,
        rows,
        height,
      };

      currentY +=
        height + SECTION_GAP;

      return result;
    });
  }, [sections]);

  /* ==========================================
     FETCH LETTERBOXD MOVIES
     ========================================== */

  useEffect(() => {
    async function fetchFilms() {
      try {
        const rssUrl =
          "https://letterboxd.com/boonboonsiri/rss/";

        const apiUrl =
          "https://api.rss2json.com/v1/api.json?rss_url=" +
          encodeURIComponent(rssUrl);

        const res =
          await fetch(apiUrl);

        if (!res.ok) {
          throw new Error(
            `Letterboxd request failed: ${res.status}`
          );
        }

        const data =
          await res.json();

        const items =
          (data.items || [])
            .slice(0, 15)
            .map((item) => {
              const rawTitle =
                item.title || "";

              /* Find rating */

              const ratingMatches =
                rawTitle.match(
                  /★★★★★|★★★★½|★★★★|★★★½|★★★|★★½|★★|★½|★/g
                ) || [];

              const rating =
                ratingMatches.length
                  ? ratingMatches.sort(
                      (a, b) =>
                        b.length -
                        a.length
                    )[0]
                  : "";

              /* Find year */

              const yearMatch =
                rawTitle.match(
                  /\b(19|20)\d{2}\b/
                );

              const year =
                yearMatch
                  ? yearMatch[0]
                  : "";

              /* Clean title */

              const title =
                rawTitle
                  .replace(
                    /★★★★★|★★★★½|★★★★|★★★½|★★★|★★½|★★|★½|★/g,
                    ""
                  )
                  .replace(
                    /\b(19|20)\d{2}\b/g,
                    ""
                  )
                  .replace(
                    /\s-\s/g,
                    " "
                  )
                  .replace(
                    /,/g,
                    " "
                  )
                  .replace(
                    /\s+/g,
                    " "
                  )
                  .trim();

              /* Extract poster */

              const imageMatch =
                (
                  item.description ||
                  ""
                ).match(
                  /<img[^>]+src="([^"]+)"/i
                );

              return {
                title,
                year,
                rating,
                link: item.link,
                watchedDate:
                  item.pubDate,
                poster:
                  imageMatch
                    ? imageMatch[1]
                    : "",
              };
            });

        setFilms(items);
      } catch (error) {
        console.error(
          "Failed to fetch Letterboxd films:",
          error
        );
      }
    }

    fetchFilms();
  }, []);

  /* ==========================================
     RESIZE
     ========================================== */

  useEffect(() => {
    const resize = () => {
      const width =
        window.innerWidth;

      const height =
        window.innerHeight;

      setSize({
        width,
        height,
      });

      setCamera((current) => ({
        ...current,
        x: width / 2,
      }));
    };

    resize();

    window.addEventListener(
      "resize",
      resize
    );

    return () => {
      window.removeEventListener(
        "resize",
        resize
      );
    };
  }, []);

  /* ==========================================
     ZOOM
     ========================================== */

  const handleWheel = (e) => {
    e.evt.preventDefault();

    const stage =
      stageRef.current;

    if (!stage) return;

    const pointer =
      stage.getPointerPosition();

    if (!pointer) return;

    const oldZoom =
      camera.zoom;

    let newZoom =
      e.evt.deltaY > 0
        ? oldZoom / ZOOM_SPEED
        : oldZoom * ZOOM_SPEED;

    newZoom = Math.max(
      MIN_ZOOM,
      Math.min(
        MAX_ZOOM,
        newZoom
      )
    );

    const worldX =
      (pointer.x - camera.x) /
      oldZoom;

    const worldY =
      (pointer.y - camera.y) /
      oldZoom;

    setCamera({
      zoom: newZoom,

      x:
        pointer.x -
        worldX * newZoom,

      y:
        pointer.y -
        worldY * newZoom,
    });
  };

  /* ==========================================
     PAN
     ========================================== */

  const handleDragEnd = (e) => {
    setCamera((current) => ({
      ...current,
      x: e.target.x(),
      y: e.target.y(),
    }));
  };

  /* ==========================================
     POSITIONS
     ========================================== */

  /*
   * Books are centered around x = 0.
   */

  const movieStartX =
    SECTION_WIDTH / 2 +
    MOVIE_OFFSET_X;

  const movieGridWidth =
    MOVIES_PER_ROW *
      MOVIE_WIDTH +
    (MOVIES_PER_ROW - 1) *
      MOVIE_GAP;

  /*
   * Music is to the LEFT of Books.
   *
   * The right edge of the music area is
   * MUSIC_OFFSET_X away from the left
   * edge of the bookshelf.
   */

  const musicStartX =
    -SECTION_WIDTH / 2 -
    MUSIC_OFFSET_X;

  return (
    <div className="library">
      <Stage
        ref={stageRef}
        width={size.width}
        height={size.height}
        x={camera.x}
        y={camera.y}
        scaleX={camera.zoom}
        scaleY={camera.zoom}
        draggable
        onWheel={handleWheel}
        onDragEnd={handleDragEnd}
      >
        <Layer>

          {/* ==================================
              LIBRARY INTRO
              ================================== */}

          <Group
            x={-SECTION_WIDTH / 2}
            y={0}
          >
            <Text
              x={0}
              y={28}
              width={SECTION_WIDTH}
              text="Library"
              fontFamily={SERIF_FONT}
              fontSize={46}
              fontStyle="bold"
              fill="#202124"
              align="left"
            />

            <Text
              x={0}
              y={92}
              width={SECTION_WIDTH}
              text="To try to get back into reading since high school. Some of what I remember reading. Farther back I go my memory gets significantly more hazy, I have definitely read way more children's books than YA."
              fontFamily={SANS_FONT}
              fontSize={16}
              lineHeight={1.6}
              fill="#202124"
              align="left"
            />
          </Group>

          {/* ==================================
              BOOK SECTIONS
              ================================== */}

          {sectionItems.map(
            (section) => (
              <Group
                key={section.name}
                x={section.x}
                y={section.y}
              >

                {/* Wooden backboard */}

                <Rect
                  width={SECTION_WIDTH}
                  height={section.height}
                  cornerRadius={8}
                  fill="#7a5638"
                  shadowColor="#000"
                  shadowBlur={25}
                  shadowOpacity={0.22}
                  shadowOffsetY={12}
                  listening={false}
                />

                {/* Wood grain */}

                {Array.from({
                  length: Math.floor(
                    section.height / 22
                  ),
                }).map(
                  (_, index) => (
                    <Line
                      key={index}
                      points={[
                        0,
                        index * 22,
                        SECTION_WIDTH,
                        index * 22,
                      ]}
                      stroke="rgba(255,255,255,0.035)"
                      strokeWidth={2}
                      listening={false}
                    />
                  )
                )}

                {/* Section label */}

                <Group
                  x={24}
                  y={14}
                  rotation={-2}
                  listening={false}
                >
                  <Rect
                    width={145}
                    height={40}
                    fill="#fff2a8"
                    shadowColor="#000"
                    shadowBlur={8}
                    shadowOpacity={0.16}
                    shadowOffsetY={4}
                  />

                  <Text
                    x={14}
                    y={10}
                    width={117}
                    text={section.name}
                    fontFamily={SANS_FONT}
                    fontSize={16}
                    fill="#202124"
                    align="center"
                  />
                </Group>

                {/* Books */}

                {section.rows.map(
                  (
                    row,
                    rowIndex
                  ) => {
                    const rowY =
                      SECTION_PADDING_TOP +
                      rowIndex *
                        ROW_HEIGHT;

                    return (
                      <Group
                        key={rowIndex}
                        y={rowY}
                      >
                        {row.map(
                          (
                            book,
                            bookIndex
                          ) => (
                            <Book
                              key={`${book.title}-${bookIndex}`}
                              book={book}
                              x={
                                SECTION_PADDING_X +
                                bookIndex *
                                  (
                                    BOOK_WIDTH +
                                    BOOK_GAP
                                  )
                              }
                              y={0}
                            />
                          )
                        )}

                        {/* Shelf plank */}

                        <Rect
                          x={0}
                          y={
                            BOOK_HEIGHT +
                            25
                          }
                          width={
                            SECTION_WIDTH
                          }
                          height={
                            PLANK_HEIGHT
                          }
                          fill="#7f5c3e"
                          shadowColor="#000"
                          shadowBlur={10}
                          shadowOpacity={0.28}
                          shadowOffsetY={7}
                          listening={false}
                        />

                        <Rect
                          x={0}
                          y={
                            BOOK_HEIGHT +
                            25
                          }
                          width={
                            SECTION_WIDTH
                          }
                          height={4}
                          fill="#9a734f"
                          listening={false}
                        />
                      </Group>
                    );
                  }
                )}
              </Group>
            )
          )}

          {/* ==================================
              MOVIES
              ================================== */}

          <Group
            x={movieStartX}
            y={0}
          >
            {/* Movies title */}

            <Text
              x={0}
              y={28}
              width={movieGridWidth}
              text="Movies"
              fontFamily={SERIF_FONT}
              fontSize={46}
              fontStyle="bold"
              fill="#202124"
              align="left"
            />

            {/* Movies description */}

            <Group
              x={0}
              y={92}
            >
              <Text
                x={0}
                y={0}
                text="Movies I’ve watched recently on my "
                fontFamily={SANS_FONT}
                fontSize={16}
                fill="#202124"
              />

              <Text
                x={253}
                y={0}
                text="Letterboxd"
                fontFamily={SANS_FONT}
                fontSize={16}
                fill="#4a8df6"
                textDecoration="underline"
                onMouseEnter={(e) => {
                  const stage =
                    e.target.getStage();

                  if (stage) {
                    stage
                      .container()
                      .style.cursor =
                      "pointer";
                  }
                }}
                onMouseLeave={(e) => {
                  const stage =
                    e.target.getStage();

                  if (stage) {
                    stage
                      .container()
                      .style.cursor =
                      "grab";
                  }
                }}
                onClick={() => {
                  window.open(
                    LETTERBOXD_URL,
                    "_blank",
                    "noopener,noreferrer"
                  );
                }}
              />
            </Group>

            {/* Movie cards */}

            {films.map(
              (film, index) => {
                const column =
                  index %
                  MOVIES_PER_ROW;

                const row =
                  Math.floor(
                    index /
                      MOVIES_PER_ROW
                  );

                return (
                  <Movie
                    key={
                      film.link ||
                      `${film.title}-${index}`
                    }
                    film={film}
                    x={
                      column *
                      (
                        MOVIE_WIDTH +
                        MOVIE_GAP
                      )
                    }
                    y={
                      MOVIE_CONTENT_Y +
                      row *
                        MOVIE_ROW_HEIGHT
                    }
                  />
                );
              }
            )}
          </Group>

          {/* ==================================
              MUSIC
              ================================== */}

          <Group
            x={musicStartX}
            y={MUSIC_SECTION_Y}
          >
            {/* Music title */}

            <Text
              x={0}
              y={28}
              width={500}
              text="Music"
              fontFamily={SERIF_FONT}
              fontSize={46}
              fontStyle="bold"
              fill="#202124"
              align="left"
            />

            {/* Music description + Spotify link */}

            <Group
              x={0}
              y={92}
            >
              <Text
                x={0}
                y={0}
                text="Music that I'm currently listening to from "
                fontFamily={SANS_FONT}
                fontSize={16}
                fill="#202124"
              />

              <Text
                x={285}
                y={0}
                text="Spotify"
                fontFamily={SANS_FONT}
                fontSize={16}
                fill="#4a8df6"
                textDecoration="underline"
                onMouseEnter={(e) => {
                  const stage =
                    e.target.getStage();

                  if (stage) {
                    stage
                      .container()
                      .style.cursor =
                      "pointer";
                  }
                }}
                onMouseLeave={(e) => {
                  const stage =
                    e.target.getStage();

                  if (stage) {
                    stage
                      .container()
                      .style.cursor =
                      "grab";
                  }
                }}
                onClick={() => {
                  window.open(
                    SPOTIFY_PLAYLIST_URL,
                    "_blank",
                    "noopener,noreferrer"
                  );
                }}
              />
            </Group>

            {/* Music cards */}

            <Music
              x={0}
              y={130}
            />
          </Group>

        </Layer>
      </Stage>
    </div>
  );
}
