export interface LogEntry {
    id?: number;
    name: string;
    description: string;
    date: string;
    location: string;
    created_at?: string;
  }

export interface LogEntryCreate {
    name: string;
    description: string;
    date: string;
    location: string;
}

export interface LogEntryUpdate {
    id: number;
    name?: string;
    description?: string;
    date?: string;
    location?: string;
}