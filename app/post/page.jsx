// pages/post/[id].tsx
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const PostDetails = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session } = useSession();
  const promptId = searchParams.get('id');

  const [post, setPost] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await fetch(`/api/prompt/${promptId}`);
        if (!response.ok) throw new Error('Failed to fetch post details');
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error('Error fetching post details:', error);
      }
    };

    if (promptId) fetchPostDetails();
  }, [promptId]);

  const handleDelete = async () => {
    if (!promptId || !confirm('Are you sure you want to delete this post?')) return;

    setIsDeleting(true);

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        router.push('/'); // Redirect to home page after deletion
      } else {
        throw new Error('Failed to delete the post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = () => {
    router.push(`/update-post?id=${promptId}`);
  };

  if (!post) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{post.title}</h1>
      <h1 className="text-lg text-gray-800 mb-4">{post.prompt}</h1>
      <p className="text-gray-600 mb-4">
        <span className="font-semibold">Tag:</span> #{post.tag}
      </p>
      <div className="flex items-center mb-6">
        <img
          src={post.creator.image}
          alt={`${post.creator.username}'s profile`}
          className="w-12 h-12 rounded-full object-cover mr-4"
        />
        <div>
          <h2 className="text-lg font-semibold text-gray-800">{post.creator.username}</h2>
          <p className="text-sm text-gray-500">{post.creator.email}</p>
        </div>
      </div>

      {session?.user.id === post.creator._id && (
        <div className="flex gap-4 mt-6">
          <button
            onClick={handleEdit}
            className="black_btn"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className={`outline_btn ${
              isDeleting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      )}
    </div>
  );
};

export default PostDetails;
