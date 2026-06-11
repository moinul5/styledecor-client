# StyleDecor — Client

A premium full-stack decoration service booking platform built with React, Vite, TailwindCSS v4, DaisyUI, and Firebase Authentication.

#Admin id pass
- ```bash
   admin@styledecor.com
   ```
```bash
   Admin@123
   ```
## Features
- **Role-Based Dashboards**: Distinct, protected views for Users, Decorators, and Admins.
- **Premium UI/UX**: Dark luxury theme featuring glassmorphism, smooth Framer Motion animations, and custom gradients.
- **Booking & Payments**: Full booking workflow with date/location selection, and integrated Stripe payment processing.
- **Analytics & Mapping**: Admin data visualization via Recharts and interactive branch location map via React-Leaflet.
- **Authentication**: Secure Firebase Auth with Email/Password and Google sign-in methods, paired with HttpOnly JWTs.

## Tech Stack
- **Framework**: React 19 + Vite
- **Routing**: React Router v7
- **Styling**: Tailwind CSS v4, DaisyUI v5
- **Animations**: Motion (framer-motion)
- **State/Data Fetching**: TanStack Query (React Query v5), Axios
- **Forms**: React Hook Form
- **Mapping**: React-Leaflet v5
- **Charts**: Recharts
- **Payments**: Stripe React SDK
- **Hosting**: Firebase Hosting

## Local Setup

1. **Clone the repository and install dependencies:**
   ```bash
   npm install
   ```

2. **Configure Environment Variables:**
   Create a `.env` file in the root based on `.env.example` if available, or just rely on the hardcoded configs inside `firebase/firebase.config.js` (for demo purposes). 
   To connect to your local or deployed server, ensure your `axiosInstance.js` points to the correct backend URL.

3. **Start the development server:**
   ```bash
   npm run dev
   ```

## Build for Production
```bash
npm run build
```

## Deployment
This project is configured to deploy to Firebase Hosting.
```bash
firebase deploy --only hosting
```
