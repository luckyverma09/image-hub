# Image Gallery with Cloudinary and Next.js

## Description

This project is a web application that allows users to upload, view, share, and delete images. It is built using Next.js and integrates with Cloudinary for image storage and management. The application features user authentication powered by Clerk.

## Features

- **User authentication**
- **Image upload to Cloudinary**
- **Image gallery display**
- **Image sharing (copy link)**
- **Image deletion**
- **Responsive design**

## Technologies Used

- Next.js
- React
- Cloudinary
- Clerk (for authentication)
- Tailwind CSS

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14 or later)
- npm or yarn
- Cloudinary account
- Clerk account

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/luckyverma09/image-hub.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd image-hub
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Set up environment variables:**
   Create a `.env.local` file in the root directory and add the following environment variables:

   ```env
   CLOUDINARY_CLOUD_NAME=
   CLOUDINARY_API_KEY=
   CLOUDINARY_API_SECRET=
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
   CLERK_SECRET_KEY=
   ```

## Usage

To run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
