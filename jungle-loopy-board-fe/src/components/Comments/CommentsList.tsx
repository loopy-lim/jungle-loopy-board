import CommentTextarea from "@/components/Comments/CommentTextarea";
import { Button } from "@/components/ui/button";
import {
  commentQueryKeys,
  useDeleteCommentMutate,
  useGetAllCommentsQuery,
} from "@/hooks/react-query/useCommentQuery";
import useGetUserInfo from "@/hooks/react-query/useUserQuery/useGetUserInfoQuery";
import { unixtimeConvertorToKorean } from "@/lib/convertor";
import { useQueryClient } from "@tanstack/react-query";

interface CommentsListProps {
  postId: number;
}

const currentTime = new Date().getTime();

const CommentsList = ({ postId }: CommentsListProps) => {
  const { data: comments } = useGetAllCommentsQuery({ postId });
  const { mutate: removeComment } = useDeleteCommentMutate(postId);
  const queryClient = useQueryClient();
  const { data: user } = useGetUserInfo();

  const onRemoveComment = (commentId: number) => {
    confirm("삭제하시겠습니까?") &&
      removeComment(
        { commentId },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: commentQueryKeys.comment(),
            });
          },
          onError: () => {
            alert("댓글 삭제에 실패했습니다.");
          },
        },
      );
  };

  return (
    <>
      <div className="mt-8 border-t-2 pt-4 text-2xl">Comments</div>
      <ul>
        {comments?.map((comment) => (
          <li className="my-4 rounded-md border" key={comment.comment_pk}>
            <div className="flex items-center justify-between bg-slate-100 px-6 py-4">
              <div className="flex gap-2">
                <div className="text-lg font-semibold">{comment.user.name}</div>
                <div>
                  {unixtimeConvertorToKorean(
                    currentTime - comment.updated_at.getTime(),
                  )}
                </div>
              </div>
              {user?.email === comment.user.email && (
                <div className="flex gap-2">
                  <Button
                    variant="destructive"
                    onClick={() => onRemoveComment(comment.comment_pk)}
                  >
                    삭제
                  </Button>
                  <Button variant="outline">수정</Button>
                </div>
              )}
            </div>
            <div className="px-6 py-4">{comment.content}</div>
          </li>
        ))}
      </ul>
      <CommentTextarea postId={postId} />
    </>
  );
};

export default CommentsList;
