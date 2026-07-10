import React from 'react';
import StorageCard from '../common/StorageCard';

const Sidebar = () => {
  return (
    <aside className="sidebar" id="sidebar">
      <div className="sidebar-header">
        <div className="logo-sidebar" onClick={(e) => e.preventDefault()}>
          <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
            <rect width="40" height="40" rx="8" fill="#1a73e8" />
            <path
              d="M12 28V12h8c3.3 0 6 2.7 6 6s-2.7 6-6 6h-4v4H12zm4-8h4c1.1 0 2-.9 2-2s-.9-2-2-2h-4v4z"
              fill="white"
            />
          </svg>
          <span>CloudVault</span>
        </div>
        <button className="sidebar-toggle" onClick={(e) => e.preventDefault()}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
        </button>
      </div>

      <div className="sidebar-actions">
        <button className="btn-new" onClick={(e) => e.preventDefault()}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
          </svg>
          <span>New</span>
        </button>
        <button className="btn-new btn-document" onClick={(e) => e.preventDefault()}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
          </svg>
          <span>New Doc</span>
        </button>
      </div>

      <nav className="sidebar-nav">
        <a
          href="#"
          className="nav-item active"
          data-view="my-drive"
          onClick={(e) => e.preventDefault()}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" />
          </svg>
          <span>My Drive</span>
        </a>
        <a
          href="#"
          className="nav-item"
          data-view="documents"
          onClick={(e) => e.preventDefault()}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
          </svg>
          <span>Documents</span>
        </a>
        <a
          href="#"
          className="nav-item"
          data-view="recent"
          onClick={(e) => e.preventDefault()}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
          </svg>
          <span>Recent</span>
        </a>
        <a
          href="#"
          className="nav-item"
          data-view="starred"
          onClick={(e) => e.preventDefault()}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
          <span>Starred</span>
        </a>
        <a
          href="#"
          className="nav-item"
          data-view="shared"
          onClick={(e) => e.preventDefault()}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
          </svg>
          <span>Shared</span>
        </a>
        <a
          href="#"
          className="nav-item"
          data-view="trash"
          onClick={(e) => e.preventDefault()}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
          </svg>
          <span>Trash</span>
        </a>
      </nav>

      <StorageCard />
    </aside>
  );
};

export default Sidebar;
