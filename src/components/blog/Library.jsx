"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Stage, Layer } from "react-konva";

import { books } from "../../content/books";
import Book from "./Book";

import "../../styles/Library.scss";

const MIN_ZOOM = 0.25;
const MAX_ZOOM = 3;
const ZOOM_SPEED = 1.08;

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
   * For now, just lay the books out in a grid.
   *
   * These coordinates are WORLD coordinates,
   * not screen coordinates.
   */
  const bookItems = useMemo(() => {
    const columns = 6;

    const horizontalSpacing = 220;
    const verticalSpacing = 320;

    return books.map((book, index) => ({
      book,

      x:
        (index % columns) *
          horizontalSpacing -
        500,

      y:
        Math.floor(index / columns) *
          verticalSpacing -
        300,
    }));
  }, []);

  /*
   * Keep the Stage the size of the window.
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
   * Zoom around the mouse pointer.
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
      Math.min(MAX_ZOOM, newZoom)
    );

    /*
     * Find the world position underneath
     * the mouse before zooming.
     */
    const worldX =
      (pointer.x - camera.x) /
      oldZoom;

    const worldY =
      (pointer.y - camera.y) /
      oldZoom;

    /*
     * Keep that world position underneath
     * the mouse after zooming.
     */
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
   * Konva handles the actual dragging.
   *
   * We only save the new camera position.
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
          {bookItems.map((item) => (
            <Book
              key={item.book.title}
              book={item.book}
              x={item.x}
              y={item.y}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
}
