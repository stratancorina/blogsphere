import Link from 'next/link';
import { useState } from 'react';

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  const [errors, setErrors] = useState({ title: '', prompt: '', tag: '' });

  const validateForm = () => {
    let isValid = true;
    const newErrors = { title: '', prompt: '', tag: '' };

    // Validate title (must start with a capital letter)
    if (!/^[A-Z]/.test(post.title)) {
      newErrors.title = 'Title must start with a capital letter.';
      isValid = false;
    }

    // Validate prompt (text cannot be empty)
    if (!post.prompt.trim()) {
      newErrors.prompt = 'Post content cannot be empty.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      handleSubmit(e); // Call the original submit handler if validation passes
    }
  };

  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <form
        onSubmit={onSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Title
          </span>
          <input
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
            placeholder="Title"
            required
            className={`form_input ${errors.title ? 'border-red-500' : ''}`}
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </label>

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your Post
          </span>
          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder="Write your post here"
            required
            className={`form_textarea ${errors.prompt ? 'border-red-500' : ''}`}
          />
          {errors.prompt && <p className="text-red-500 text-sm mt-1">{errors.prompt}</p>}
        </label>

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tag
            <span> (#nature, #motivation, #learning)</span>
          </span>
          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            placeholder="#tag"
            required
            className={`form_input ${errors.tag ? 'border-red-500' : ''}`}
          />
          {errors.tag && <p className="text-red-500 text-sm mt-1">{errors.tag}</p>}
        </label>

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>

          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
          >
            {submitting ? `${type}ing...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
