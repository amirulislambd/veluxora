# 🚗 Veluxora — Premium Car Rental Platform

**Live Site:** [https://veluxora.vercel.app](https://veluxora.vercel.app)

---

## 📌 About the Project

Veluxora is a full-stack premium car rental platform where users can explore an exclusive collection of high-performance vehicles, view detailed car information, make bookings, and manage their listings — all within a sleek, luxury-themed interface.

---

## ✨ Key Features

- 🔐 **Secure Authentication** — Email/password and Google login with JWT stored in HTTPOnly cookies. Private routes are fully protected and persist on page reload without redirecting to login.

- 🚘 **Full Car Management (CRUD)** — Authenticated users can add, update, and delete their own car listings with real-time feedback and confirmation modals before any destructive action.

- 📅 **Smart Booking System** — Users can book any available car with options for driver assistance, special notes, and automatic total price calculation based on rental duration.

- 🔍 **Search & Filter** — Explore Cars page supports live search by car name using MongoDB `$regex` and filter by car type (SUV, Sedan, Luxury, etc.) for a seamless browsing experience.

- 📊 **Booking Count Tracking** — Every successful booking increments the car's `booking_count` using MongoDB `$inc` operator, powering the "Popular" badge shown on high-demand vehicles.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14, Tailwind CSS, Framer Motion |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas |
| Auth | Firebase Auth, JWT (HTTPOnly Cookie) |
| Deployment | Vercel (Client), Render (Server) |

---

## 📂 Project Structure

```
src/
├── app/
│   ├── (auth)/           # Login & Register
│   ├── (private)/        # AddCar, MyBookings, MyAddedCars
│   ├── exploreCars/[id]/ # Explore + Car Details
│   ├── api/auth/         # JWT Auth API
│   ├── not-found.jsx     # 404 Page
│   └── page.js           # Home
├── components/
│   ├── Home/             # Banner, Fleets, CTAbanner, etc.
│   ├── ExploreCars/      # CarDetails, BookingModal, etc.
│   ├── MyAddedCars/      # MyCarCard, Update, Delete
│   ├── MyBookings/       # BookingCard, CancelBtn
│   └── Shared/           # Navbar, Footer
└── lib/                  # auth, dataFetch, proxy
```

---

## 🚀 Run Locally

```bash
# Clone the repository
git clone https://github.com/amirulislambd/veluxora.git

# Navigate to project
cd veluxora-client

# Install dependencies
npm install

# Add environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

### Required Environment Variables

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_SERVER_URL=
```

---

## 🔗 Related Repository

- **Server Side:** [veluxora-server](https://github.com/amirulislambd/veluxora-server)

---

## 📸 Screenshots

> Home Page → Explore Fleet → Car Details → Booking → My Bookings

---

*© 2026 Veluxora. Built with ❤️ for the discerning driver.*