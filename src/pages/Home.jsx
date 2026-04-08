import { Link } from 'react-router-dom';
import profileImage from '../assets/profile.png';

export default function Home() {
  return (
    <section className="home-page">
      <div className="home-portrait-wrap">
        <img className="home-portrait" src="https://www.dropbox.com/scl/fi/byiuymx9elmj6zp49tpxo/sophiecrop.jpeg?rlkey=yyo9pf9kg81b7b2uvs848pdhv&st=dslp9w9z&raw=1"/>
      </div>

      <div className="home-copy">
        <h1>About</h1>
        <p>
          Hi! I&apos;m Boon, a software engineer at <Link to="https://radar.com">Radar</Link>.  Previously I graduated software engineering from the University of Waterloo in
          2024. I love coding, maps, reading, and may try to relearn how to play some instruments
          eventually. Check out my <Link to="/photography">photography learning curve</Link> and{' '}
          <Link to="/blog">random stuff</Link> I find interesting.
        </p>

        <p className="home-links">
          <a href="https://drive.google.com/file/d/1pk50WpJ9QCX0-vkjqx5m0HBlcUGcn9Uk/view" target="_blank" rel="noreferrer">
            resume
          </a>
          <span>|</span>
          <a href="https://github.com/boonboonsiri" target="_blank" rel="noreferrer">
            github
          </a>
          <span>|</span>
          <a href="https://www.linkedin.com/in/boonboonsiri/" target="_blank" rel="noreferrer">
            linkedin
          </a>
        </p>
      </div>
    </section>
  );
}
