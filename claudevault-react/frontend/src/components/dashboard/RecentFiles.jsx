import React from 'react';
import SectionHeader from '../common/SectionHeader';

const RecentFiles = ({ files }) => {
  if (!files || files.length === 0) return null;

  return (
    <div style={{ marginBottom: '24px' }}>
      <SectionHeader title="Recent Files" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {files.map(file => (
          <div key={file.id} style={{ padding: '12px', backgroundColor: 'var(--bg-surface, #fff)', borderRadius: '8px', border: '1px solid var(--border-color, #e0e0e0)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 500 }}>{file.name}</span>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary, #5f6368)' }}>{new Date(file.created_at).toLocaleDateString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentFiles;
