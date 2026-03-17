import { useEffect, useState } from 'react';
import { fetchPosts } from './posts.api.ts';

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

export const PostList = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts()
      .then(setPosts)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <span className="loading loading-dots loading-lg"></span>;

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <div key={post.id} className="card bg-base-100 border-base-300 border shadow-xl">
          <div className="card-body">
            <div className="flex items-start justify-between gap-1">
              <h2 className="card-title text-primary">{post.title}</h2>
              <div className="badge badge-secondary badge-outline text-xs">Post</div>
            </div>
            <p className="line-clamp-3 text-sm opacity-80">{post.content}</p>
            <div className="card-actions mt-4 items-center justify-between">
              <span className="text-xs font-bold italic">By {post.author}</span>
              <button className="btn btn-primary btn-sm">Read More</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
