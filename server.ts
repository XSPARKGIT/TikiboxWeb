import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import admin from "firebase-admin";
import firebaseConfig from "./firebase-applet-config.json" assert { type: "json" };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    projectId: firebaseConfig.projectId,
  });
}

const db = admin.firestore();
if (firebaseConfig.firestoreDatabaseId) {
  // admin.firestore() doesn't directly take databaseId in initializeApp for all SDK versions,
  // but we can use it if needed. For now, we'll assume default or handle it if possible.
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes
  app.post("/api/transfer", async (req, res) => {
    const { fromUid, toPhoneNumber, amount, pin } = req.body;

    try {
      const fromUserRef = db.collection("users").doc(fromUid);
      const fromUserDoc = await fromUserRef.get();

      if (!fromUserDoc.exists) {
        return res.status(404).json({ error: "Sender not found" });
      }

      const fromUserData = fromUserDoc.data();
      if (fromUserData?.pin !== pin) {
        return res.status(403).json({ error: "Invalid PIN" });
      }

      if (fromUserData?.balance < amount) {
        return res.status(400).json({ error: "Insufficient balance" });
      }

      // Find recipient by phone number
      const toUserQuery = await db.collection("users").where("phoneNumber", "==", toPhoneNumber).limit(1).get();
      if (toUserQuery.empty) {
        return res.status(404).json({ error: "Recipient not found" });
      }

      const toUserDoc = toUserQuery.docs[0];
      const toUserRef = toUserDoc.ref;

      // Atomic transaction
      await db.runTransaction(async (t) => {
        t.update(fromUserRef, { balance: admin.firestore.FieldValue.increment(-amount) });
        t.update(toUserRef, { balance: admin.firestore.FieldValue.increment(amount) });
        
        const transactionRef = db.collection("transactions").doc();
        t.set(transactionRef, {
          fromUid,
          toUid: toUserDoc.id,
          amount,
          type: "transfer",
          status: "success",
          timestamp: admin.firestore.FieldValue.serverTimestamp(),
          description: `Transfer to ${toPhoneNumber}`
        });
      });

      res.json({ success: true });
    } catch (error) {
      console.error("Transfer error:", error);
      res.status(500).json({ error: "Transfer failed" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
