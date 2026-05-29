import { useState, useRef, useEffect, useMemo } from "react";
import { books } from "../../content/books";
// import { photos } from '../content/photography';

import "../../styles/Bookshelf.scss";

const NOTE_POS = ["np1", "np2", "np3"];

// keep these in sync with the values in Bookshelf.scss
function getDims() {
  const mobile = window.innerWidth <= 900;
  return {
    bw: mobile ? 130 : 170,
    gap: mobile ? 18 : 26,
    framePad: mobile ? 16 : 18,
    rowPad: mobile ? 16 : 24,
  };
}

function chunk(arr, n) {
  const out = [];
  for (let i = 0; i < arr.length; i += n) out.push(arr.slice(i, i + n));
  return out;
}

export default function Bookshelf() {
  const caseRef = useRef(null);
  const [perRow, setPerRow] = useState(6);

  // group books into shelves, preserving first-seen order
  const shelves = useMemo(() => {
    const order = [];
    const map = new Map();
    for (const b of books) {
      if (!map.has(b.shelf)) {
        map.set(b.shelf, []);
        order.push(b.shelf);
      }
      map.get(b.shelf).push(b);
    }
    return order.map((name) => ({ name, books: map.get(name) }));
  }, []);

  // how many books fit per row, recomputed on resize
  useEffect(() => {
    const el = caseRef.current;
    if (!el) return;

    const compute = () => {
      const { bw, gap, framePad, rowPad } = getDims();
      const width = Math.min(el.clientWidth, 1500);
      const inner = width - framePad * 2 - rowPad * 2;
      setPerRow(Math.max(1, Math.floor((inner + gap) / (bw + gap))));
    };

    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="bookcase" ref={caseRef}>
      {shelves.map((shelf) =>
        chunk(shelf.books, perRow).map((row, ri) => (
          <div className="shelf-row" key={`${shelf.name}-${ri}`}>
            {ri === 0 && <div className="section-note">{shelf.name}</div>}

            <div className="books">
              {row.map((b, bi) => (
                <div className="book" key={`${shelf.name}-${b.title}`}>
                  {b.note && (
                    <div className={`cover-note ${NOTE_POS[bi % NOTE_POS.length]}`}>
                      {b.note}
                    </div>
                  )}
                  <div className="cover">
                    <img src={b.cover} alt={b.title} />
                  </div>
                  <div className="pages" />
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
