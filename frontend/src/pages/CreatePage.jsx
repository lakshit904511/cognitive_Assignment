import { useState } from "react";
import React from "react";

import { createPaste } from "../services/api";

function CreatePaste() {
    const [content, setContent] = useState("");
    const [ttl, setTtl] = useState("");
    const [maxViews, setMaxViews] = useState("");
    const [resultUrl, setResultUrl] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        try {
            const payload = {
                content,
                ...(ttl && { ttl_seconds: Number(ttl) }),
                ...(maxViews && { max_views: Number(maxViews) }),
            };

            const res = await createPaste(payload);
            setResultUrl(`${window.location.origin}/#/p/${res.id}`);
            setContent("");
            setTtl("");
            setMaxViews("");
        } catch (err) {
            setError(err.message || "Something went wrong");
        }
    }
    return (
        <div style={{ padding: "24px", maxWidth: "700px", margin: "0 auto" }}>
            <h2>Create Paste</h2>

            <form onSubmit={handleSubmit}>
                <textarea
                    placeholder="Enter paste content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    style={{ width: "100%", minHeight: "150px", marginBottom: "12px" }}
                />

                <input
                    type="number"
                    placeholder="TTL in seconds (optional)"
                    value={ttl}
                    onChange={(e) => setTtl(e.target.value)}
                    style={{ display: "block", marginBottom: "12px" }}
                />

                <input
                    type="number"
                    placeholder="Max views (optional)"
                    value={maxViews}
                    onChange={(e) => setMaxViews(e.target.value)}
                    style={{ display: "block", marginBottom: "12px" }}
                />

                <button type="submit">Create</button>
            </form>

            {resultUrl && (
                <p style={{ marginTop: "16px" }}>
                    Share URL: <a href={resultUrl}>{resultUrl}</a>
                </p>
            )}

            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    )
}

export default CreatePaste;
