import React, { useState } from "react";
import axios from "axios";

const CreateContent = () => {
    const [content, setContent] = useState("");
    const [viewLimit, setViewLimit] = useState(1);
    const [expirationTime, setExpirationTime] = useState("");
    const [file, setFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [shareableLink, setShareableLink] = useState("");

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.size > 5 * 1024 * 1024) {
            setErrorMessage("File size exceeds 5 MB.");
            setFile(null);
        } else {
            setErrorMessage("");
            setFile(selectedFile);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (file && file.size > 5 * 1024 * 1024) {
            setErrorMessage("File size exceeds 5 MB.");
            return;
        }

        const formData = new FormData();
        formData.append("content", content);
        formData.append("viewLimit", viewLimit);
        formData.append("expirationTime", expirationTime);

        if (file) {
            formData.append("file", file);
        }

        try {
            const response = await axios.post("http://localhost:8081/api/content", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setShareableLink(response.data);
        } catch (error) {
            console.error("Error creating content", error);
            setErrorMessage("Failed to create content. Please try again.");
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Create Self-Destructing Content</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                    <label>Content (Text or Media URL):</label>
                    <textarea
                        className="form-control"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label>View Limit:</label>
                    <input
                        type="number"
                        className="form-control"
                        value={viewLimit}
                        onChange={(e) => setViewLimit(e.target.value)}
                        min="1"
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label>Expiration Time:</label>
                    <input
                        type="datetime-local"
                        className="form-control"
                        value={expirationTime}
                        onChange={(e) => setExpirationTime(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label>Upload Media (Optional):</label>
                    <input
                        type="file"
                        className="form-control-file"
                        onChange={handleFileChange}
                    />
                    {errorMessage && <div className="text-danger">{errorMessage}</div>}
                </div>
                <button type="submit" className="btn btn-primary btn-block">Create Content</button>
            </form>

            {shareableLink && (
                <div className="mt-4">
                    <h3>Shareable Link:</h3>
                    <a href={shareableLink} target="_blank" rel="noopener noreferrer">
                        {shareableLink}
                    </a>
                </div>
            )}
        </div>
    );
};

export default CreateContent;
