import { useEffect, useMemo, useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

const INITIAL_COUNT = 9;
const LOAD_MORE_COUNT = 6;
const COLUMN_COUNT = 3;

export default function ImageGrid({ photos = [] }) {
  const [index, setIndex] = useState(-1);
  const [visibleCount, setVisibleCount] = useState(
    Math.min(INITIAL_COUNT, photos.length)
  );

  const visiblePhotos = photos.slice(0, visibleCount);

  useEffect(() => {
    const onScroll = () => {
      const nearBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 500;

      if (nearBottom && visibleCount < photos.length) {
        setVisibleCount((current) =>
          Math.min(current + LOAD_MORE_COUNT, photos.length)
        );
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [visibleCount, photos.length]);

  const columns = useMemo(() => {
    const cols = Array.from({ length: COLUMN_COUNT }, () => []);

    visiblePhotos.forEach((photo, photoIndex) => {
      cols[photoIndex % COLUMN_COUNT].push({
        ...photo,
        originalIndex: photoIndex,
      });
    });

    return cols;
  }, [visiblePhotos]);

  return (
    <>
      <div className="image-grid-masonry">
        {columns.map((column, columnIndex) => (
          <div key={columnIndex} className="image-grid-column">
            {column.map((photo) => (
              <button
                key={`${photo.src}-${photo.originalIndex}`}
                type="button"
                className="image-grid-item"
                onClick={() => setIndex(photo.originalIndex)}
                aria-label={
                  photo.alt || `Open photo ${photo.originalIndex + 1}`
                }
              >
                <img
                  src={photo.src}
                  alt={photo.alt || ''}
                  loading="lazy"
                  decoding="async"
                />
              </button>
            ))}
          </div>
        ))}
      </div>

      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        index={index}
        slides={visiblePhotos}
        carousel={{ padding: 24 }}
        styles={{
          container: { backgroundColor: '#ffffff' },
          slide: { backgroundColor: '#ffffff' },
        }}
      />
    </>
  );
}
