export interface User {
  id: string;
  email: string;
  password: string; // Added password column
  firstName: string;
  lastName: string;
  createdAt: string;
}

export interface AuthResponse {
  user: User | null;
  error: string | null;
}