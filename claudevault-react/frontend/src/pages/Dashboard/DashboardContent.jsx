import React from 'react';
import SectionHeader from '../../components/common/SectionHeader';
import QuickActions from '../../components/common/QuickActions';
import FolderGrid from '../../components/common/FolderGrid';
import EmptyState from '../../components/common/EmptyState';

const DashboardContent = () => {
  return (
    <>
      <div className="toolbar">
        <div className="toolbar-left">
          <button className="toolbar-btn active" id="grid-view-btn" onClick={(e) => e.preventDefault()}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z" />
            </svg>
          </button>
          <button className="toolbar-btn" id="list-view-btn" onClick={(e) => e.preventDefault()}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4 14h4v-4H4v4zm0 5h4v-4H4v4zM4 9h4V5H4v4zm5 5h12v-4H9v4zm0 5h12v-4H9v4zM9 5v4h12V5H9z" />
            </svg>
          </button>
        </div>
        <div className="toolbar-info" id="toolbar-info">
          <span>0 items</span>
        </div>
      </div>

      <div className="content-area" id="content-area" onDragOver={(e) => e.preventDefault()}>
        <div className="drop-overlay hidden" id="drop-overlay">
          <div className="drop-content">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="#1a73e8">
              <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z" />
            </svg>
            <p>Drop files here to upload</p>
          </div>
        </div>

        <SectionHeader title="Quick Actions" />
        <QuickActions>
          {/* Left empty as per rules (no mock data) */}
        </QuickActions>

        <SectionHeader title="Folders" />
        <FolderGrid>
          {/* Left empty as per rules (no fake folders) */}
        </FolderGrid>

        <EmptyState />
      </div>
    </>
  );
};

export default DashboardContent;
