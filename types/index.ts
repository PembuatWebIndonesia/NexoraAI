export type UserRole = 'user' | 'premium' | 'admin' | 'superadmin';

export interface Profile {
  id: string;
  user_id: string;
  email: string;
  full_name: string;
  avatar_url: string | null;
  role: UserRole;
  subscription_tier: 'free' | 'premium';
  subscription_id: string | null;
  api_key_hash: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface Chat {
  id: string;
  user_id: string;
  title: string;
  mode: 'general' | 'coding';
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface Message {
  id: string;
  chat_id: string;
  user_id: string;
  role: 'user' | 'assistant';
  content: string;
  tokens_used: number;
  created_at: string;
  deleted_at: string | null;
}

export interface Memory {
  id: string;
  user_id: string;
  key: string;
  value: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface Subscription {
  id: string;
  user_id: string;
  tier: 'free' | 'premium';
  status: 'active' | 'pending' | 'expired' | 'canceled';
  current_period_start: string;
  current_period_end: string;
  canceled_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface APIKey {
  id: string;
  user_id: string;
  name: string;
  key_hash: string;
  last_used_at: string | null;
  rate_limit: number;
  created_at: string;
  revoked_at: string | null;
  deleted_at: string | null;
}

export interface Payment {
  id: string;
  user_id: string;
  subscription_id: string;
  amount: number;
  currency: string;
  status: 'pending' | 'success' | 'failed' | 'expired';
  payment_method: 'midtrans_qris' | 'midtrans_va' | 'midtrans_ewallet';
  transaction_id: string;
  external_id: string;
  created_at: string;
  updated_at: string;
}

export interface UsageLog {
  id: string;
  user_id: string;
  feature: string;
  tokens_used: number;
  cost: number;
  created_at: string;
}

export interface AuditLog {
  id: string;
  actor_id: string;
  action: string;
  resource_type: string;
  resource_id: string;
  changes: Record<string, [unknown, unknown]>;
  ip_address: string;
  user_agent: string;
  created_at: string;
}

export interface APIResponse<T> {
  success: boolean;
  data: T | null;
  error: APIError | null;
}

export interface APIError {
  code: string;
  message: string;
  status: number;
  details?: Record<string, unknown>;
}

export interface AdminInvite {
  id: string;
  email: string;
  role: UserRole;
  created_by: string;
  expires_at: string;
  used_at: string | null;
  token_hash: string;
  created_at: string;
}

export interface FeatureFlag {
  id: string;
  name: string;
  enabled: boolean;
  rollout_percentage: number;
  created_at: string;
  updated_at: string;
}
