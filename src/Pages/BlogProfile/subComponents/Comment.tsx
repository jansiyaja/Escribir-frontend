import { comment } from "../../../Interfaces/Components";

interface CommentSectionProps {
  comments: comment[];
  newComment: string;
  setNewComment: React.Dispatch<React.SetStateAction<string>>;
  handleAddComment: () => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({
  comments,
  newComment,
  setNewComment,
  handleAddComment,
}) => {
  return (
    <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4 border-b pb-2">Comments</h3>

      <div className="mb-6">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="border rounded-lg w-full h-24 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Write your comment..."
        />
        <button
          className="mt-2 bg-blue-600 text-white py-2 px-4 rounded transition duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={handleAddComment}
        >
          Add Comment
        </button>
      </div>

      <div>
        {comments.length === 0 ? (
          <p className="text-gray-600">No comments yet. Be the first to comment!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="bg-gray-50 p-4 mb-4 rounded-lg shadow-sm">
              <p className="text-gray-800"><strong>Comment:</strong> {comment.content}</p>
              <p className="text-gray-500 text-sm"><strong>Created At:</strong> {comment.createdAt}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentSection;
