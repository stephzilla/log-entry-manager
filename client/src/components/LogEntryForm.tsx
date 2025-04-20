import { useState, useEffect } from 'react';
import { LogEntryFormData } from '../types/LogEntry';
import { getRecentUserName } from '../services/api';

interface LogEntryFormProps {
  onSave: (logEntry: LogEntryFormData) => void;
}

const LogEntryForm: React.FC<LogEntryFormProps> = ({ onSave }) => {
  const [formData, setFormData] = useState<LogEntryFormData>({
    name: '',
    description: '',
    date: new Date().toISOString().split('T')[0], // Default to today's date
    location: ''
  });
  const [error, setError] = useState<string | null>(null);

  // Auto-fill name field with most recent user name
  useEffect(() => {
    const fetchRecentName = async () => {
      try {
        const recentName = await getRecentUserName();
        if (recentName) {
          setFormData(prev => ({ ...prev, name: recentName }));
        }
      } catch (error) {
        console.error('Error fetching recent user name:', error);
      }
    };
    
    fetchRecentName();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name.trim() || !formData.description.trim() || !formData.date || !formData.location.trim()) {
      setError('All fields are required');
      return;
    }
    
    onSave(formData);
    
    // Reset form but keep the name (for subsequent entries)
    setFormData({
      name: formData.name,
      description: '',
      date: new Date().toISOString().split('T')[0],
      location: ''
    });
  };

  return (
    <div className="new-log-entry-form">
      <h2>Add New Log Entry</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Location"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group full-width">
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              className="form-control"
              rows={2}
            />
          </div>
        </div>
        <div className="form-row">
          <button type="submit" className="add-button">
            + Add Entry
          </button>
        </div>
      </form>
    </div>
  );
};

export default LogEntryForm;