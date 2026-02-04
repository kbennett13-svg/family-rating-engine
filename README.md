# Family Rating Engine 🎢

A mobile-first web app for your family to rate and rank items in groups (WDW rides, dining, rollercoasters).

## Features

- **Simple Name Picker** - No passwords, just select your name
- **Vote 1-100** - Rate any item with optional notes
- **Live Rankings** - See items ranked by average score
- **Mobile-First** - Easy to use while walking around the parks
- **Filter & Search** - Find items by park, type, or name

## Quick Start

### 1. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "Add New Project" and import this repository
3. Add a Postgres database:
   - In Vercel dashboard, go to **Storage** → **Create Database** → **Postgres**
   - Select "Neon" as the provider (free tier available)
   - Connect it to your project
4. Deploy!

### 2. Initialize the Database

After deploying, run these commands locally:

```bash
# Clone your repo
git clone https://github.com/YOUR_USERNAME/family-rating-engine
cd family-rating-engine

# Install dependencies
npm install

# Copy environment variables from Vercel
# Go to Vercel dashboard → Settings → Environment Variables
# Copy POSTGRES_URL to a local .env file

# Push database schema
npm run db:push

# Seed with family members and WDW rides
npm run db:seed
```

### 3. Start Rating!

Visit your deployed URL and start rating rides as a family!

## Local Development

```bash
# Install dependencies
npm install

# Create .env file with your database URL
cp .env.example .env
# Edit .env with your POSTGRES_URL

# Push schema to database
npm run db:push

# Seed database
npm run db:seed

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Database Commands

```bash
npm run db:push      # Push schema changes to database
npm run db:seed      # Seed initial data (voters + WDW rides)
npm run db:studio    # Open Drizzle Studio to browse data
npm run db:generate  # Generate migration files
```

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: Postgres (Vercel Postgres / Neon)
- **ORM**: Drizzle
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

## Family Members

The seed script creates these voters:
- Karen (Admin)
- Charlie
- Meredith
- Morgan

Admins can add/edit/remove family members from the Admin page.

## Data Included

### WDW Rides (All Parks)
~70 rides across all four Walt Disney World parks:
- Magic Kingdom
- EPCOT
- Hollywood Studios
- Animal Kingdom

Each ride includes:
- Park location
- Land/area
- Ride type (Dark Ride, Coaster, Simulator, etc.)

## Adding More Groups (Coming in v1)

Future updates will include:
- WDW Table Service Dining
- US Rollercoasters (by park)
- Custom groups

## License

MIT - Built with love for family fun! 🎢🏰✨
