import { useState } from "react";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const RichTextEditor = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  return (
    <div className="text-editor">
      <Editor editorState={editorState} onEditorStateChange={setEditorState} />
      <button>Save</button>
    </div>
  );
};

export default RichTextEditor;
