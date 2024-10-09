import { CommentCreate, Comment } from "@/components/Comments";
import { useGetAllCommentsQuery } from "@/hooks/react-query/useCommentQuery";

interface CommentsListProps {
  postId: number;
}

const CommentsList = ({ postId }: CommentsListProps) => {
  const { data: comments } = useGetAllCommentsQuery({ postId });

  return (
    <>
      <div className="mt-8 border-t-2 pt-4 text-2xl">Comments</div>
      <ul>
        {comments?.map((comment) => (
          <Comment key={comment.comment_pk} comment={comment} postId={postId} />
        ))}
      </ul>
      <CommentCreate postId={postId} />
    </>
  );
};

export default CommentsList;
