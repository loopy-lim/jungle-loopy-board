import { Button } from "@/components/ui/button";
import {
  commentQueryKeys,
  useCreateCommentMutate,
} from "@/hooks/react-query/useCommentQuery";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

interface CommentCreate {
  postId: number;
}

const CommentCreate = ({ postId }: CommentCreate) => {
  const ref = useRef<HTMLDivElement>(null);
  const editor = useCreateBlockNote({
    animations: false,
  });

  const { mutate: createComment } = useCreateCommentMutate(postId);
  const queryClient = useQueryClient();

  useEffect(() => {
    const submitEvent = (e: KeyboardEvent) => {
      if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onEditComment();
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

  const onEditComment = async () => {
    const content = await editor.blocksToMarkdownLossy();
    if (!content) {
      return;
    }

    createComment(
      { content },
      {
        onSuccess: () => {
          editor.forEachBlock((block) => {
            editor.removeBlocks([block.id]);
            return true;
          });
        },
        onError: () => {
          alert("댓글 작성에 실패했습니다.");
        },
        onSettled: () => {
          queryClient.invalidateQueries({
            queryKey: commentQueryKeys.comment(),
          });
        },
      },
    );
  };

  return (
    <>
      <div className="rounded-md border">
        <div className="bg-slate-100 px-6 py-4 text-xl">Add Comment</div>
        <div className="py-4" ref={ref}>
          <BlockNoteView editor={editor} />
        </div>
      </div>
      <div className="mt-4 flex justify-end pb-12">
        <Button onClick={onEditComment}>Add Comment</Button>
      </div>
    </>
  );
};

export default CommentCreate;
