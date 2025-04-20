export interface LogEntry {
    id?: number;
    name: string;
    description: string;
    date: string;
    location: string;
    created_at: string;
}

export interface LogEntryFormData {
    name: string;
    description: string;
    date: string;
    location: string;
}