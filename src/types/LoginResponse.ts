export type LoginResponse = {
  success: boolean;
  user?: Record<string, unknown>;
  error?: string;
};