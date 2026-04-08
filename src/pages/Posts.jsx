import { Link } from 'react-router-dom';
import { getAllPosts, getPostYear } from '../lib/posts';

const posts = getAllPosts();

export default function Posts() {
  return (
    <section className="blog-index narrow-page">
      <header className="section-header">
        <h1>Posts</h1>

      </header>

      <div className="blog-list">
        {posts.map((post) => (
          <article key={post.slug} className="blog-list-item">
            <h2 className="blog-list-title">
              <Link className="blog-list-link" to={`/blog/${post.slug}`}>
                {post.title}
              </Link>
            </h2>

            <p className="blog-list-meta">
              <span>{getPostYear(post)}</span>
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
