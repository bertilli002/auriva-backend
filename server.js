const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PEYFLEX_BASE = "https://api.peyflex.ng/api/v1";
const PEYFLEX_TOKEN = "90088e06555939e690c82f9f72f541cab6af8281";

const headers = {
  "Authorization": "Bearer " + PEYFLEX_TOKEN,
  "Content-Type": "application/json"
};

// Health check
app.get("/", (req, res) => {
  res.json({ status: "AURIVA backend running" });
});

// ── AIRTIME ──
app.post("/buy/airtime", async (req, res) => {
  try {
    const { provider, amount, phone_number } = req.body;
    const r = await fetch(PEYFLEX_BASE + "/airtime/purchase", {
      method: "POST",
      headers,
      body: JSON.stringify({ provider, amount, phone_number })
    });
    const data = await r.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ status: "error", message: e.message });
  }
});

// ── DATA PLANS ──
app.get("/data/plans/:provider", async (req, res) => {
  try {
    const r = await fetch(PEYFLEX_BASE + "/data/plans/" + req.params.provider, { headers });
    const data = await r.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ status: "error", message: e.message });
  }
});

// ── BUY DATA ──
app.post("/buy/data", async (req, res) => {
  try {
    const { plan_id, phone_number } = req.body;
    const r = await fetch(PEYFLEX_BASE + "/data/purchase", {
      method: "POST",
      headers,
      body: JSON.stringify({ plan_id, phone_number })
    });
    const data = await r.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ status: "error", message: e.message });
  }
});

// ── ELECTRICITY ──
app.post("/buy/electricity", async (req, res) => {
  try {
    const { provider, meter_number, amount, phone_number, type } = req.body;
    const r = await fetch(PEYFLEX_BASE + "/electricity/pay", {
      method: "POST",
      headers,
      body: JSON.stringify({ provider, meter_number, amount, phone_number, type })
    });
    const data = await r.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ status: "error", message: e.message });
  }
});

// ── TV / CABLE ──
app.post("/buy/tv", async (req, res) => {
  try {
    const { provider, plan_id, smart_card_number } = req.body;
    const r = await fetch(PEYFLEX_BASE + "/cable/pay", {
      method: "POST",
      headers,
      body: JSON.stringify({ provider, plan_id, smart_card_number })
    });
    const data = await r.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ status: "error", message: e.message });
  }
});

// ── BETTING ──
app.post("/buy/betting", async (req, res) => {
  try {
    const { provider, customer_id, amount, phone_number } = req.body;
    const r = await fetch(PEYFLEX_BASE + "/betting/fund", {
      method: "POST",
      headers,
      body: JSON.stringify({ provider, customer_id, amount, phone_number })
    });
    const data = await r.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ status: "error", message: e.message });
  }
});

// ── EDUCATION ──
app.post("/buy/edu", async (req, res) => {
  try {
    const { provider, phone_number, quantity } = req.body;
    const r = await fetch(PEYFLEX_BASE + "/education/purchase", {
      method: "POST",
      headers,
      body: JSON.stringify({ provider, phone_number, quantity })
    });
    const data = await r.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ status: "error", message: e.message });
  }
});

// ── WALLET BALANCE ──
app.get("/wallet", async (req, res) => {
  try {
    const r = await fetch(PEYFLEX_BASE + "/user/balance", { headers });
    const data = await r.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ status: "error", message: e.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("AURIVA backend running on port " + PORT));
