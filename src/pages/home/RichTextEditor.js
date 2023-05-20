import { useState } from "react";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useTheme } from "../../hooks/useTheme";

const RichTextEditor = () => {
  const { mode } = useTheme();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const _contentState = ContentState.createFromText("Sample content state");
  const raw = convertToRaw(_contentState); // RawDraftContentState JSON
  const [contentState, setContentState] = useState(raw); // ContentState JSON

  return (
    <div className={`text-editor ${mode}`}>
      <Editor
        // editorState={editorState}
        // onEditorStateChange={setEditorState}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
        // placeholder="What's on your mind?"
        defaultContentState={contentState}
        onContentStateChange={setContentState}
      />
      <button>Save</button>
    </div>
  );
};

export default RichTextEditor;
