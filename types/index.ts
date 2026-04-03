export interface WaitlistEntry {
  id: string;
  email: string;
  city?: string;
  created_at: string;
}

export interface WaitlistFormData {
  email: string;
  city?: string;
}
