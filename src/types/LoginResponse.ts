export type LoginResponse = {
  success: boolean;
  user?: Record<string, any>;
  error?: string;
};
