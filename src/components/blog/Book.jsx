import { useState } from "react";

import {
  Group,
  Image as KonvaImage,
  Rect,
  Line,
  Text,
} from "react-konva";

import useImage from "use-image";

const SANS_FONT =
  'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif';

const BOOK_WIDTH = 170;
const BOOK_HEIGHT = 255;

export default function Book({
  book,
  x,
  y,
}) {
  const [image] = useImage(book.cover);

  const [hovered, setHovered] =
    useState(false);

  const animateBook = (
    e,
    hovering
  ) => {
    const group =
      e.currentTarget;

    group.to({
      y: hovering ? y - 5 : y,
      rotation: hovering ? -1 : 0,
      scaleX: hovering ? 0.98 : 1,
      scaleY: hovering ? 1.01 : 1,
      duration: hovering
        ? 0.12
        : 0.15,
      easing:
        window.Konva.Easings.EaseInOut,
    });
  };

  return (
    <Group
      x={x}
      y={y}
      onMouseEnter={(e) => {
        setHovered(true);

        animateBook(e, true);

        const stage =
          e.target.getStage();

        if (stage) {
          stage.container().style.cursor =
            "pointer";
        }
      }}
      onMouseLeave={(e) => {
        setHovered(false);

        animateBook(e, false);

        const stage =
          e.target.getStage();

        if (stage) {
          stage.container().style.cursor =
            "grab";
        }
      }}
      onClick={() => {
        console.log(
          "Clicked:",
          book.title
        );
      }}
    >
      {/* Shadow */}

      <Rect
        x={0}
        y={0}
        width={BOOK_WIDTH}
        height={BOOK_HEIGHT}
        fill="rgba(0,0,0,0.01)"
        shadowColor="#000"
        shadowBlur={
          hovered ? 19 : 16
        }
        shadowOpacity={0.25}
        shadowOffsetY={
          hovered ? 10 : 8
        }
        listening={false}
      />

      {/* Very subtle page edge */}

      <Rect
        x={BOOK_WIDTH - 3}
        y={4}
        width={7}
        height={BOOK_HEIGHT - 8}
        fill="#e8dfd3"
        shadowColor="#000"
        shadowBlur={3}
        shadowOpacity={0.18}
        listening={false}
      />

      {/* Subtle page lines */}

      {Array.from({
        length: 18,
      }).map((_, index) => (
        <Line
          key={index}
          points={[
            BOOK_WIDTH - 2,
            10 + index * 13,
            BOOK_WIDTH + 1,
            10 + index * 13,
          ]}
          stroke="rgba(100,80,60,0.16)"
          strokeWidth={0.5}
          listening={false}
        />
      ))}

      {/* Book cover */}

      {image ? (
        <KonvaImage
          image={image}
          x={0}
          y={0}
          width={BOOK_WIDTH}
          height={BOOK_HEIGHT}
        />
      ) : (
        <Rect
          x={0}
          y={0}
          width={BOOK_WIDTH}
          height={BOOK_HEIGHT}
          fill="#ddd"
        />
      )}

      {/* Very subtle spine */}

      <Rect
        x={0}
        y={0}
        width={3}
        height={BOOK_HEIGHT}
        fill="rgba(0,0,0,0.12)"
        listening={false}
      />

      {/* Sticky note */}

      {book.note && (
        <Group
          x={BOOK_WIDTH - 66}
          y={10}
          rotation={5}
          listening={false}
        >
          <Rect
            width={60}
            height={70}
            fill="#fff4a8"
            shadowColor="#000"
            shadowBlur={7}
            shadowOpacity={0.22}
            shadowOffsetY={3}
          />

          <Text
            x={7}
            y={6}
            width={46}
            height={70}
            text={book.note}
            fontFamily={SANS_FONT}
            fontSize={10}
            lineHeight={1.2}
            fill="#222"
          />
        </Group>
      )}
    </Group>
  );
}
