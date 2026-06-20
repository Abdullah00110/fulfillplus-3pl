# Pushing this project to GitHub

Follow these steps in order. Run the commands in **Command Prompt** or
**PowerShell** from inside the `fulfillplus` folder.

---

## Step 1 — Create an empty repo on GitHub

1. Go to https://github.com/new
2. **Repository name:** `fulfillplus-3pl` (or any name you like)
3. Add a short description, e.g. *"Modern FulfillPlus order management — Django REST + React + PostgreSQL"*
4. Choose **Public** (so your manager can see it) or Private.
5. **Do NOT** tick "Add a README", "Add .gitignore", or "Add license" —
   the project already has those. Leave the repo empty.
6. Click **Create repository**.

GitHub will show you a page with a URL like:
`https://github.com/YOUR_USERNAME/fulfillplus-3pl.git`
Copy that URL — you'll need it in Step 3.

---

## Step 2 — Initialise Git locally

Open a terminal inside the `fulfillplus` folder:

```bat
cd path\to\fulfillplus

:: start a git repo here
git init

:: stage every file (the .gitignore keeps junk out automatically)
git add .

:: make your first commit
git commit -m "Initial commit: FulfillPlus orders (Django REST + React + Tailwind)"
```

> First time using Git on this machine? Run these once so commits have your name:
> ```bat
> git config --global user.name "Abdullah Sunasra"
> git config --global user.email "your-email@example.com"
> ```

---

## Step 3 — Connect to GitHub and push

Paste the URL you copied in Step 1:

```bat
:: link your local repo to the GitHub one
git remote add origin https://github.com/YOUR_USERNAME/fulfillplus-3pl.git

:: rename the branch to main
git branch -M main

:: push your code up
git push -u origin main
```

If a login window pops up, sign in to GitHub (or paste a **Personal Access
Token** if it asks for a password — GitHub no longer accepts your account
password on the command line).

> Need a token? GitHub → Settings → Developer settings →
> Personal access tokens → Tokens (classic) → Generate new token →
> tick `repo` → copy it and use it as the password.

---

## Step 4 — Confirm

Refresh your GitHub repo page in the browser. You should see all the files,
the README rendered nicely with badges, and your commit. Done — send the link
to your manager.

---

## Making changes later

Whenever you edit something and want it on GitHub:

```bat
git add .
git commit -m "Describe what you changed"
git push
```

---

## What gets uploaded (and what doesn't)

The `.gitignore` automatically **excludes**:
- `venv/` and `node_modules/` (huge, rebuilt from requirements.txt / package.json)
- `.env` (your real database password — never push this)
- `__pycache__/`, `db.sqlite3`, build files

So your repo stays clean and safe. Anyone who clones it just runs the setup
steps in `README.md` to get it working.
