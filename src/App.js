import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [downloadLink, setDownloadLink] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setDownloadLink('');

    try {
      const response = await axios.post('http://localhost:5000/api/download', { url });
      setDownloadLink(response.data.downloadUrl);
    } catch (error) {
      setError(error.response?.data?.error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <header className="header">
          <h1 className="floating">Social Media Video Downloader</h1>
          <p className="subtitle">Download your favorite videos from Instagram and Facebook</p>
        </header>

        <div className="glass-card">
          <form onSubmit={handleSubmit} className="download-form">
            <input
              type="text"
              className="url-input"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste Instagram or Facebook video URL"
              disabled={loading}
              required
            />
            <button type="submit" className="download-button" disabled={loading}>
              {loading ? (
                <>
                  <span className="loading"></span>
                  Processing...
                </>
              ) : (
                'Download Video'
              )}
            </button>
          </form>

          {error && (
            <div className="error">
              <p>{error}</p>
            </div>
          )}

          {downloadLink && (
            <div className="success">
              <h3>Video Ready!</h3>
              <a
                href={downloadLink}
                className="download-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download Now
              </a>
            </div>
          )}
        </div>

        <footer className="creator-footer">
          <div className="creator-info">
            <div className="powered-by">
              <span className="powered-text">Powered by</span>
              <h3 className="creator-name">Kandrathi Ganga Vara Prasad</h3>
            </div>
            <div className="social-links">
              <a 
                href="https://www.linkedin.com/in/kandrathi-ganga-vara-prasad-026b40229/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link linkedin"
              >
                <i className="fab fa-linkedin"></i>
                LinkedIn
              </a>
              <a 
                href="https://my-portfolio-ashen-two.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link portfolio"
              >
                <i className="fas fa-globe"></i>
                Portfolio
              </a>
            </div>
          </div>
          <div className="creator-badge">
            <span className="badge-text">Full Stack Developer</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
