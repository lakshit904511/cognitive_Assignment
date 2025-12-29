import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPaste } from "../services/api";
import React from "react";


function ViewPaste() {
  const { id } = useParams();
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadPaste() {
      try {
        const data = await fetchPaste(id);
        setContent(data.content);
      } catch {
        setError("Paste not found or expired");
      }
    }
    loadPaste();
  }, [id]);

   if (error) {
    return (
      <div style={{ padding: "24px" }}>
        <h3>{error}</h3>
      </div>
    );
  }

  return (
    <div style={{ padding: "24px", maxWidth: "700px", margin: "0 auto" }}>
      <h2>Paste</h2>
      <pre style={{ whiteSpace: "pre-wrap" }}>{content}</pre>
    </div>
  );
}
export default ViewPaste;
