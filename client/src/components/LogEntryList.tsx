import { useState, useEffect } from 'react';
import { getLogEntries, createLogEntry, updateLogEntry, deleteLogEntry } from '../services/api';
import { LogEntry, LogEntryFormData } from '../types/LogEntry';
import LogEntryItem from './LogEntryItem';
import LogEntryForm from './LogEntryForm';

const LogEntryList: React.FC = () => {
  const [logEntries, setLogEntries] = useState<LogEntry[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch log entries from the API
  const fetchLogEntries = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const entries = await getLogEntries();
      setLogEntries(entries);
    } catch (error) {
      console.error('Error fetching log entries:', error);
      setError('Failed to fetch log entries. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  // Load log entries on component mount
  useEffect(() => {
    fetchLogEntries();
  }, []);

  // Handle creating a new log entry
  const handleCreateEntry = async (formData: LogEntryFormData) => {
    try {
      await createLogEntry(formData);
      // Refresh the list after creation
      fetchLogEntries();
    } catch (error) {
      console.error('Error creating log entry:', error);
      setError('Failed to create log entry. Please try again.');
    }
  };

  // Handle updating a log entry
  const handleUpdateEntry = async (id: number, updatedEntry: Partial<LogEntry>) => {
    try {
      await updateLogEntry(id, updatedEntry);
      // Refresh the list after update
      fetchLogEntries();
    } catch (error) {
      console.error('Error updating log entry:', error);
      setError('Failed to update log entry. Please try again.');
    }
  };

  // Handle deleting a log entry
  const handleDeleteEntry = async (id: number) => {
    try {
      await deleteLogEntry(id);
      // Refresh the list after deletion
      fetchLogEntries();
    } catch (error) {
      console.error('Error deleting log entry:', error);
      setError('Failed to delete log entry. Please try again.');
    }
  };

  return (
    <div className="log-entry-manager">
      <h1>Log Entry Manager</h1>
      
      {/* Add new entry form */}
      <LogEntryForm onSave={handleCreateEntry} />
      
      {/* Error message */}
      {error && <div className="error-message">{error}</div>}

      {/* Log entries list */}
      <div className="log-entries-container">
        <h2>Your Log Entries</h2>
        
        {isLoading ? (
          <div className="loading">Loading log entries...</div>
        ) : logEntries.length === 0 ? (
          <div className="no-entries">No log entries found. Add your first one above!</div>
        ) : (
          <div className="log-entries-list">
            {logEntries.map(entry => (
              <LogEntryItem
                key={entry.id}
                entry={entry}
                onSave={handleUpdateEntry}
                onDelete={handleDeleteEntry}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LogEntryList;