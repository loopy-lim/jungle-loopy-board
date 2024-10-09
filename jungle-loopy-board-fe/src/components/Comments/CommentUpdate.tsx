import { Button } from "@/components/ui/button";
import {
  commentQueryKeys,
  useUpdateCommentMutate,
} from "@/hooks/react-query/useCommentQuery";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

interface CommentUpdateProps {
  postId: number;
  initialContent: string;
  commentId: number;
  afterUpdate?: () => void;
}

const CommentUpdate = ({
  commentId,
  initialContent,
  postId,
  afterUpdate,
}: CommentUpdateProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const editor = useCreateBlockNote({
    animations: false,
  });

  const { mutate: updateComment } = useUpdateCommentMutate(postId);
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

    updateComment(
      { commentId, putUpdateCommentResponseDto: { content } },
      {
        onSuccess: () => {
          editor.forEachBlock((block) => {
            editor.removeBlocks([block.id]);
            return true;
          });
          afterUpdate?.();
        },
        onError: () => {
          alert("댓글 수정에 실패했습니다.");
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
      <div className="py-4" ref={ref}>
        <BlockNoteView editor={editor} />
      </div>
      <div className="mt-4 flex justify-end pb-12 pr-4">
        <Button onClick={onEditComment}>Update Comment</Button>
      </div>
    </>
  );
};

export default CommentUpdate;
