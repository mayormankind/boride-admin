# BoRide Admin - Quick Start Guide

## 🚀 Quick Setup (5 Minutes)

### Step 1: Create Admin User

```bash
# Navigate to backend
cd boride-backend

# Run the seed script
node seedAdmin.js
```

Expected output:

```
✅ Admin user created successfully!
📧 Email: admin@boride.com
🔑 Password: admin123
```

### Step 2: Start Backend

```bash
# In boride-backend directory
npm run dev
```

Backend should run on `http://localhost:5000`

### Step 3: Start Admin Frontend

```bash
# Open new terminal
cd boride-admin

# Install dependencies (first time only)
pnpm install

# Start dev server
pnpm dev
```

Admin dashboard runs on `http://localhost:3000`

### Step 4: Login

1. Open `http://localhost:3000`
2. You'll be redirected to `/login`
3. Enter credentials:
   - **Email**: `admin@boride.com`
   - **Password**: `admin123`
4. Click "Sign In"

## 📱 Using the Dashboard

### Dashboard Overview

- View total students, drivers, rides
- Monitor active rides in real-time

### Managing Students

1. Click "Students" in sidebar
2. View student list with wallet balances
3. Click "Suspend" to deactivate a student
4. Click "Activate" to reactivate

### Managing Drivers

1. Click "Drivers" in sidebar
2. View driver list with vehicle info & ratings
3. Click "Suspend" to deactivate a driver
4. Click "Activate" to reactivate

### Monitoring Rides

1. Click "Rides" in sidebar
2. View all rides (read-only in Phase 1)
3. See student, driver, route, status

## 🔧 Common Tasks

### Adding More Admins

Create a custom seed script or use MongoDB Compass to manually insert:

```javascript
{
  fullName: "New Admin Name",
  email: "newadmin@boride.com",
  password: "<bcrypt_hashed_password>",
  role: "admin",
  isActive: true
}
```

### Logging Out

Click "Logout" button in sidebar (bottom left)

### Troubleshooting

**Can't login?**

- Verify backend is running
- Check `seedAdmin.js` ran successfully
- Verify `NEXT_PUBLIC_API_URL` in `.env.local`

**Pages not loading?**

- Check browser console for errors
- Verify backend API is accessible
- Check network tab in DevTools

**Students/Drivers not showing?**

- Ensure there's data in the database
- Check backend logs for errors

## 🌐 Environment Variables

Create `.env.local` in `boride-admin`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

For production:

```env
NEXT_PUBLIC_API_URL=https://your-api-domain.com/api
```

## 📍 API Endpoints Reference

All admin endpoints are prefixed with `/api/admin`:

### Auth

- `POST /api/admin/auth/login` - Login
- `GET /api/admin/auth/me` - Get current admin
- `POST /api/admin/auth/logout` - Logout

### Dashboard

- `GET /api/admin/dashboard/stats` - Get stats

### Students

- `GET /api/admin/students?page=1&limit=20` - List students
- `PATCH /api/admin/students/:id/status` - Update status

### Drivers

- `GET /api/admin/drivers?page=1&limit=20` - List drivers
- `PATCH /api/admin/drivers/:id/status` - Update status

### Rides

- `GET /api/admin/rides?page=1&limit=20` - List rides

## 🎯 Phase 1 Limitations

**What's NOT included:**

- Payment management
- Analytics/charts
- Admin role levels
- Audit logs
- Notifications
- Messaging
- Ride editing
- Financial reports

These features will come in future phases.

## 📞 Support

For issues, check:

1. Backend console logs
2. Frontend browser console
3. Network requests in DevTools

Common issues are usually:

- Backend not running
- Wrong API URL
- Missing admin in database
- CORS configuration
