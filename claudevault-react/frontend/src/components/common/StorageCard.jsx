import React from 'react';

const StorageCard = () => {
  return (
    <div className="sidebar-storage">
      <div className="storage-label">Storage</div>
      <div className="storage-progress">
        <div className="storage-bar">
          <div className="storage-fill" id="storage-bar-fill"></div>
        </div>
        <span id="storage-text">0 MB of 15 GB used</span>
      </div>
    </div>
  );
};

export default StorageCard;
