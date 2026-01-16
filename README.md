# STORYKU - Story Management Platform

## Introduction

**Storyku** is a full-stack web application designed for managing and publishing written stories. It was developed as a technical test for the BIG.IO recruitment process, demonstrating end-to-end implementation from backend services to a user-friendly frontend experience.

The platform enables users to create, manage, and organize stories with multiple chapters, categorize content, add tags/keywords, and control publication status. Built with modern web technologies, it showcases responsive design, intuitive UI/UX, and robust backend architecture.

---

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Libraries & Technologies](#libraries--technologies)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Website URL](#website-url)

---

## Features

### Story Management
- **Story List** - View all stories with search and filter functionality
- **Add Story** - Create new stories with title, author, synopsis, category, tags, and cover image
- **Story Detail** - View complete story information including all chapters
- **Edit Story** - Update story information and metadata
- **Delete Story** - Remove stories from the system

### Chapter Management
- **Add Chapter** - Create new chapters with rich text editor
- **Edit Chapter** - Modify existing chapter content
- **Delete Chapter** - Remove chapters from stories
- **Chapter Ordering** - Automatic chapter sequencing

### Advanced Features
- **Tags with Autocomplete** - Smart tag suggestions with 30+ common story tags
- **Search & Filter** - Filter stories by category, status, author, or title
- **Responsive Design** - Mobile-friendly interface with hamburger menu
- **Rich Text Editor** - Powered by React Quill for chapter content
- **Image Upload** - Cover image upload for stories
- **Draft/Publish Status** - Control story visibility

---

## Libraries & Technologies

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **TailwindCSS** - Utility-first CSS framework
- **React Quill** - Rich text editor for chapter content
- **Axios** - HTTP client for API requests
- **React Hooks** - Custom hooks for state management

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **PostgreSQL** - Relational database
- **Sequelize** - ORM for database operations
- **Multer** - File upload handling
- **Express Validator** - Request validation middleware

---

## Project Structure

```
bigio-fullstackdev-frontend/
├── src/
│   ├── app/                      # Next.js App Router pages
│   │   ├── (dashboard)/
│   │   │   └── stories/          # Story management pages
│   │   │       ├── page.tsx      # Story list
│   │   │       ├── add/          # Add story flow
│   │   │       └── [id]/         # Story detail & edit
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── layout/               # Layout components
│   │   │   ├── PageHeader.tsx
│   │   │   └── Sidebar.tsx
│   │   ├── story/                # Story-specific components
│   │   │   ├── ChapterTable.tsx
│   │   │   ├── StoryTable.tsx
│   │   │   └── TagsInput.tsx
│   │   └── ui/                   # Reusable UI components
│   │       ├── ConfirmationModal.tsx
│   │       ├── Dropdown.tsx
│   │       ├── DropdownMenu.tsx
│   │       ├── FilterModal.tsx
│   │       ├── FormField.tsx
│   │       ├── ImagePicker.tsx
│   │       ├── MainButton.tsx
│   │       ├── QuillEditor.tsx
│   │       └── SecondaryButton.tsx
│   ├── hooks/                    # Custom React hooks
│   ├── services/                 # API service layer
│   ├── types/                    # TypeScript type definitions
│   └── utils/                    # Utility functions
│
bigio-fullstackdev-backend/
├── src/
│   ├── config/                   # Configuration files
│   │   ├── database.js
│   │   └── multer.js
│   ├── controllers/              # Request handlers
│   │   ├── chapterController.js
│   │   └── storyController.js
│   ├── middleware/               # Express middleware
│   ├── models/                   # Sequelize models
│   │   ├── Story.js
│   │   ├── Chapter.js
│   │   └── index.js
│   ├── routes/                   # API routes
│   ├── validators/               # Request validation
│   └── app.js
├── migrations/                   # Database migrations
├── uploads/                      # File uploads storage
└── server.js
```

---

## Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd bigio-fullstackdev-backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables (`.env`):
```env
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=storyku_db
DB_USER=your_username
DB_PASSWORD=your_password
```

4. Run database migrations:
```bash
npx sequelize-cli db:migrate
```

5. Start the server:
```bash
npm start
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd bigio-fullstackdev-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables (`.env`):
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

5. Build for production:
```bash
npm run build
npm start
```

---

## Website URL

**Live Deployment:** [storyku.rizqiaditya.com](https://storyku.rizqiaditya.com)

---

## Developer

**Rizqi Aditya**
- GitHub: [@rizqiaditya222](https://github.com/rizqiaditya222)
- Project Repository: [STORYKU-BIGIO-Technical-Test](https://github.com/rizqiaditya222/STORYKU-BIGIO-Technical-Test)

