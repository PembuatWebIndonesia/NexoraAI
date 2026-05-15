import crypto from 'crypto';
import bcrypt from 'bcryptjs';

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function generateAPIKey(): string {
  const prefix = 'nex_sk_live_';
  const randomBytes = crypto.randomBytes(24).toString('hex');
  return prefix + randomBytes;
}

export function hashAPIKey(apiKey: string): string {
  return crypto
    .createHash('sha256')
    .update(apiKey)
    .digest('hex');
}

export function verifyAPIKey(apiKey: string, keyHash: string): boolean {
  const hash = hashAPIKey(apiKey);
  return crypto.timingSafeEqual(
    Buffer.from(hash),
    Buffer.from(keyHash)
  );
}

export function generateSecureToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

export function hashToken(token: string): string {
  return crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');
}
