import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import LogEntryItem from './LogEntryItem';

describe('LogEntryItem', () => {
  const mockEntry = {
    id: 1,
    name: 'Stephanie Hekker',
    description: 'Test description',
    date: '2025-04-17',
    location: 'Test Location',
    created_at: '2025-04-17T12:00:00.000Z'
  };
  
  let mockOnSave: any;
  let mockOnDelete: any;
  
  beforeEach(() => {
    // Reset the mocks before each test
    mockOnSave = vi.fn();
    mockOnDelete = vi.fn();
  });
  
  it('renders log entry details correctly in view mode', () => {
    render(
      <LogEntryItem 
        entry={mockEntry} 
        onSave={mockOnSave} 
        onDelete={mockOnDelete} 
      />
    );
    
    // Check if all the entry details are displayed
    expect(screen.getByText('Stephanie Hekker')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
    expect(screen.getByText('Test Location')).toBeInTheDocument();
    
    // Check if the action buttons are present
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });
  
  it('switches to edit mode when edit button is clicked', () => {
    render(
      <LogEntryItem 
        entry={mockEntry} 
        onSave={mockOnSave} 
        onDelete={mockOnDelete} 
      />
    );
    
    // Click the edit button
    fireEvent.click(screen.getByText('Edit'));
    
    // Check if input fields appear
    expect(screen.getByDisplayValue('Stephanie Hekker')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test description')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test Location')).toBeInTheDocument();
    expect(screen.getByDisplayValue('2025-04-17')).toBeInTheDocument();
    
    // Check if save and cancel buttons appear
    expect(screen.getByText('Save')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });
  
  it('calls onSave with updated values when save button is clicked', () => {
    render(
      <LogEntryItem 
        entry={mockEntry} 
        onSave={mockOnSave} 
        onDelete={mockOnDelete} 
      />
    );
    
    // Click the edit button to enter edit mode
    fireEvent.click(screen.getByText('Edit'));
    
    // Change the name input
    const nameInput = screen.getByDisplayValue('Stephanie Hekker');
    fireEvent.change(nameInput, { target: { value: 'Not Stephanie' } });
    
    // Click the save button
    fireEvent.click(screen.getByText('Save'));
    
    // Check if onSave was called with the correct arguments
    expect(mockOnSave).toHaveBeenCalledWith(1, expect.objectContaining({
      name: 'Not Stephanie',
      description: 'Test description',
      date: '2025-04-17',
      location: 'Test Location'
    }));
  });
  
  it('reverts changes when cancel button is clicked', () => {
    render(
      <LogEntryItem 
        entry={mockEntry} 
        onSave={mockOnSave} 
        onDelete={mockOnDelete} 
      />
    );
    
    // Click the edit button to enter edit mode
    fireEvent.click(screen.getByText('Edit'));
    
    // Change the name input
    const nameInput = screen.getByDisplayValue('Stephanie Hekker');
    fireEvent.change(nameInput, { target: { value: 'Not Stephanie' } });
    
    // Click the cancel button
    fireEvent.click(screen.getByText('Cancel'));
    
    // Check we're back in view mode with the original data
    expect(screen.getByText('Stephanie Hekker')).toBeInTheDocument();
    
    // Verify that onSave was not called
    expect(mockOnSave).not.toHaveBeenCalled();
  });
  
  it('shows confirmation dialog and calls onDelete when delete is confirmed', () => {
    // Mock window.confirm to always return true
    const originalConfirm = window.confirm;
    window.confirm = vi.fn(() => true);
    
    render(
      <LogEntryItem 
        entry={mockEntry} 
        onSave={mockOnSave} 
        onDelete={mockOnDelete} 
      />
    );
    
    fireEvent.click(screen.getByText('Delete'));
    expect(window.confirm).toHaveBeenCalledWith('Are you sure you want to delete this log entry?');
    expect(mockOnDelete).toHaveBeenCalledWith(1);
    
    // Restore original window.confirm
    window.confirm = originalConfirm;
  });
});