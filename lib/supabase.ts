import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import Constants from "expo-constants";
import "react-native-url-polyfill/auto";

const supabaseUrl = Constants.expoConfig?.extra?.supabaseUrl as string;
const supabaseAnonKey = Constants.expoConfig?.extra?.supabaseAnonKey as string;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "Missing Supabase configuration. Add EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY to your .env file"
  );
}

// Noop storage for SSR (server-side rendering) where window is not available
const noopStorage = {
  getItem: async () => null,
  setItem: async () => {},
  removeItem: async () => {},
};

const isBrowser = typeof window !== "undefined";

export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder-key",
  {
    auth: {
      storage: isBrowser ? AsyncStorage : noopStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
);

// ============ Types ============
export interface Database {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string;
          phone: string;
          referral_code: string;
          referred_by: string | null;
          premium_until: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          phone: string;
          referral_code?: string;
          referred_by?: string | null;
          premium_until?: string | null;
        };
        Update: Partial<
          Database["public"]["Tables"]["user_profiles"]["Insert"]
        >;
      };
      payments: {
        Row: {
          id: string;
          user_id: string;
          transaction_id: string;
          amount: number;
          sender_name: string | null;
          status: "pending" | "approved" | "rejected";
          premium_days: number;
          created_at: string;
          reviewed_at: string | null;
        };
        Insert: Omit<
          Database["public"]["Tables"]["payments"]["Row"],
          "id" | "created_at" | "status" | "reviewed_at"
        > & {
          id?: string;
          status?: "pending" | "approved" | "rejected";
        };
        Update: Partial<
          Database["public"]["Tables"]["payments"]["Row"]
        >;
      };
      referrals: {
        Row: {
          id: string;
          referrer_id: string;
          referee_id: string;
          reward_xp: number;
          status: "pending" | "granted";
          created_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["referrals"]["Row"],
          "id" | "created_at" | "status"
        > & {
          status?: "pending" | "granted";
        };
        Update: Partial<
          Database["public"]["Tables"]["referrals"]["Row"]
        >;
      };
    };
  };
}

// ============ Helpers ============

/**
 * Format Tanzania phone number to E.164 format (+255XXXXXXXXX)
 * Accepts: 0712345678, +255712345678, 255712345678, 712345678
 */
export function formatTanzaniaPhone(input: string): string | null {
  // Remove all non-digits
  const digits = input.replace(/\D/g, "");

  let formatted: string;

  if (digits.startsWith("255") && digits.length === 12) {
    formatted = `+${digits}`;
  } else if (digits.startsWith("0") && digits.length === 10) {
    formatted = `+255${digits.substring(1)}`;
  } else if (digits.length === 9) {
    formatted = `+255${digits}`;
  } else {
    return null;
  }

  // Validate: Tanzania mobiles start with 6, 7, or 8 after country code
  const mobilePrefix = formatted.substring(4, 5);
  if (!["6", "7", "8"].includes(mobilePrefix)) {
    return null;
  }

  return formatted;
}

/**
 * Validate Tanzania phone format
 */
export function isValidTanzaniaPhone(phone: string): boolean {
  return formatTanzaniaPhone(phone) !== null;
}

/**
 * Generate a 6-char referral code (e.g., TZA-A3F9K2)
 */
export function generateReferralCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "TZA-";
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

/**
 * Validate a 6-digit PIN
 */
export function isValidPin(pin: string): boolean {
  return /^\d{6}$/.test(pin);
}
