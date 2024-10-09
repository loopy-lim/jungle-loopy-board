import { Comment as CommentDto } from "@/apis/comments/dtos";
import BlockNoteView from "@/components/common/BlockNote";
import CommentUpdate from "@/components/Comments/CommentUpdate";
import ErrorBoundary from "@/components/common/ErrorBundray";
import { Button } from "@/components/ui/button";
import {
  commentQueryKeys,
  useDeleteCommentMutate,
} from "@/hooks/react-query/useCommentQuery";
import useGetUserInfo from "@/hooks/react-query/useUserQuery/useGetUserInfoQuery";
import { unixtimeConvertorToKorean } from "@/lib/convertor";
import { useQueryClient } from "@tanstack/react-query";
import { memo, Suspense, useState } from "react";

interface CommentProps {
  comment: CommentDto;
  postId: number;
}

const currentTime = new Date().getTime();

const Comment = ({ comment, postId }: CommentProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const { data: user } = useGetUserInfo();
  const { mutate: removeComment } = useDeleteCommentMutate(postId);
  const queryClient = useQueryClient();

  const onEditComment = () => {
    setIsEditing((prev) => !prev);
  };

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
    <li className="my-4 rounded-md border">
      <div className="flex items-center justify-between bg-slate-100 px-6 py-4">
        <div className="flex gap-2">
          <div className="text-lg font-semibold">{comment.user.name}</div>
          <div>
            {unixtimeConvertorToKorean(
              currentTime - comment.updated_at.getTime(),
            )}
          </div>
        </div>
        {user?.email === comment.user.email && !isEditing && (
          <div className="flex gap-2">
            <Button
              variant="destructive"
              onClick={() => onRemoveComment(comment.comment_pk)}
            >
              삭제
            </Button>
            <Button variant="outline" onClick={onEditComment}>
              수정
            </Button>
          </div>
        )}
        {isEditing && (
          <Button variant="outline" onClick={onEditComment}>
            취소
          </Button>
        )}
      </div>
      <div className="pt-4">
        {isEditing ? (
          <ErrorBoundary>
            <Suspense>
              <CommentUpdate
                postId={postId}
                commentId={comment.comment_pk}
                initialContent={comment.content}
                afterUpdate={onEditComment}
              />
            </Suspense>
          </ErrorBoundary>
        ) : (
          <BlockNoteView contents={comment.content} />
        )}
      </div>
    </li>
  );
};

const MemoizedComment = memo(Comment, (prevProps, nextProps) => {
  return (
    prevProps.comment.updated_at.getTime() ===
    nextProps.comment.updated_at.getTime()
  );
});

export default MemoizedComment;
