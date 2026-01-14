# BoRide Admin Dashboard

## 🎯 Overview

Admin portal for managing the BoRide platform. This dashboard allows administrators to:

- Monitor platform metrics (students, drivers, rides)
- Manage student accounts (activate/suspend)
- Manage driver accounts (activate/suspend)
- View all ride activity

## 🏗️ Architecture

- **Frontend**: Next.js 16 (App Router) + TypeScript
- **State Management**: React Query for server state
- **Styling**: Tailwind CSS
- **Authentication**: HTTP-only cookies with JWT
- **Backend**: Shared with main app (`boride-backend`)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm
- Backend API running (boride-backend)

### Installation

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.local.example .env.local
```

### Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Running the App

```bash
# Development mode
pnpm dev

# Production build
pnpm build
pnpm start
```

The app will be available at `http://localhost:3000`

## 🔐 Authentication

### Creating Admin Users

Admin users must be created manually in the database. Use the backend seeding script:

```bash
cd ../boride-backend
node seedAdmin.js
```

**Default Credentials:**
- Email: `admin@boride.com`
- Password: `admin123`

⚠️ **Change these credentials after first login!**

### Authentication Flow

1. Admin navigates to `/login`
2. Enters credentials
3. Backend validates and sets HTTP-only cookie
4. Frontend redirects to `/dashboard`
5. All routes are protected via `AdminAuthProvider`

## 📁 Project Structure

```
boride-admin/
├── app/
│   ├── login/              # Login page
│   ├── dashboard/          # Protected admin routes
│   │   ├── page.tsx        # Dashboard overview
│   │   ├── students/       # Student management
│   │   ├── drivers/        # Driver management
│   │   └── rides/          # Ride monitoring
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home (redirects to login)
├── lib/
│   ├── admin-api.ts        # API client functions
│   └── contexts/
│       └── AdminAuthContext.tsx  # Auth context
└── components/
    └── ui/                 # Reusable UI components
```

## 🛡️ Security

- **Separate Authentication**: Admin auth is completely separate from student/driver auth
- **HTTP-only Cookies**: JWTs stored in HTTP-only cookies (not localStorage)
- **Role Verification**: Backend middleware validates `role === "admin"`
- **No Public Signup**: Admins can only be created via backend script
- **Route Protection**: All dashboard routes require authentication

## 📊 Features

### Dashboard (`/dashboard`)
- Total students count
- Total drivers count
- Total rides count
- Active rides count

### Students Management (`/dashboard/students`)
- Paginated student list
- View student details (name, email, matric no, phone, wallet balance)
- Suspend/Activate student accounts

### Drivers Management (`/dashboard/drivers`)
- Paginated driver list
- View driver details (name, email, phone, vehicle info, rating)
- Suspend/Activate driver accounts

### Rides Monitoring (`/dashboard/rides`)
- Paginated ride list (read-only)
- View ride details (student, driver, route, fare, payment method, status)
- Color-coded status badges

## 🚫 Non-Features (Phase 1)

The following features are **NOT** included in this MVP:

- ❌ Payment/refund management
- ❌ Analytics charts
- ❌ Admin role levels
- ❌ Audit logs
- ❌ Notifications
- ❌ Direct messaging

These will be added in future phases.

## 🔧 Development Notes

- **React Query** is used for all server state
- No Zustand stores (admin state is separate from main app)
- No UI component sharing with main `boride` app
- Backend admin routes are in `/api/admin/*` namespace

## 📦 Deployment

### Vercel (Recommended)

```bash
vercel --prod
```

### Environment Variables (Production)

Set the following in your deployment platform:

```
NEXT_PUBLIC_API_URL=https://your-backend-api.com/api
```

## 🐛 Troubleshooting

### "Admin not found" error
- Ensure you've run the `seedAdmin.js` script
- Check database connection

### "Invalid credentials"
- Verify email/password match seeded values
- Check backend logs for auth errors

### API connection issues
- Verify `NEXT_PUBLIC_API_URL` is correct
- Ensure backend is running
- Check CORS settings in backend

## 📝 License

Proprietary - BoRide Platform
