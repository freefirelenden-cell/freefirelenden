const BASE_URL = process.env.NEXTAUTH_URL || "https://lendenff.vercel.app";

export async function getAllAccounts(filters = {}, page = 1, limit = 12) {
  try {
    const params = new URLSearchParams({
      ...filters,
      page,
      limit,
    }).toString();

    const res = await fetch(`${BASE_URL}/api/accounts?${params}`, {
      cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error || "API Error");

    return data;
  } catch (err) {
    console.error("❌ getAllAccounts Error:", err.message);
    return [];
  }
}
// create account 
export async function createAccount(formData) {
  try {
    const res = await fetch(`${BASE_URL}/api/accounts`, {
      method: "POST",
      headers: { "Content-Type": "application/json", },
      body: JSON.stringify(formData),
      cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Failed to create account");
    }

    return data;
  } catch (err) {
    console.error("createAccount error:", err.message);
    return null;
  }
}

export async function getAccountById(id) {
  try {
    const res = await fetch(`${BASE_URL}/api/accounts/${id}`, {
      cache: "no-store",
    });
    

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Failed to fetch account");
    }

    return data.account;
  } catch (error) {
    console.error("❌ getAccountById error:", error.message);
    return null;
  }
}



export async function getAccountsOrders(id = "") {
  try {
   
    const res = await fetch(`${BASE_URL}/api/orders?id=${id}`, {
      cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error || "API Error");

    return data;
  } catch (err) {
    console.error("❌ get orders Error:", err.message);
    return [];
  }
}



export async function syncUser(userData) {
  try {
    const res = await fetch('/api/auth/user/sync-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    const data = await res.json();
    return data
  } catch (error) {
    console.error('❌ Failed to sync user:', error);
  }
};





export async function getSellerRequests(status = "all") {
  try {
    const res = await fetch(
      `${BASE_URL}/api/admin/sellers?status=${status}`,
      {
        cache: "no-store",
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Failed to fetch seller requests");
    }

    return data;
  } catch (error) {
    console.error("❌ getSellerRequests error:", error.message);
    return [];
  }
}





export async function rejectSeller(sellerId, reason) {
  try {
    const res = await fetch("/api/admin/sellers", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sellerId,
        action: "reject",
        rejectionReason: reason,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Reject failed");
    }

    return data;
  } catch (error) {
    console.error("❌ rejectSeller error:", error.message);
    return { success: false };
  }
}
