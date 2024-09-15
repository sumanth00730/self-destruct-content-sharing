import React, { useState } from "react";
import axios from "axios";

const ViewContent = () => {
    const [shareableLink, setShareableLink] = useState("");
    const [contentDetails, setContentDetails] = useState(null);
    const [error, setError] = useState("");

    const handleViewContent = async () => {
        try {
            const response = await axios.get(shareableLink, {
                headers: {
                    "Accept": "application/json"  // Add the Accept header
                }
            });
            setContentDetails(response.data);
            setError(""); // Reset error
        } catch (err) {
            setError("Content has expired or reached the view limit.");
            setContentDetails(null);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">View Self-Destructing Content</h2>
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    value={shareableLink}
                    onChange={(e) => setShareableLink(e.target.value)}
                    placeholder="Enter shareable link"
                />
                <button className="btn btn-primary" onClick={handleViewContent}>
                    View Content
                </button>
            </div>

            {error && <p className="text-danger">{error}</p>}

            {contentDetails && (
                <div className="mt-4">
                    <h3>Content Details:</h3>
                    <ul className="list-group mb-3">
                        <li className="list-group-item"><strong>Text Content:</strong> {contentDetails.content || "N/A"}</li>
                        <li className="list-group-item"><strong>Remaining Views:</strong> {contentDetails.remainingViews}</li>
                        <li className="list-group-item"><strong>Expiration Time:</strong> {new Date(contentDetails.expirationTime).toLocaleString()}</li>
                        <li className="list-group-item">
                            <strong>Status:</strong> {contentDetails.isExpired ? "Expired" : "Active"}
                        </li>
                        {contentDetails.mediaUrl && (
                            <li className="list-group-item">
                                <strong>Media:</strong>
                                <a href={contentDetails.mediaUrl} download className="btn btn-success ml-3">Download</a>
                            </li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ViewContent;
