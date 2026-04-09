import { MDXProvider } from '@mdx-js/react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { getPostBySlug } from '../lib/posts';

const mdxComponents = {
  a: (props) => <a {...props} target={props.href?.startsWith('http') ? '_blank' : undefined} rel={props.href?.startsWith('http') ? 'noreferrer' : undefined} />,
  pre: (props) => <pre className="mdx-code-block" {...props} />,
  code: (props) => <code className="mdx-inline-code" {...props} />
};

export default function Post() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);

  if (!post) {
    return <Navigate to="/posts" replace />;
  }

  const { Component } = post;

  return (
    <article className="post-page narrow-page">
      <Link className="back-link" to="/posts">
        ← Back to posts
      </Link>

      <header className="post-page__header">
        <p className="post-meta">
          <span className="post-date">{post.date}</span>
        </p>
        <h1>{post.title}</h1>
      </header>

      <MDXProvider components={mdxComponents}>
        <div className="mdx-content">
          <Component components={mdxComponents} />
        </div>
      </MDXProvider>
    </article>
  );
}
