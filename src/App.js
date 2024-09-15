import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import CreateContent from "./CreateContent";
import ViewContent from "./ViewContent";

function App() {
    return (
        <Router>
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/">
                            Self-Destructing Content
                        </Link>
                        <div className="collapse navbar-collapse">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/">
                                        Create Content
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/view">
                                        View Content
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <Routes>
                    <Route path="/" element={<CreateContent />} />
                    <Route path="/view" element={<ViewContent />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
