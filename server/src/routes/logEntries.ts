import express from 'express';
import db from '../db';
import { LogEntry, LogEntryCreate, LogEntryUpdate } from '../models/LogEntry';

const router = express.Router();

// Get all log entries
router.get('/', (req, res) => {
  try {
    const logEntries = db.prepare('SELECT * FROM log_entries ORDER BY created_at DESC').all();
    res.json(logEntries);
  } catch (error) {
    console.error('Error fetching log entries:', error);
    res.status(500).json({ error: 'Failed to fetch log entries' });
  }
});

// Get the most recent user name (for auto-filling the form)
router.get('/user/recent', (req, res) => {
  try {
    const recentEntry = db.prepare('SELECT name FROM log_entries ORDER BY created_at DESC LIMIT 1').get() as { name: string } | undefined;
    
    // Use optional chaining to safely access name property
    const userName = recentEntry ? recentEntry?.name : '';
    res.json({ name: userName });
  } catch (error) {
    console.error('Error fetching recent user name:', error);
    res.status(500).json({ error: 'Failed to fetch recent user name' });
  }
});

// Get a single log entry by ID
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const logEntry = db.prepare('SELECT * FROM log_entries WHERE id = ?').get(id);
    
    if (!logEntry) {
      res.status(404).json({ error: 'Log entry not found' });
    }
    
    res.json(logEntry);
  } catch (error) {
    console.error('Error fetching log entry:', error);
    res.status(500).json({ error: 'Failed to fetch log entry' });
  }
});

// Create a new log entry
router.post('/', (req, res) => {
  try {
    const { name, description, date, location }: LogEntryCreate = req.body;
    
    // Validate required fields
    if (!name || !description || !date || !location) {
      res.status(400).json({ error: 'All fields are required' });
    }
    
    const result = db.prepare(
      'INSERT INTO log_entries (name, description, date, location) VALUES (?, ?, ?, ?)'
    ).run(name, description, date, location);
    
    const newLogEntry = db.prepare('SELECT * FROM log_entries WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json(newLogEntry);
  } catch (error) {
    console.error('Error creating log entry:', error);
    res.status(500).json({ error: 'Failed to create log entry' });
  }
});

// Update a log entry
router.put('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, date, location }: LogEntryUpdate = req.body;
    
    // Check if log entry exists
    const existingEntry = db.prepare('SELECT * FROM log_entries WHERE id = ?').get(id);
    if (!existingEntry) {
      res.status(404).json({ error: 'Log entry not found' });
    }
    
    // Build update query
    let updates: string[] = [];
    let values: any[] = [];
    
    if (name !== undefined) {
      updates.push('name = ?');
      values.push(name);
    }
    
    if (description !== undefined) {
      updates.push('description = ?');
      values.push(description);
    }
    
    if (date !== undefined) {
      updates.push('date = ?');
      values.push(date);
    }
    
    if (location !== undefined) {
      updates.push('location = ?');
      values.push(location);
    }
    
    if (updates.length === 0) {
      res.status(400).json({ error: 'No fields to update' });
    }
    
    // Add ID to values
    values.push(id);
    
    // Execute update
    db.prepare(`UPDATE log_entries SET ${updates.join(', ')} WHERE id = ?`).run(...values);
    
    // Get updated entry
    const updatedEntry = db.prepare('SELECT * FROM log_entries WHERE id = ?').get(id);
    res.json(updatedEntry);
  } catch (error) {
    console.error('Error updating log entry:', error);
    res.status(500).json({ error: 'Failed to update log entry' });
  }
});

// Delete a log entry
router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if log entry exists
    const existingEntry = db.prepare('SELECT * FROM log_entries WHERE id = ?').get(id);
    if (!existingEntry) {
        res.status(404).json({ error: 'Log entry not found' });
    }
    
    // Delete entry
    db.prepare('DELETE FROM log_entries WHERE id = ?').run(id);
    
    res.json({ message: 'Log entry deleted successfully' });
  } catch (error) {
    console.error('Error deleting log entry:', error);
    res.status(500).json({ error: 'Failed to delete log entry' });
  }
});

export default router;