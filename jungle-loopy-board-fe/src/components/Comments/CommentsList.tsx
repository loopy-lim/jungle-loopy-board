import { CommentCreate, Comment } from "@/components/Comments";
import { useGetAllCommentsQuery } from "@/hooks/react-query/useCommentQuery";
import { useGetUserInfoQuery } from "@/hooks/react-query/useUserQuery";

interface CommentsListProps {
  postId: number;
}

const CommentsList = ({ postId }: CommentsListProps) => {
  const { data: comments } = useGetAllCommentsQuery({ postId });
  const { data: user } = useGetUserInfoQuery();

  return (
    <>
      <div className="mt-8 border-t-2 pt-4 text-2xl">Comments</div>
      <ul>
        {comments?.map((comment) => (
          <Comment key={comment.comment_pk} comment={comment} postId={postId} />
        ))}
      </ul>
      {!!user && !!user.email && <CommentCreate postId={postId} />}
    </>
  );
};

export default CommentsList;
