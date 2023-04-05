import JoditEditor from "jodit-react";
import { useRef, useState } from "react";

const JdEditor = () => {
  const [value, setValue] = useState("");
  const editor = useRef();
  const config = {
    buttons: ["bold", "italic", "underline", "link", "unlink", "source"],
  };
  return (
    <div className="mt-2 w-full max-w-xs">
      <JoditEditor
        ref={editor}
        config={config}
        onBlur={(content) => setValue(content)}
      />
      {value}
    </div>
  );
};
export default JdEditor;
