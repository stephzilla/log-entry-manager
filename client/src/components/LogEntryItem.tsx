import { useState } from 'react';
import { LogEntry } from '../types/LogEntry';

interface LogEntryItemProps {
  entry: LogEntry;
  onSave: (id: number, updatedEntry: Partial<LogEntry>) => void;
  onDelete: (id: number) => void;
}

const LogEntryItem: React.FC<LogEntryItemProps> = ({ entry, onSave, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedEntry, setEditedEntry] = useState(entry);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this log entry?')) {
      if (entry.id) {
        onDelete(entry.id);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedEntry(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (entry.id) {
      onSave(entry.id, editedEntry);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditedEntry(entry);
    setIsEditing(false);
  };

  // Format the date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className={`log-entry-item ${isEditing ? 'editing' : ''}`}>
      {isEditing ? (
        // Edit mode
        <>
          <div className="form-group">
            <input
              type="text"
              name="name"
              value={editedEntry.name}
              onChange={handleInputChange}
              placeholder="Name"
              className="inline-edit-input"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="location"
              value={editedEntry.location}
              onChange={handleInputChange}
              placeholder="Location"
              className="inline-edit-input"
            />
          </div>
          <div className="form-group">
            <input
              type="date"
              name="date"
              value={editedEntry.date}
              onChange={handleInputChange}
              className="inline-edit-input"
            />
          </div>
          <div className="form-group">
            <textarea
              name="description"
              value={editedEntry.description}
              onChange={handleInputChange}
              placeholder="Description"
              className="inline-edit-input"
              rows={3}
            />
          </div>
          <div className="entry-actions">
            <button className="save-button" onClick={handleSave}>
              Save
            </button>
            <button className="cancel-button" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </>
      ) : (
        // View mode
        <>
          <div className="log-entry-header">
            <h3>{entry.name}</h3>
            <div className="log-entry-date" data-testid="log-entry-date">
              {formatDate(entry.date)}
            </div>
          </div>
          <div className="log-entry-location">{entry.location}</div>
          <p className="log-entry-description">{entry.description}</p>
          <div className="entry-actions">
            <button className="action-button" onClick={() => setIsEditing(true)}>✎</button>
            <button className="action-button" onClick={handleDelete}>✖</button>
          </div>
        </>
      )}
    </div>
  );
};

export default LogEntryItem;