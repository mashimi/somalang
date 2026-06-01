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
    };
  };
}

type Payment = Database["public"]["Tables"]["payments"]["Row"];
type UserProfile = Database["public"]["Tables"]["user_profiles"]["Row"];

// Initial seed data
const SEED_PAYMENTS: Payment[] = [
  {
    id: "pay_1",
    transaction_id: "MPESA-9X3K2R11",
    user_id: "user_1",
    amount: 15000,
    sender_name: "Grace Mwangi",
    created_at: new Date(Date.now() - 3600000 * 2).toISOString(), // 2 hours ago
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
    created_at: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
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
    created_at: new Date(Date.now() - 86400000 * 3).toISOString(), // 3 days ago
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

// Helper keys for AsyncStorage
const PAYMENTS_KEY = "lingua_mock_payments";
const PROFILES_KEY = "lingua_mock_profiles";

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
  } catch (err) {
    console.error("Failed to seed mock database:", err);
  }
}

// Automatically invoke setup
initializeStorage();

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

  async update(values: Partial<T>) {
    try {
      const storageKey = this.tableName === "payments" ? PAYMENTS_KEY : PROFILES_KEY;
      const rawData = await AsyncStorage.getItem(storageKey);
      const data: any[] = rawData ? JSON.parse(rawData) : [];

      let updatedCount = 0;
      const updatedData = data.map((item) => {
        // Check equality filters
        const matches = this.equalityFilters.every(
          (filter) => item[filter.column] === filter.value
        );
        if (matches) {
          updatedCount++;
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

  async insert(values: any) {
    try {
      const storageKey = this.tableName === "payments" ? PAYMENTS_KEY : PROFILES_KEY;
      const rawData = await AsyncStorage.getItem(storageKey);
      const data: any[] = rawData ? JSON.parse(rawData) : [];

      const newRecord = {
        id: Math.random().toString(36).substr(2, 9),
        created_at: new Date().toISOString(),
        status: "pending",
        reviewed_at: null,
        ...values,
      };

      data.push(newRecord);
      await AsyncStorage.setItem(storageKey, JSON.stringify(data));
      return { data: [newRecord], error: null };
    } catch (err: any) {
      return { data: null, error: err };
    }
  }

  // Execution method that runs the mock query
  async then(
    onfulfilled?: ((value: { data: any[] | null; error: any }) => any) | null
  ) {
    try {
      const isPayments = this.tableName === "payments";
      const mainStorageKey = isPayments ? PAYMENTS_KEY : PROFILES_KEY;

      const mainRaw = await AsyncStorage.getItem(mainStorageKey);
      let items: any[] = mainRaw ? JSON.parse(mainRaw) : [];

      // Apply equality filters
      if (this.equalityFilters.length > 0) {
        items = items.filter((item) =>
          this.equalityFilters.every(
            (filter) => item[filter.column] === filter.value
          )
        );
      }

      // Join user_profiles if select contains user_profiles
      if (isPayments && this.selectColumns.includes("user_profiles")) {
        const profilesRaw = await AsyncStorage.getItem(PROFILES_KEY);
        const profiles: UserProfile[] = profilesRaw ? JSON.parse(profilesRaw) : [];

        items = items.map((payment) => {
          const profile = profiles.find((p) => p.id === payment.user_id) || null;
          return {
            ...payment,
            user_profiles: profile,
          };
        });
      }

      // Apply ordering
      if (this.orderColumn) {
        const col = this.orderColumn;
        const ascending = this.orderOptions.ascending !== false;
        items.sort((a, b) => {
          const valA = a[col];
          const valB = b[col];
          if (valA === valB) return 0;
          if (valA == null) return ascending ? -1 : 1;
          if (valB == null) return ascending ? 1 : -1;
          return ascending
            ? valA < valB
              ? -1
              : 1
            : valA < valB
            ? 1
            : -1;
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
