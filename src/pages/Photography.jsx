import ImageGrid from '../components/ImageGrid';
import { photos } from '../content/photography';

export default function Photography() {
  return (
    <section className="photography-page page-shell">
      <div className="photography-main">
        <header className="photography-header">
          <h1>Photography</h1>
        </header>

        <ImageGrid photos={photos} />
      </div>
    </section>
  );
}
