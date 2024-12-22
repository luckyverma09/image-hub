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

## Deployment

This project can be easily deployed to platforms like Vercel or Netlify. Make sure to set up the environment variables in your deployment platform's settings.

### Netlify Deployment

For Netlify deployment, create a `netlify.toml` file in the root directory with the following content:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

## Contributing

Contributions to this project are welcome. Please follow these steps:

1. Fork the repository
2. Create a new branch:
   ```bash
   git checkout -b feature-branch-name
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m 'Add some feature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature-branch-name
   ```
5. Create a pull request

## License

This project is licensed under the MIT License.
