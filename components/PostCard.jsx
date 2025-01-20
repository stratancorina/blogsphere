'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';

const PostCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();
  const [copied, setCopied] = useState('');

  // const handleCopy = () => {
  //   setCopied(post.prompt);
  //   navigator.clipboard.writeText(post.prompt);
  //   setTimeout(() => setCopied('', 3000));
  // };

  const handleReadPost = () => {
    // router.push(`/post/${post._id}`)
    router.push(`/post?id=${post._id}`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    const formattedTime = date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
    return { formattedDate, formattedTime };
  };

  const { formattedDate, formattedTime } = formatDate(post.date);

  return (
    <div className="post_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex flex-row gap-2">
          <Image
            src={post.creator.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi text-gray-900">
              {post.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.creator.email}
            </p>
          </div>
        </div>
      </div>
      <p className="my-4 font-satoshi text-xl font-bold text-gray-800">
        {post.title}
      </p>
      <p className="my-4 font-satoshi text-sm text-gray-700 overflow-hidden text-ellipsis h-20"
        style={{
          WebkitLineClamp: 4, // Limit to 3 lines (you can adjust this number)
          WebkitBoxOrient: 'vertical',
          display: '-webkit-box',
        }}
        >{post.prompt}</p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        #{post.tag}
      </p>

      <hr className="my-3" />
      {pathName !== '/dashboard' && (
        <div className="w-full flex justify-between">
          <button className="blue_btn" onClick={handleReadPost}>
            Read Post
          </button>
          <div className="text-end h-full flex flex-col">
            <p className="font-inter text-sm text-gray-500">{formattedDate}</p>
            <p className="font-inter text-sm text-gray-500">{formattedTime}</p>
          </div>
        </div>
      )}

      {session?.user.id === post.creator._id && pathName === '/dashboard' && (
        <div>
          <div className="">
            <p className="font-inter text-sm text-gray-500">{formattedDate}</p>
            <p className="font-inter text-sm text-gray-500">{formattedTime}</p>
          </div>
          <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
            <button className="blue_btn" onClick={handleReadPost}>
              Read Post
            </button>
            <button className="outline_btn" onClick={handleEdit}>
              Edit
            </button>
            <button className="delete_btn" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;
