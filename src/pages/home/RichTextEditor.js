import { useState, useEffect } from "react";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { convertToHTML } from "draft-convert";
import DOMPurify from "dompurify";

// hoooooooooks
import { useTheme } from "../../hooks/useTheme";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const RichTextEditor = ({ setConvertedContent }) => {
  const { mode } = useTheme();

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  useEffect(() => {
    let html = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(html);
  }, [editorState]);

  // purifying user inputs to prevent cross-site scripting (XSS
  function createMarkup(html) {
    return {
      __html: DOMPurify.sanitize(html),
    };
  }

  return (
    <div className={`text-editor ${mode}`}>
      <Editor
        editorState={editorState}
        onEditorStateChange={setEditorState}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
        placeholder="What's on your mind?"
        toolbar={{
          options: ["inline", "blockType"],
        }}
        hashtag={{
          separator: " ",
          trigger: "#",
          suggestions: [
            { text: "Mario", value: "mario", url: "js" },
            { text: "Luigi", value: "luigi", url: "go" },
          ],
        }}
        mention={{
          separator: " ",
          trigger: "@",
          suggestions: [
            { text: "JavaScript", value: "javascript", url: "js" },
            { text: "Golang", value: "golang", url: "go" },
          ],
        }}
      />
    </div>
  );
};

export default RichTextEditor;
