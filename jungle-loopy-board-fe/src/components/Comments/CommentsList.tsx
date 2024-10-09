import { useGetAllCommentsQuery } from "@/hooks/react-query/useCommentQuery";
import { unixtimeConvertorToKorean } from "@/lib/convertor";

interface CommentsListProps {
  postId: number;
}

const currentTime = new Date().getTime();

const CommentsList = ({ postId }: CommentsListProps) => {
  const { data: comments } = useGetAllCommentsQuery({ postId });

  return (
    <>
      <div className="mt-8 border-t-2 pt-4 text-2xl">Comments</div>
      <ul>
        {comments?.map((comment) => (
          <li className="my-4 rounded-md border" key={comment.comment_pk}>
            <div className="flex gap-2 bg-slate-100 px-6 py-4">
              <div className="text-lg font-semibold">{comment.user.name}</div>
              <div>
                {unixtimeConvertorToKorean(
                  currentTime - comment.updated_at.getTime(),
                )}
              </div>
            </div>
            <div className="px-6 py-4">{comment.content}</div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default CommentsList;
