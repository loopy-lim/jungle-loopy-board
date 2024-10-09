import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";
import { useEffect } from "react";

interface BlockNoteProps {
  contents: string;
}

const BlockNote = ({ contents }: BlockNoteProps) => {
  const editor = useCreateBlockNote({
    animations: false,
  });

  useEffect(() => {
    async function loadInitialHTML() {
      const blocks = await editor.tryParseMarkdownToBlocks(contents);
      editor.replaceBlocks(editor.document, blocks);
    }
    loadInitialHTML();
  }, [editor, contents]);

  return <BlockNoteView editor={editor} editable={false} />;
};

export default BlockNote;
