import { Button } from "@/components/ui/button";
import { useCreatePostMutate } from "@/hooks/react-query/usePostQuery";
import postQueryKeys from "@/hooks/react-query/usePostQuery/queries";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

interface PostCreateProps {
  afterCreate?: () => void;
}

const PostCreate = ({ afterCreate }: PostCreateProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const editor = useCreateBlockNote({
    animations: false,
  });

  const { mutate: createComment } = useCreatePostMutate();
  const [title, setTitle] = useState("");
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  useEffect(() => {
    const submitEvent = (e: KeyboardEvent) => {
      if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onEditPost();
      }
    };
    if (ref.current) {
      ref.current.addEventListener("keydown", submitEvent);
    }

    return () => {
      if (ref.current) {
        ref.current.removeEventListener("keydown", submitEvent);
      }
    };
  }, [ref]);

  const onEditPost = async () => {
    const content = await editor.blocksToMarkdownLossy();
    if (!content) {
      return;
    }

    createComment(
      { content, title },
      {
        onSuccess: () => {
          editor.forEachBlock((block) => {
            editor.removeBlocks([block.id]);
            return true;
          });
          afterCreate?.();
          navigate("/");
        },
        onError: () => {
          alert("게시글 생성 실패했습니다.");
        },
        onSettled: () => {
          queryClient.invalidateQueries({
            queryKey: postQueryKeys.appPosts(),
          });
        },
      },
    );
  };

  return (
    <>
      <div className="my-2 flex gap-2 rounded-lg border px-4">
        <div className="border-r py-2 pr-2 text-xl">Title</div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full text-xl"
        />
      </div>
      <div className="py-2 text-xl">Content</div>
      <div className="min-h-40 rounded-lg border py-4" ref={ref}>
        <BlockNoteView editor={editor} />
      </div>
      <div className="mt-4 flex justify-end pb-12 pr-4">
        <Button onClick={onEditPost}>Create Post</Button>
      </div>
    </>
  );
};

export default PostCreate;
