# Next.js 15 DummyJSON App

## Overview
This project is a Next.js 15 application that aggregates information from [dummyjson.com](https://dummyjson.com/docs) about users and recipes. The application includes authentication, search, pagination, and navigation.

Take the username and password from the DummyJSON API, for example: 
username: emilys, password: emilyspass

## Features
- **Authentication**: Users can log in using dummy credentials from DummyJSON.
- **Navigation Menu**:
    - Displays links to pages and the logged-in user's avatar.
    - If not authenticated, only shows a login link.
- **Search Functionality**:
    - Allows searching for users or recipes.
    - Supports searching by string values.
- **Pagination**: Lists of users and recipes are paginated.
- **User Pages**:
    - Displays a list of users with basic details.
    - Clicking on a user navigates to a detailed profile page with fields and their recipes.
- **Recipe Pages**:
    - Displays a list of recipes with titles and tags.
    - Clicking on a recipe shows detailed information and links to the creator’s profile.
    - Clicking on a tag filters recipes by that tag.

## Project Structure
```
src/
├── app/
│   ├── api/
│   │   ├── auth/login/
│   │   │   ├── actions.ts
│   ├── auth/
│   │   ├── login/
│   │   │   ├── page.tsx
│   │   │   ├── layout.tsx
│   ├── users/
│   │   ├── [id]/
│   │   │   ├── page.tsx
│   │   ├── page.tsx
│   ├── recipes/
│   │   ├── [id]/
│   │   │   ├── page.tsx
│   │   ├── tag/
│   │   │   ├── [tag]/page.tsx
│   │   ├── page.tsx
│
├── components/
│   ├── menu/Menu.tsx
│   ├── pagination/PaginationComponent.tsx
│   ├── searchBar/SearchBar.tsx
│
├── models/
│   ├── userModel/
│   ├── recipeModel/
│
├── services/
│   ├── userServices/
│   ├── recipeServices/
    ├── refreshAccessToken/

│
├── utils/constants.ts
```

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/panchakr13/owu-nextjs-exam-project.git
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Run the development server:
   ```sh
   npm run dev
   ```

## Technologies Used
- Next.js 15
- TypeScript
- Tailwind CSS
- DummyJSON API

## License
This project is open-source and available under the MIT license.

