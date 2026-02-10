# 🍃 MongoDB Atlas Setup Guide (Free Database)

Follow these exact steps to create your cloud database.

---

## 1️⃣ Create an Account
1. Go to: **[mongodb.com/atlas/register](https://www.mongodb.com/cloud/atlas/register)**
2. Sign up with Google or Email (It's free, no credit card needed)
3. Accept terms and click **Submit**

---

## 2️⃣ Create a Cluster
1. You'll see a deployment page.
2. Choose **M0 Free** (the free tier option)
3. Provider: **AWS**
4. Region: **N. Virginia (us-east-1)** or **Mumbai (ap-south-1)** (choose closest to you)
5. Name: `Cluster0` (default is fine)
6. Click **Create** (green button at bottom)

---

## 3️⃣ Security Setup (Crucial!)
You'll see a "Security Quickstart" popup.

### A. Create User
1. Username: `admin`
2. Password: **Create a strong password** (e.g., `LPUproject2026`)
   - ⚠️ **WRITE THIS DOWN!** You will need it later.
3. Click **Create User**

### B. Allow Access (Network)
1. Scroll down to "IP Access List"
2. Click **"Allow Access from Anywhere"** (or add `0.0.0.0/0`)
   - *Note: This ensures Render can connect to your database.*
3. Click **Add IP Address**
4. Click **Finish and Close**

---

## 4️⃣ Get Connection String
1. You will be on the main Dashboard.
2. Click the **Connect** button (white button near your cluster name).
3. Select **"Drivers"** (middle option).
4. You'll see a connection string like this:
   ```
   mongodb+srv://admin:<password>@cluster0.abcde.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
   ```
5. **Copy this string.**
6. Paste it into Notepad.
7. **Replace `<password>`** with the password you created in step 3A.
   - Example final string:
     `mongodb+srv://admin:LPUproject2026@cluster0.abcde.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

---

## ✅ You're Done!
You now have a live MongoDB database ready for your backend!

### Next Step: Add to Render
1. Go to your Render Dashboard
2. Select your `lpu-backend` service
3. Go to **Environment** tab
4. Add Environment Variable:
   - Key: `MONGODB_URI`
   - Value: (The connection string you just created)
5. Click **Save Changes**

Render will automatically restart and connect to your new database! 🎉
