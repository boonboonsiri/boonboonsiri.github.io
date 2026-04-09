import { useEffect, useRef, useState } from 'react';

function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return '';

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

function extractImage(html = '') {
  const match = html.match(/<img[^>]+src="([^"]+)"/i);
  return match ? match[1] : '';
}

function normalizeWhitespace(value = '') {
  return value.replace(/\s+/g, ' ').trim();
}

function pickBestRating(text = '') {
  const matches = text.match(/★★★★★|★★★★½|★★★★|★★★½|★★★|★★½|★★|★½|★/g) || [];
  if (!matches.length) return '';

  return matches.sort((a, b) => b.length - a.length)[0];
}

function splitTitleYearAndRating(raw = '') {
  const rating = pickBestRating(raw);

  const yearMatch = raw.match(/\b(19|20)\d{2}\b/);
  const year = yearMatch ? yearMatch[0] : '';

  const name = normalizeWhitespace(
    raw
      .replace(/★★★★★|★★★★½|★★★★|★★★½|★★★|★★½|★★|★½|★/g, '')
      .replace(/\b(19|20)\d{2}\b/g, '')
      .replace(/\s*-\s*/g, ' ')
      .replace(/,/g, ' ')
  );

  return {
    name,
    year,
    rating,
  };
}

export default function Letterboxd({ username = 'boonboonsiri' }) {
  const [films, setFilms] = useState([]);
  const scrollerRef = useRef(null);

  useEffect(() => {
    async function fetchFilms() {
      try {
        const res = await fetch(
          `https://api.rss2json.com/v1/api.json?rss_url=https://letterboxd.com/${username}/rss/`
        );

        const data = await res.json();

        const items = (data.items || []).slice(0, 10).map((item) => {
          const parsed = splitTitleYearAndRating(item.title);

          return {
            title: parsed.name,
            year: parsed.year,
            rating: parsed.rating,
            link: item.link,
            watchedDate: item.pubDate,
            poster: extractImage(item.description),
          };
        });

        setFilms(items);
      } catch (err) {
        console.error(err);
      }
    }

    fetchFilms();
  }, [username]);

  function scrollByCards(direction) {
    const container = scrollerRef.current;
    if (!container) return;

    const card = container.querySelector('[data-film-card]');
    if (!card) return;

    const cardWidth = card.getBoundingClientRect().width;
    const gap = 16;

    container.scrollBy({
      left: direction === 'left' ? -(cardWidth + gap) : cardWidth + gap,
      behavior: 'smooth',
    });
  }

  return (
    <section style={{ marginTop: '32px' }}>
      <div className="carousel">
        <button
          onClick={() => scrollByCards('left')}
          className="arrow left"
          aria-label="Scroll left"
        >
          ←
        </button>

        <button
          onClick={() => scrollByCards('right')}
          className="arrow right"
          aria-label="Scroll right"
        >
          →
        </button>

        <div ref={scrollerRef} className="hide-scrollbar scroller">
          {films.map((film) => (
            <a
              key={film.link}
              data-film-card
              href={film.link}
              target="_blank"
              rel="noreferrer"
              className="card"
            >
              {film.poster && <img src={film.poster} alt={film.title} />}

              <div className="title">
                <span className="title-name">{film.title}</span>
                {film.year && <span className="title-year"> {film.year}</span>}
              </div>

              {film.rating && <div className="rating">{film.rating}</div>}

              <div className="date">{formatDate(film.watchedDate)}</div>
            </a>
          ))}
        </div>
      </div>

      <style>
        {`
          .carousel {
            position: relative;
          }

          .scroller {
            display: flex;
            gap: 16px;
            overflow-x: auto;
            scroll-behavior: smooth;
            scroll-snap-type: x mandatory;
            padding-bottom: 8px;
            scrollbar-width: none;
          }

          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }

          .card {
            flex: 0 0 calc(25% - 12px);
            min-width: calc(25% - 12px);
            text-decoration: none;
            color: inherit;
            scroll-snap-align: start;
          }

          .card img {
            width: 100%;
            height: 260px;
            object-fit: cover;
            border-radius: 4px;
            margin-bottom: 12px;
            display: block;
          }

          .title {
            font-size: 14px;
            line-height: 1.4;
          }

          .title-name {
            font-family: var(--serif);
            font-weight: 600;
          }

          .title-year {
            font-family: inherit;
            font-weight: 400;
          }

          .rating {
            font-size: 13px;
            color: #444;
            margin-top: 4px;
            line-height: 1.4;
          }

          .date {
            font-size: 13px;
            color: #666;
            margin-top: 4px;
            line-height: 1.4;
          }

          .arrow {
            position: absolute;
            top: 40%;
            transform: translateY(-50%);
            width: 40px;
            height: 40px;
            border-radius: 999px;
            border: 1px solid #ddd;
            background: white;
            cursor: pointer;
            font-size: 18px;
            opacity: 0;
            transition: opacity 0.2s ease;
            z-index: 2;
          }

          .arrow.left {
            left: -8px;
          }

          .arrow.right {
            right: -8px;
          }

          .carousel:hover .arrow {
            opacity: 1;
          }
        `}
      </style>
    </section>
  );
}
