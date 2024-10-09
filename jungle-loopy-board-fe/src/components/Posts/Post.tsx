import { CommentsList } from "@/components/Comments";
import BlockNote from "@/components/common/BlockNote";
import ErrorBoundary from "@/components/common/ErrorBundray";
import PostUpdate from "@/components/Posts/PostUpdate";
import { Button } from "@/components/ui/button";
import {
  useDeletePostMutate,
  useGetPostQuery,
} from "@/hooks/react-query/usePostQuery";
import postQueryKeys from "@/hooks/react-query/usePostQuery/queries";
import { useRandomImageQuery } from "@/hooks/react-query/useRandomImageQuery";
import { useGetUserInfoQuery } from "@/hooks/react-query/useUserQuery";
import { useQueryClient } from "@tanstack/react-query";
import { Suspense, useReducer } from "react";
import { useNavigate } from "react-router-dom";

interface PostProps {
  id: number;
}

const Post = ({ id }: PostProps) => {
  const { data: post } = useGetPostQuery({ id });
  const { data: user } = useGetUserInfoQuery();
  const { data: randomImage } = useRandomImageQuery();
  const { mutate: deletePost } = useDeletePostMutate({ id });
  const [isEditing, toggleEditing] = useReducer((state) => !state, false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const onDelete = () =>
    deletePost(void 0, {
      onSuccess: () => {
        alert("삭제되었습니다.");
        queryClient.invalidateQueries({
          queryKey: postQueryKeys.appPosts(),
        });
        navigate("/");
      },
      onError: () => {
        alert("삭제에 실패했습니다.");
      },
    });

  const afterUpdate = () => {
    toggleEditing();
  };

  return (
    <div className="relative">
      <div className="fixed top-0 -z-50 h-full w-full text-white">
        <img
          src={randomImage}
          alt="random"
          className="h-full w-full object-cover brightness-75 filter"
        />
        <h1 className="absolute h-full w-full -translate-y-1/2 transform text-center text-8xl font-bold capitalize">
          {post.title}
        </h1>
        <div className="absolute bottom-12 right-12 text-right">
          <div className="text-2xl">{post.user.name}</div>
          <div className="text-xl">
            {`${post.updated_at.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}`}
          </div>
        </div>
      </div>
      <div className="h-screen"></div>
      <div className="min-h-screen bg-white">
        <div className="h-24"></div>
        <div className="m-auto max-w-[1200px]">
          {user.email === post.user.email && (
            <div className="flex justify-end gap-3">
              <Button variant="destructive" onClick={onDelete}>
                삭제
              </Button>
              <Button variant="secondary" onClick={toggleEditing}>
                {isEditing ? "취소" : "수정"}
              </Button>
            </div>
          )}
          {isEditing ? (
            <PostUpdate
              initialContent={post.content}
              postId={id}
              initialTitle={post.title}
              afterUpdate={afterUpdate}
            />
          ) : (
            <BlockNote contents={post.content} />
          )}
          <ErrorBoundary>
            <Suspense>
              <CommentsList postId={id} />
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
};

export default Post;
