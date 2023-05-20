import { useState, useRef } from "react";
import { Editor, EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";

const RichTextEditor = () => {
  const editorRef = useRef(null);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const handleEditorChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const handleSave = () => {
    const content = JSON.stringify(
      convertToRaw(editorState.getCurrentContent())
    );
    const htmlContent = draftToHtml(
      convertToRaw(editorState.getCurrentContent())
    );

    console.log("Content (JSON):", content);
    console.log("Content (HTML):", htmlContent);
  };

  return (
    <div>
      <Editor
        ref={editorRef}
        editorState={editorState}
        onChange={handleEditorChange}
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default RichTextEditor;
