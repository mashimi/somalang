import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Database {
  public: {
    Tables: {
      payments: {
        Row: {
          id: string;
          transaction_id: string;
          user_id: string;
          amount: number;
          sender_name: string | null;
          created_at: string;
          premium_days: number;
          status: "pending" | "approved" | "rejected";
          reviewed_at: string | null;
        };
        Insert: Omit<Database["public"]["Tables"]["payments"]["Row"], "id" | "created_at" | "status" | "reviewed_at"> & {
          id?: string;
          created_at?: string;
          status?: "pending" | "approved" | "rejected";
          reviewed_at?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["payments"]["Row"]>;
      };
      user_profiles: {
        Row: {
          id: string;
          phone: string;
          referral_code: string;
          premium_until: string | null;
        };
        Insert: Omit<Database["public"]["Tables"]["user_profiles"]["Row"], "premium_until"> & {
          premium_until?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["user_profiles"]["Row"]>;
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
        Insert: Omit<Database["public"]["Tables"]["referrals"]["Row"], "id" | "created_at" | "status"> & {
          id?: string;
          created_at?: string;
          status?: "pending" | "granted";
        };
        Update: Partial<Database["public"]["Tables"]["referrals"]["Row"]>;
      };
    };
  };
}

type Payment = Database["public"]["Tables"]["payments"]["Row"];
type UserProfile = Database["public"]["Tables"]["user_profiles"]["Row"];
type Referral = Database["public"]["Tables"]["referrals"]["Row"];

// Initial seed data
const SEED_PAYMENTS: Payment[] = [
  {
    id: "pay_1",
    transaction_id: "MPESA-9X3K2R11",
    user_id: "user_1",
    amount: 15000,
    sender_name: "Grace Mwangi",
    created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
    premium_days: 30,
    status: "pending",
    reviewed_at: null,
  },
  {
    id: "pay_2",
    transaction_id: "MPESA-5H7J9K88",
    user_id: "user_2",
    amount: 45000,
    sender_name: "John Kamau",
    created_at: new Date(Date.now() - 86400000).toISOString(),
    premium_days: 90,
    status: "approved",
    reviewed_at: new Date(Date.now() - 86400000 + 3600000).toISOString(),
  },
  {
    id: "pay_3",
    transaction_id: "MPESA-2L1N4M77",
    user_id: "user_3",
    amount: 15000,
    sender_name: "Sarah Juma",
    created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
    premium_days: 30,
    status: "rejected",
    reviewed_at: new Date(Date.now() - 86400000 * 3 + 7200000).toISOString(),
  },
];

const SEED_PROFILES: UserProfile[] = [
  {
    id: "user_1",
    phone: "+254712345678",
    referral_code: "GRACE123",
    premium_until: null,
  },
  {
    id: "user_2",
    phone: "+254722222222",
    referral_code: "JOHN99",
    premium_until: new Date(Date.now() + 90 * 86400000).toISOString(),
  },
  {
    id: "user_3",
    phone: "+254733333333",
    referral_code: "SARAH77",
    premium_until: null,
  },
];

const SEED_REFERRALS: Referral[] = [
  {
    id: "ref_1",
    referrer_id: "user_1",
    referee_id: "user_2",
    reward_xp: 500,
    status: "granted",
    created_at: new Date(Date.now() - 86400000 * 7).toISOString(),
  },
];

// Helper keys for AsyncStorage
const PAYMENTS_KEY = "lingua_mock_payments";
const PROFILES_KEY = "lingua_mock_profiles";
const REFERRALS_KEY = "lingua_mock_referrals";

async function initializeStorage() {
  try {
    const existingPayments = await AsyncStorage.getItem(PAYMENTS_KEY);
    if (!existingPayments) {
      await AsyncStorage.setItem(PAYMENTS_KEY, JSON.stringify(SEED_PAYMENTS));
    }
    const existingProfiles = await AsyncStorage.getItem(PROFILES_KEY);
    if (!existingProfiles) {
      await AsyncStorage.setItem(PROFILES_KEY, JSON.stringify(SEED_PROFILES));
    }
    const existingReferrals = await AsyncStorage.getItem(REFERRALS_KEY);
    if (!existingReferrals) {
      await AsyncStorage.setItem(REFERRALS_KEY, JSON.stringify(SEED_REFERRALS));
    }
  } catch (err) {
    console.error("Failed to seed mock database:", err);
  }
}

// Automatically invoke setup
initializeStorage();

function getStorageKey(tableName: string): string {
  switch (tableName) {
    case "payments": return PAYMENTS_KEY;
    case "user_profiles": return PROFILES_KEY;
    case "referrals": return REFERRALS_KEY;
    default: return PAYMENTS_KEY;
  }
}

class QueryBuilder<T> {
  private tableName: string;
  private selectColumns: string = "*";
  private equalityFilters: { column: string; value: any }[] = [];
  private orderColumn: string | null = null;
  private orderOptions: { ascending?: boolean } = {};

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  select(columns: string) {
    this.selectColumns = columns;
    return this;
  }

  eq(column: string, value: any) {
    this.equalityFilters.push({ column, value });
    return this;
  }

  order(column: string, options: { ascending?: boolean } = {}) {
    this.orderColumn = column;
    this.orderOptions = options;
    return this;
  }

  async update(values: Record<string, any>) {
    try {
      const storageKey = getStorageKey(this.tableName);
      const rawData = await AsyncStorage.getItem(storageKey);
      const data: any[] = rawData ? JSON.parse(rawData) : [];

      const updatedData = data.map((item) => {
        const matches = this.equalityFilters.every(
          (filter) => item[filter.column] === filter.value
        );
        if (matches) {
          return { ...item, ...values };
        }
        return item;
      });

      await AsyncStorage.setItem(storageKey, JSON.stringify(updatedData));
      return { data: null, error: null };
    } catch (err: any) {
      return { data: null, error: err };
    }
  }

  async insert(values: Record<string, any>) {
    try {
      const storageKey = getStorageKey(this.tableName);
      const rawData = await AsyncStorage.getItem(storageKey);
      const data: any[] = rawData ? JSON.parse(rawData) : [];

      const newRecord = {
        id: Math.random().toString(36).substr(2, 9),
        created_at: new Date().toISOString(),
        status: "pending",
        ...values,
      };

      data.push(newRecord);
      await AsyncStorage.setItem(storageKey, JSON.stringify(data));
      return { data: [newRecord], error: null };
    } catch (err: any) {
      return { data: null, error: err };
    }
  }

  async then(
    onfulfilled?: ((value: { data: any[] | null; error: any }) => any) | null
  ) {
    try {
      const storageKey = getStorageKey(this.tableName);
      const mainRaw = await AsyncStorage.getItem(storageKey);
      let items: any[] = mainRaw ? JSON.parse(mainRaw) : [];

      // Apply equality filters
      if (this.equalityFilters.length > 0) {
        items = items.filter((item) =>
          this.equalityFilters.every(
            (filter) => item[filter.column] === filter.value
          )
        );
      }

      // Join user_profiles for payments
      if (this.tableName === "payments" && this.selectColumns.includes("user_profiles")) {
        const profilesRaw = await AsyncStorage.getItem(PROFILES_KEY);
        const profiles: UserProfile[] = profilesRaw ? JSON.parse(profilesRaw) : [];

        items = items.map((payment: any) => {
          const profile = profiles.find((p: UserProfile) => p.id === payment.user_id) || null;
          return { ...payment, user_profiles: profile };
        });
      }

      // Join referrer/referee for referrals
      if (this.tableName === "referrals") {
        const profilesRaw = await AsyncStorage.getItem(PROFILES_KEY);
        const profiles: UserProfile[] = profilesRaw ? JSON.parse(profilesRaw) : [];

        if (this.selectColumns.includes("referrer")) {
          items = items.map((ref: any) => {
            const referrer = profiles.find((p: UserProfile) => p.id === ref.referrer_id) || null;
            return { ...ref, referrer };
          });
        }
        if (this.selectColumns.includes("referee")) {
          items = items.map((ref: any) => {
            const referee = profiles.find((p: UserProfile) => p.id === ref.referee_id) || null;
            return { ...ref, referee };
          });
        }
      }

      // Apply ordering
      if (this.orderColumn) {
        const col = this.orderColumn;
        const ascending = this.orderOptions.ascending !== false;
        items.sort((a: any, b: any) => {
          const valA = a[col];
          const valB = b[col];
          if (valA === valB) return 0;
          if (valA == null) return ascending ? -1 : 1;
          if (valB == null) return ascending ? 1 : -1;
          return ascending
            ? valA < valB ? -1 : 1
            : valA < valB ? 1 : -1;
        });
      }

      const result = { data: items, error: null };
      if (onfulfilled) {
        return onfulfilled(result);
      }
      return result;
    } catch (err: any) {
      const result = { data: null, error: err };
      if (onfulfilled) {
        return onfulfilled(result);
      }
      return result;
    }
  }
}

export const supabase = {
  from(tableName: string) {
    return new QueryBuilder(tableName);
  },
};