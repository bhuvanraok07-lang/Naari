import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

interface StoredUser {
  id: string;
  name: string;
  normalizedName: string;
  salt: string;
  hash: string;
  createdAt: string;
}

interface Session {
  token: string;
  userId: string;
  name: string;
  createdAt: number;
}

const DATA_DIR = path.resolve(process.cwd(), 'server', 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

// In-memory active sessions
const activeSessions = new Map<string, Session>();

function hashPassword(password: string, salt: string): string {
  return crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
}

function verifyPassword(password: string, salt: string, storedHash: string): boolean {
  const hash = hashPassword(password, salt);
  const hashBuf = Buffer.from(hash, 'hex');
  const storedBuf = Buffer.from(storedHash, 'hex');
  if (hashBuf.length !== storedBuf.length) return false;
  return crypto.timingSafeEqual(hashBuf, storedBuf);
}

function loadUsers(): StoredUser[] {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(USERS_FILE)) {
      // Seed default demo accounts
      const defaultUsers: StoredUser[] = [];
      
      // Default Demo User 1: Priya Sharma / NaariCare@2026
      const salt1 = crypto.randomBytes(16).toString('hex');
      defaultUsers.push({
        id: 'usr_priya_' + Date.now(),
        name: 'Priya Sharma',
        normalizedName: 'priya sharma',
        salt: salt1,
        hash: hashPassword('NaariCare@2026', salt1),
        createdAt: new Date().toISOString(),
      });

      // Default Demo User 2: Dr. Ananya / NaariCare@2026
      const salt2 = crypto.randomBytes(16).toString('hex');
      defaultUsers.push({
        id: 'usr_ananya_' + Date.now(),
        name: 'Dr. Ananya Rao',
        normalizedName: 'dr. ananya rao',
        salt: salt2,
        hash: hashPassword('NaariCare@2026', salt2),
        createdAt: new Date().toISOString(),
      });

      fs.writeFileSync(USERS_FILE, JSON.stringify(defaultUsers, null, 2), 'utf-8');
      return defaultUsers;
    }

    const data = fs.readFileSync(USERS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('[Auth] Error reading users file:', err);
    return [];
  }
}

function saveUsers(users: StoredUser[]): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf-8');
  } catch (err) {
    console.error('[Auth] Error writing users file:', err);
  }
}

export const AuthService = {
  login(name: string, password: string): { success: boolean; token?: string; user?: { id: string; name: string }; error?: string; status: number } {
    const trimmedName = name.trim();
    if (!trimmedName || trimmedName.length < 2) {
      return { success: false, error: 'Please enter a valid name (at least 2 characters).', status: 400 };
    }

    if (!password || password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters long.', status: 400 };
    }

    const users = loadUsers();
    const normalized = trimmedName.toLowerCase();
    const existing = users.find(u => u.normalizedName === normalized);

    if (existing) {
      // Validate password against stored cryptographic PBKDF2 hash
      const isValid = verifyPassword(password, existing.salt, existing.hash);
      if (!isValid) {
        return {
          success: false,
          error: 'Incorrect password for this user. Please verify your credentials or check case sensitivity.',
          status: 401,
        };
      }

      // Generate cryptographically secure session token
      const token = 'naari_sess_' + crypto.randomBytes(32).toString('hex');
      activeSessions.set(token, {
        token,
        userId: existing.id,
        name: existing.name,
        createdAt: Date.now(),
      });

      return {
        success: true,
        token,
        user: { id: existing.id, name: existing.name },
        status: 200,
      };
    }

    // If new user name, securely initialize their account with PBKDF2 salt & hash
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = hashPassword(password, salt);
    const newUser: StoredUser = {
      id: 'usr_' + Date.now() + '_' + crypto.randomBytes(4).toString('hex'),
      name: trimmedName,
      normalizedName: normalized,
      salt,
      hash,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    saveUsers(users);

    const token = 'naari_sess_' + crypto.randomBytes(32).toString('hex');
    activeSessions.set(token, {
      token,
      userId: newUser.id,
      name: newUser.name,
      createdAt: Date.now(),
    });

    return {
      success: true,
      token,
      user: { id: newUser.id, name: newUser.name },
      status: 200,
    };
  },

  verifySession(token: string): { authenticated: boolean; user?: { id: string; name: string } } {
    if (!token) return { authenticated: false };
    const session = activeSessions.get(token);
    if (!session) return { authenticated: false };
    
    // Check session age (e.g. 7 days max)
    const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;
    if (Date.now() - session.createdAt > sevenDaysMs) {
      activeSessions.delete(token);
      return { authenticated: false };
    }

    return {
      authenticated: true,
      user: { id: session.userId, name: session.name },
    };
  },

  logout(token: string): boolean {
    if (!token) return false;
    return activeSessions.delete(token);
  },
};
