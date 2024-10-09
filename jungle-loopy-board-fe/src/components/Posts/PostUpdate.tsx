import { Button } from "@/components/ui/button";
import { useUpdatePostMutate } from "@/hooks/react-query/usePostQuery";
import postQueryKeys from "@/hooks/react-query/usePostQuery/queries";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";

interface PostUpdateProps {
  postId: number;
  initialContent: string;
  initialTitle: string;
  afterUpdate?: () => void;
}

const PostUpdate = ({
  initialContent,
  postId,
  afterUpdate,
  initialTitle,
}: PostUpdateProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const editor = useCreateBlockNote({
    animations: false,
  });

  const { mutate: updateComment } = useUpdatePostMutate({ id: postId });
  const [title, setTitle] = useState(initialTitle);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (initialContent) {
      const loadInitialHTML = async () => {
        const blocks = await editor.tryParseMarkdownToBlocks(initialContent);
        editor.replaceBlocks(editor.document, blocks);
      };
      loadInitialHTML();
    }
  }, [editor, initialContent]);

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

    updateComment(
      { content, id: postId, title: title },
      {
        onSuccess: () => {
          editor.forEachBlock((block) => {
            editor.removeBlocks([block.id]);
            return true;
          });
          afterUpdate?.();
        },
        onError: () => {
          alert("게시글 수정에 실패했습니다.");
        },
        onSettled: () => {
          queryClient.invalidateQueries({
            queryKey: postQueryKeys.getPost(postId),
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
      <div className="rounded-lg border py-4" ref={ref}>
        <BlockNoteView editor={editor} />
      </div>
      <div className="mt-4 flex justify-end pb-12 pr-4">
        <Button onClick={onEditPost}>Update Post</Button>
      </div>
    </>
  );
};

export default PostUpdate;
