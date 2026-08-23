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

import "../../styles/Library.scss";

const MIN_ZOOM = 0.25;
const MAX_ZOOM = 3;
const ZOOM_SPEED = 1.08;

const BOOK_WIDTH = 170;
const BOOK_HEIGHT = 255;

const BOOK_GAP = 26;
const ROW_HEIGHT = 330;

const SECTION_PADDING_X = 30;
const SECTION_PADDING_TOP = 65;
const SECTION_PADDING_BOTTOM = 45;

const PLANK_HEIGHT = 20;

/*
 * How wide each section is.
 */
const SECTION_WIDTH = 6 * BOOK_WIDTH + 5 * BOOK_GAP + 60;

export default function Library() {
  const stageRef = useRef(null);

  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });

  const [camera, setCamera] = useState({
    x: 0,
    y: 0,
    zoom: 1,
  });

  /*
   * ============================================
   * GROUP BOOKS INTO SECTIONS
   * ============================================
   *
   * This preserves the first-seen ordering
   * from your original implementation.
   */

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

  /*
   * ============================================
   * BUILD SECTION POSITIONS
   * ============================================
   */

  const sectionItems = useMemo(() => {
    let currentY = 0;

    return sections.map((section) => {
      const rows = [];

      for (
        let i = 0;
        i < section.books.length;
        i += 6
      ) {
        rows.push(
          section.books.slice(
            i,
            i + 6
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

      currentY += height + 10;

      return result;
    });
  }, [sections]);

  /*
   * ============================================
   * WINDOW SIZE
   * ============================================
   */

  useEffect(() => {
    const resize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
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

  /*
   * ============================================
   * ZOOM
   * ============================================
   */

  const handleWheel = (e) => {
    e.evt.preventDefault();

    const stage = stageRef.current;

    if (!stage) return;

    const pointer =
      stage.getPointerPosition();

    if (!pointer) return;

    const oldZoom = camera.zoom;

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

  /*
   * ============================================
   * PAN
   * ============================================
   */

  const handleDragEnd = (e) => {
    setCamera((current) => ({
      ...current,

      x: e.target.x(),
      y: e.target.y(),
    }));
  };

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

          {/* ================================= */}
          {/* BOOKCASE                          */}
          {/* ================================= */}

          <Group>

            {sectionItems.map(
              (section) => (
                <Group
                  key={section.name}
                  x={section.x}
                  y={section.y}
                >

                  {/* ========================= */}
                  {/* SECTION BACKGROUND         */}
                  {/* ========================= */}

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

                  {/* ========================= */}
                  {/* WOOD GRAIN                 */}
                  {/* ========================= */}

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

                  {/* ========================= */}
                  {/* SECTION LABEL              */}
                  {/* ========================= */}

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
                      fontSize={16}
                      fill="#222"
                      align="center"
                    />
                  </Group>

                  {/* ========================= */}
                  {/* BOOK ROWS                  */}
                  {/* ========================= */}

                  {section.rows.map(
                    (row, rowIndex) => {
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
                                    (BOOK_WIDTH +
                                      BOOK_GAP)
                                }
                                y={0}
                              />
                            )
                          )}

                          {/* ===================== */}
                          {/* SHELF PLANK            */}
                          {/* ===================== */}

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

          </Group>

        </Layer>
      </Stage>
    </div>
  );
}
