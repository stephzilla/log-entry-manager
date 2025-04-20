import axios from 'axios';
import { LogEntry, LogEntryFormData } from '../types/LogEntry';

const API_URL = 'http://localhost:3001/api/logentries';

// Get all log entries
export const getLogEntries = async (): Promise<LogEntry[]> => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error in getLogEntries:', error);
    if (axios.isAxiosError(error)) {
      console.error('Response status:', error.response?.status);
      console.error('Response data:', error.response?.data);
    }
    throw error;
  }
};

// Get a single log entry by ID
export const getLogEntry = async (id: number): Promise<LogEntry> => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error in getLogEntry:', error);
    throw error;
  }
};

// Create a new log entry
export const createLogEntry = async (logEntry: LogEntryFormData): Promise<LogEntry> => {
  try {
    console.log('Creating entry with data:', logEntry);
    const response = await axios.post(API_URL, logEntry);
    return response.data;
  } catch (error) {
    console.error('Error in createLogEntry:', error);
    if (axios.isAxiosError(error)) {
      console.error('Response status:', error.response?.status);
      console.error('Response data:', error.response?.data);
    }
    throw error;
  }
};

// Update a log entry
export const updateLogEntry = async (id: number, logEntry: Partial<LogEntryFormData>): Promise<LogEntry> => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, logEntry);
    return response.data;
  } catch (error) {
    console.error('Error in updateLogEntry:', error);
    throw error;
  }
};

// Delete a log entry
export const deleteLogEntry = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error('Error in deleteLogEntry:', error);
    throw error;
  }
};

// Get the most recent user name
export const getRecentUserName = async (): Promise<string> => {
  try {
    const response = await axios.get(`${API_URL}/user/recent`);
    return response.data.name;
  } catch (error) {
    console.error('Error in getRecentUserName:', error);
    // Return empty string on error instead of throwing
    return '';
  }
};