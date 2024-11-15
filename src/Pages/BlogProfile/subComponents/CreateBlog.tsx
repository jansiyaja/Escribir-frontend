import { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import BlogPreview from './BlogPreview';
import { Tag } from '../../../Interfaces/Components';
import ToastComponent from '../../../Components/ToastNotification';
import { handleAxiosError } from '../../../utils/errorHandling';
import { createBlogPost, listTags } from '../../../services/Api/blogApi';

const CreateBlog = () => {
  const [showPreview, setShowPreview] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [heading, setHeading] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string>(''); 
  const [editorContent, setEditorContent] = useState<string>(''); 
  const [tags, setTags] = useState<Tag[]>([]);
  const [error, setError] = useState<string | null>(null); 

  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await listTags()
        setTags(response.data);
      } catch (err) {
        setError('Failed to load tags');
      }
    };

    fetchTags();
  }, []);

  const savePost = async (isPublished: boolean) => {
    if (!editorContent || editorContent.trim() === '') {
      console.error('No valid content to save.');
      return;
    }

    const formData = new FormData();
    formData.append('heading', heading);
    formData.append('tag', selectedTag);
    if (coverImage) {
      formData.append('coverImage', coverImage); 
    }
    formData.append('content', editorContent);

    try {
      const status = isPublished ? 'published' : 'draft';
      formData.append('status', status);

      const response = await createBlogPost(formData);
      if (response.status = 200) {
        resetForm();
        console.log("create blog success");
        
      }

     

      if (isPublished) {
        setToastMessage('Blog published successfully!');
      } else {
        setToastMessage('Blog saved successfully!');
      }
      setToastType('success');
      setToastOpen(true);
      setShowPreview(false);
    } catch (error) {
      const errorMessage = handleAxiosError(error);
      setError(errorMessage);
      setToastMessage('Failed to save the post. Please try again.');
      setToastType('error');
      setToastOpen(true);
    }
  };

  const resetForm = () => {
    setHeading('');
    setSelectedTag('');
    setEditorContent('');
    setCoverImage(null);
    setImagePreview(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center">
      <div className="w-full max-w-4xl p-8 bg-white shadow-lg rounded-lg">
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Create a New Blog Post</h1>
          <button
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            onClick={() => setShowPreview(true)}
          >
            Preview
          </button>
        </div>

        <div className="flex flex-col space-y-4">
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">Add Cover Image</label>
            <input
              type="file"
              accept="image/*"
              className="block w-full text-sm text-gray-500 border border-gray-300 rounded-md mb-2"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setCoverImage(file);
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setImagePreview(reader.result as string);
                  };
                  reader.readAsDataURL(file);
                } else {
                  setImagePreview(null);
                }
              }}
            />
            {imagePreview && (
              <div className="w-full h-48 border border-gray-300 rounded-md overflow-hidden">
                <img src={imagePreview} alt="Cover Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          <input
            type="text"
            placeholder="Heading..."
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
            className="w-full p-4 text-3xl font-bold border border-gray-300 text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div>
            <label className="block text-lg font-medium text-gray-700">Select Tag</label>
            {error && <p className="text-red-500">{error}</p>} 
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="w-full p-3 border border-gray-300 text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a tag</option>
              {tags.map((tag) => (
                <option key={tag._id} value={tag.name}>
                  {tag.name}
                </option>
              ))}
            </select>
          </div>

          <ReactQuill
            theme="snow"
            value={editorContent}
            onChange={setEditorContent}
            placeholder="Start writing your blog..."
            modules={{
              toolbar: [
                ['bold', 'italic', 'underline', 'strike'],
                ['blockquote', 'code-block'],
                [{ list: 'ordered' }, { list: 'bullet' }],
                [{ script: 'sub' }, { script: 'super' }],
                [{ header: [1, 2, 3, false] }],
                ['link', 'image'],
                ['clean'],
              ],
            }}
          />

          <div className="flex justify-between mt-4">
            <button
              onClick={() => savePost(false)} 
              className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Save
            </button>
            <button
              onClick={() => savePost(true)} // Publish
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Publish
            </button>
          </div>
        </div>
      </div>

      {showPreview && (
        <BlogPreview
          heading={heading}
          image={imagePreview}
          tag={selectedTag}
          content={editorContent}
          onClose={() => setShowPreview(false)}
        />
      )}

      <ToastComponent
        open={toastOpen} 
        setOpen={setToastOpen}
        message={toastMessage}
        type={toastType}
      />
    </div>
  );
};

export default CreateBlog;
