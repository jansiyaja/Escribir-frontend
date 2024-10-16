import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw'; 
import { BlogPostCardProps } from '../Interfaces/Components';

const SingleBlogCom: React.FC<{ blogPost: BlogPostCardProps }> = ({ blogPost }) => {
  return (
    <div>
    <div className="text-center mb-6">
     <h1 className="text-4xl font-bold text-gray-800">{blogPost.heading}</h1>
     <span className="bg-blue-600 text-white text-xs font-semibold px-2 py-1 mt-4 ms-1 rounded-lg">
      {blogPost.tag}
     </span>

     <div className="flex items-center mt-6 p-4 rounded-lg">
      <img
        src={blogPost.author_id.image}
        alt="Author"
        className="w-16 h-16 rounded-full mr-4"
      />
      <div>
        <p className="text-md text-gray-500 mt-2">
          <span className="font-semibold">
            Written by {blogPost.author_id.username}
          </span>{' '}
          | <span>{new Date(blogPost.createdAt).toLocaleDateString()}</span>
        </p>
      </div>
       </div>
      </div>

    <div className="mb-6">
      <img
        src={blogPost.coverImageUrl}
        alt={blogPost.heading}
        className="w-full h-auto rounded-lg"
      />
     </div>


    <div className="text-lg text-gray-700 leading-relaxed">
    <ReactMarkdown rehypePlugins={[rehypeRaw]}>
      {blogPost.content}
    </ReactMarkdown>
    </div>
  </div>
  )
}

export default SingleBlogCom
