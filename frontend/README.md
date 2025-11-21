# Alumni Networking & Mentorship System - Frontend

This is the frontend application for the Alumni Networking & Mentorship System, built with React.

## 📋 Table of Contents
- [Features](#features)
- [UI Components](#ui-components)
- [Pages](#pages)
- [Styling](#styling)
- [Installation](#installation)
- [Development](#development)

##  features

### User Interface
- Responsive design that works on desktop, tablet, and mobile devices
- Modern, clean UI with intuitive navigation
- Consistent styling and user experience across all pages
- Interactive components with hover effects and animations
- Loading states and error handling

### Functionality
- User authentication (login/register)
- Profile management
- Alumni directory with search and filtering
- Mentorship request system
- Internship listing and application
- Feedback and rating system
- Activity timeline and notifications

## 🧩 UI Components

### Core Components
- **Navbar**: Navigation header with links to all main sections
- **Footer**: Site footer with copyright information
- **UserProfile**: Detailed user profile display
- **AlumniCard**: Individual alumni profile card
- **JobCard**: Internship opportunity card
- **SearchBar**: Search input with submit button
- **Modal**: Popup dialog for forms and confirmations
- **Pagination**: Page navigation controls
- **Notifications**: Notification dropdown with badge

### Dashboard Components
- **Statistics**: Key metrics display with visual indicators
- **Timeline**: Activity history visualization
- **Connections**: User connections display
- **UpcomingEvents**: Calendar events display
- **MentorshipDashboard**: Mentorship metrics overview
- **InternshipDashboard**: Internship metrics overview
- **FeedbackDashboard**: Feedback and ratings overview

##  pages

### Public Pages
- **Home**: Landing page with system overview and registration options
- **Login**: User authentication page
- **Register**: New user registration page

### Protected Pages
- **Dashboard**: Main overview with key metrics and quick actions
- **AlumniList**: Directory of all alumni with search and filtering
- **MentorshipRequests**: Mentorship request management
- **InternshipList**: Internship opportunities listing
- **Feedback**: Feedback and rating system
- **Profile**: User profile and account management

## 🎨 Styling

### CSS Architecture
- **Global Styles**: `src/index.css` - Base styles and utilities
- **Component Styles**: `src/App.css` - Component-specific styles
- **Responsive Design**: Mobile-first approach with media queries
- **Consistent Design System**: Unified color palette, typography, and spacing

### Design Principles
- **Accessibility**: Proper contrast ratios and semantic HTML
- **Performance**: Optimized CSS with minimal reflows
- **Maintainability**: Modular CSS classes with clear naming conventions
- **User Experience**: Intuitive interactions and clear visual hierarchy

## 🚀 Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

##  development

### Starting the Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

### Building for Production
```bash
npm run build
```

### Previewing the Production Build
```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/               # Page components
├── services/            # API service modules
├── assets/              # Images and static assets
├── App.css              # Main application styles
├── index.css            # Global styles and utilities
├── App.jsx              # Main application component
└── main.jsx             # Application entry point
```

##  components

### Component List
- `Navbar.jsx` - Navigation header
- `Footer.jsx` - Site footer
- `UserProfile.jsx` - User profile display
- `AlumniCard.jsx` - Alumni profile card
- `JobCard.jsx` - Internship card
- `SearchBar.jsx` - Search input component
- `Modal.jsx` - Popup dialog
- `Pagination.jsx` - Page navigation
- `Notifications.jsx` - Notification dropdown
- `Statistics.jsx` - Metrics display
- `Timeline.jsx` - Activity timeline
- `Connections.jsx` - User connections
- `UpcomingEvents.jsx` - Event listing
- `MentorshipDashboard.jsx` - Mentorship metrics
- `InternshipDashboard.jsx` - Internship metrics
- `FeedbackDashboard.jsx` - Feedback metrics

##  pages

### Page List
- `Home.jsx` - Landing page
- `Login.jsx` - Authentication page
- `Register.jsx` - Registration page
- `Dashboard.jsx` - Main overview
- `AlumniList.jsx` - Alumni directory
- `MentorshipRequests.jsx` - Mentorship management
- `InternshipList.jsx` - Internship listing
- `Feedback.jsx` - Feedback system
- `Profile.jsx` - User profile

##  utilities

### CSS Utilities
- Margin classes: `mt-1`, `mt-2`, `mt-3`, `mt-4`, `mb-1`, `mb-2`, `mb-3`, `mb-4`
- Text alignment: `text-center`, `text-left`, `text-right`
- Flex utilities: `flex-center`, `flex-between`
- Button variants: `btn`, `btn-secondary`, `btn-success`, `btn-danger`, `btn-block`
- Status badges: `status-badge` with contextual variants

##  responsive-design

### Breakpoints
- Mobile: Up to 768px
- Tablet: 769px to 1024px
- Desktop: 1025px and above

### Responsive Features
- Flexible grid layouts using CSS Grid
- Adaptive component sizing
- Mobile-friendly navigation
- Touch-friendly interactive elements