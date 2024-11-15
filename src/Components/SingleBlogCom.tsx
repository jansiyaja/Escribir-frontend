import React, { useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { BlogPostCardProps } from '../Interfaces/Components';

const SingleBlogCom: React.FC<{ blogPost: BlogPostCardProps }> = ({ blogPost }) => {
  const handleCopy = useCallback((code: string) => {
    navigator.clipboard.writeText(code)
      .then(() => {
        alert('Code copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-5">
      <span className="bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-lg">
        {blogPost.tag}
      </span>

      <h1 className="text-4xl font-bold text-gray-800 mt-4 mb-4">
        {blogPost.heading}
      </h1>

      <div className="mb-6">
        <img
          src={blogPost.coverImageUrl}
          alt={blogPost.heading}
          className="w-full h-auto rounded-lg"
        />
      </div>

      <div className="text-lg text-gray-700 leading-relaxed mb-6">
        <ReactMarkdown 
          rehypePlugins={[rehypeRaw]} 
          components={{
            h1: ({ node, ...props }) => <h1 className="text-3xl font-bold text-gray-800 mt-4 mb-2" {...props} />,
            h2: ({ node, ...props }) => <h2 className="text-2xl font-semibold text-gray-800 mt-3 mb-2" {...props} />,
            h3: ({ node, ...props }) => <h3 className="text-xl font-semibold text-gray-800 mt-2 mb-2" {...props} />,
            p: ({ node, ...props }) => <p className="mb-4" {...props} />,
            code: ({ node, className, children, ...props }) => (
              <code className={`bg-purple-200 text-purple-800 rounded px-1 py-0.5 ${className}`} {...props}>
                {children}
              </code>
            ),
            pre: ({  children }) => (
              <div className="relative mb-4">
                <button
                  onClick={() => handleCopy(children as string)}
                  className="absolute right-2 top-2 bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600"
                >
                  Copy
                </button>
                <pre className="bg-black text-white border-l-4 border-blue-600 p-4 rounded overflow-auto">
                  {children}
                </pre>
              </div>
            ),
            ul: ({ node, ...props }) => <ul className="list-disc list-inside mb-4" {...props} />,
            ol: ({ node, ...props }) => <ol className="list-decimal list-inside mb-4" {...props} />,
            li: ({ node, ...props }) => <li className="ml-4 mb-2" {...props} />,
          }}
        >
          {blogPost.content}
        </ReactMarkdown>
      </div>

      {/* Author Info */}
      <div className="flex items-center mt-6 p-4 bg-gray-100 rounded-lg">
        <img
          src={blogPost.author_id.image}
          alt="Author"
          className="w-16 h-16 rounded-full mr-4"
        />
        <div>
          <p className="text-md text-gray-500">
            <span className="font-semibold">
              Written by {blogPost.author_id.username}
            </span>{' '}
            | <span>{new Date(blogPost.createdAt).toLocaleDateString()}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SingleBlogCom;
