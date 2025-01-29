# MERN-Based Web Gallery Application

This is a simple web gallery application built using the **MERN** stack (MongoDB, Express.js, React, Node.js). Users can upload their images, which are stored securely on **Cloudinary**. Images are associated with the logged-in user and can only be accessed by that user. The application uses **JWT authentication** to manage user sessions and **Tailwind CSS** for styling.

Additionally, users can share their images with other users, making it possible to showcase images publicly or with selected users.

## Features

- **User Authentication**: Users can register, log in, and access their profile.
- **Image Upload**: Users can upload images which are stored on **Cloudinary**.
- **User-Specific Image Gallery**: Users can only see and manage their own images.
- **Image Sharing**: Users can share their images with others. Shared images are accessible by both the image owner and the users with whom it has been shared.
- **Image Deletion**: Users can delete images they have uploaded.
- **Responsive UI**: Built with **React** and styled using **Tailwind CSS**.

## Tech Stack

- **Frontend**:
  - React.js
  - Tailwind CSS
  - Axios (for API requests)
- **Backend**:
  - Node.js
  - Express.js
  - MongoDB
  - JWT Authentication
- **Cloud Storage**:
  - Cloudinary (for storing and managing images)

## Installation

### 1. Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/luckyverma09/image-hub.git
```
