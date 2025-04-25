# Lemonade Stand

A full-stack web application for managing lemonade stands and their products. This project allows users to create and manage their own lemonade stands, add products, and view other stands on an interactive map.

![Lemonade Stand Banner](/lemonade-stand/public/banner.png)

## Table of Contents

- [Features](#features)
- [Live Demo](#live-demo)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Setup](#environment-setup)
- [Supabase Setup](#supabase-setup)
  - [Database Schema](#database-schema)
  - [Row Level Security](#row-level-security)
- [Usage](#usage)
  - [User Guide](#user-guide)
  - [Admin Guide](#admin-guide)
- [Deployment](#deployment)
  - [GitHub Pages](#github-pages)
  - [Custom Domain](#custom-domain)
- [CI/CD Pipeline](#cicd-pipeline)
- [Performance Optimizations](#performance-optimizations)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication**
  - Secure signup, login, and password reset
  - Social login options (Google, GitHub)
  - Protected routes for authenticated users

- **Lemonade Stand Management**
  - Create and manage multiple lemonade stands
  - Upload stand images
  - Set stand location with interactive map
  - Automatic stand expiration after 24 hours (with extension option)

- **Product Management**
  - Add, update, and remove products for each stand
  - Set product prices, descriptions, and availability
  - Upload product images

- **Interactive Map**
  - View all active stands on a map
  - Filter stands by proximity
  - Get directions to stands

- **Real-time Updates**
  - Live updates when data changes
  - Notifications for stand owners

- **Responsive Design**
  - Works on desktop, tablet, and mobile devices
  - Optimized user experience across all screen sizes

## Live Demo

Visit the live application: [Lemonade Stand App](https://beaux-riel.github.io/Lemonade-stand/)

![Lemonade Stand App Screenshot](/lemonade-stand/public/app_screenshot.png)

## Technology Stack

### Frontend
- **React 19** - UI library
- **React Router 7** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Leaflet/React-Leaflet** - Interactive maps
- **Vite** - Build tool and development server

### Backend
- **Supabase** - Backend-as-a-Service platform
  - PostgreSQL database
  - Authentication
  - Storage
  - Real-time subscriptions
  - Edge Functions

## Architecture

The application follows a modern architecture pattern with a clear separation of concerns:

![Architecture Diagram](/lemonade-stand/public/architecture.png)

### Frontend Architecture

The React application is structured as follows:

```
/lemonade-stand
├── public/            # Static assets
├── src/
│   ├── api/           # API functions for Supabase
│   ├── components/    # Reusable UI components
│   ├── contexts/      # React context providers
│   ├── hooks/         # Custom React hooks
│   ├── pages/         # Page components
│   ├── services/      # Service modules
│   ├── styles/        # Global styles
│   ├── utils/         # Utility functions
│   ├── App.js         # Main application component
│   ├── index.js       # Application entry point
│   └── supabaseClient.js # Supabase client configuration
```

### Backend Architecture

The Supabase backend includes:

```
/supabase
├── migrations/        # Database migration scripts
│   ├── 01_create_users_table.sql
│   ├── 02_create_stands_table.sql
│   ├── 03_create_products_table.sql
│   ├── 04_storage_policies.sql
│   └── 05_stand_expiration.sql
├── functions/         # Edge Functions
│   └── cleanup-expired-stands/
├── seed.sql           # Sample data for development
└── config.toml        # Supabase configuration
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v8 or higher)
- Git
- Supabase account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/beaux-riel/Lemonade-stand.git
   cd Lemonade-stand
   ```

2. Install frontend dependencies:
   ```bash
   cd lemonade-stand
   npm install
   ```

### Environment Setup

1. Create a `.env` file in the `lemonade-stand` directory:
   ```bash
   cp .env.example .env
   ```

2. Update the `.env` file with your Supabase credentials:
   ```
   REACT_APP_SUPABASE_URL=https://your-project-id.supabase.co
   REACT_APP_SUPABASE_ANON_KEY=your-anon-key
   ```

## Supabase Setup

### Creating a Supabase Project

1. Go to [Supabase](https://supabase.com/) and sign up or log in
2. Create a new project
3. Give your project a name (e.g., "Lemonade Stand")
4. Set a secure database password
5. Choose a region close to your users
6. Click "Create new project"

### Database Schema

The database consists of three main tables:

1. **Users** - Stores user information
   - Linked to Supabase Auth users
   - Stores profile information

2. **Stands** - Stores lemonade stand information
   - Name, description, location
   - Owner reference
   - Expiration time

3. **Products** - Stores product information for each stand
   - Name, description, price
   - Availability status
   - Stand reference

### Row Level Security

All tables have Row Level Security policies configured to ensure data security:

- **Users Table**
  - Users can only read and update their own profiles

- **Stands Table**
  - Everyone can read active stands
  - Stand owners can read, insert, update, and delete their own stands

- **Products Table**
  - Everyone can read available products from active stands
  - Stand owners can read, insert, update, and delete products for their stands

### Setting Up the Database

#### Option 1: Using the SQL Editor

1. Go to the SQL Editor in the Supabase Dashboard
2. Copy and paste the contents of each migration file in order:
   - `01_create_users_table.sql`
   - `02_create_stands_table.sql`
   - `03_create_products_table.sql`
   - `04_storage_policies.sql`
   - `05_stand_expiration.sql`
3. Run the SQL commands

#### Option 2: Using the Supabase CLI

If you have the Supabase CLI installed:

```bash
supabase link --project-ref YOUR_PROJECT_REF
supabase db push
```

## Usage

### User Guide

#### Creating an Account

1. Visit the application and click "Sign Up"
2. Enter your email and password
3. Verify your email address

#### Creating a Lemonade Stand

1. Log in to your account
2. Navigate to the Seller Dashboard
3. Click "Create New Stand"
4. Fill in the stand details:
   - Name
   - Description
   - Location (using the map or address search)
   - Upload an image (optional)
5. Click "Create Stand"

#### Adding Products

1. Navigate to your stand's detail page
2. Click "Add Product"
3. Fill in the product details:
   - Name
   - Description
   - Price
   - Upload an image (optional)
4. Click "Add Product"

#### Managing Stand Expiration

Stands automatically expire after 24 hours to ensure the map only shows currently active stands.

1. Navigate to your stand's detail page
2. View the expiration countdown
3. Click "Extend" to add 24 hours to your stand's visibility

### Admin Guide

For administrative tasks, use the Supabase Dashboard:

1. Log in to your Supabase account
2. Select your project
3. Use the following sections:
   - **Authentication** - Manage users
   - **Table Editor** - View and edit database records
   - **Storage** - Manage uploaded files
   - **Edge Functions** - Monitor and deploy serverless functions

## Deployment

### GitHub Pages

The application is configured for deployment to GitHub Pages:

1. Update the `homepage` field in `package.json` with your GitHub Pages URL
2. Deploy using the provided script:
   ```bash
   npm run deploy
   ```

This will:
- Build the application
- Push the built files to the `gh-pages` branch
- Make the application available at your GitHub Pages URL

### Custom Domain

To use a custom domain with GitHub Pages:

1. Update the CNAME file in the `public` directory with your domain name
2. Configure your domain's DNS settings as described in [GITHUB_PAGES_SETUP.md](GITHUB_PAGES_SETUP.md)
3. Update the `homepage` field in `package.json` with your custom domain

## CI/CD Pipeline

The project includes a CI/CD pipeline using GitHub Actions:

### Pull Request Workflow

- Runs on every pull request to the `main` branch
- Runs tests and verifies the build
- Provides feedback on the pull request

### Deployment Workflow

- Runs on pushes to the `main` branch
- Builds and deploys the application to GitHub Pages

For detailed information, see [CI_CD_SETUP.md](CI_CD_SETUP.md).

## Performance Optimizations

The application includes several performance optimizations:

- **Code Splitting** - Lazy loading of components and routes
- **Bundle Optimization** - Vendor chunk splitting
- **Image Optimization** - Responsive images and lazy loading
- **Caching** - Effective use of browser caching
- **Compression** - Gzip and Brotli compression

For detailed information, see [PERFORMANCE_OPTIMIZATIONS.md](lemonade-stand/PERFORMANCE_OPTIMIZATIONS.md).

## Testing

The project includes a comprehensive testing suite:

- **Unit Tests** - Testing individual components and functions
- **Integration Tests** - Testing component interactions
- **End-to-End Tests** - Testing complete user flows

Run tests with:

```bash
cd lemonade-stand
npm test
```

For detailed information, see [TESTING.md](lemonade-stand/TESTING.md).

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.