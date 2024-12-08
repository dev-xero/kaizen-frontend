# Kaizen 改 善 

![](https://img.shields.io/github/license/dev-xero/kaizen-frontend?style=for-the-badge&colorA=131820&colorB=FFFFFF&logo=markdown)
![](https://img.shields.io/npm/v/@nestjs/core.svg?style=for-the-badge&colorA=131820&colorB=FFFFFF&logo=markdown)
![](https://img.shields.io/github/deployments/dev-xero/kaizen-frontend/production?style=for-the-badge&logo=vercel&label=DEPLOYMENT&labelColor=%23131820&color=%2364fab6)


Kaizen 改 善 — Meaning continuous improvement, is a minimal Japanese-inspired task management web app for humans. Developed (in 2 weeks) as a NitHub final project submission.

## Features

1. User Management and Access Control
    - Role-based access to ensure data segregation and visibility.
    - Unique identifiers for each user with secure authentication and session management.
    - Admin privileges for managing projects and teams.

2. Kanban Boards
    - Project-specific boards with lanes: "To Do," "In Progress," "Testing", and "Done."
    - Drag-and-drop task cards with properties like title, description, assignee, priority, and deadline.
    - Real-time updates for all users on shared projects.

3. Task Management
    - Task CRUD operations: Create, Read, Update, Delete.
    - Automatic status updates based on lane position in the Kanban board.

4. Responsive Frontend
    - Fully responsive UI for desktops, tablets, and mobile devices.
    - Interactive features like drag-and-drop and real-time updates.
    - Built with NextJS & TailwindCSS for a modern refreshing feel.
    - Accessibility-focused and user-friendly navigation.

## Libraries Used

1. NextJS (Typescript): React Framework with SSR support and optimizations.
2. TailwindCSS: CSS in code via utility classes.
3. Shadcn UI (Radix UI): Minimally designed component library.
4. Axios: Robust http fetch API wrapper.
5. Lottie React: For animated components.
6. Phosphor Icons: UI icon library.
7. Hello Pangea: Fork of `react-beautiful-dnd` for drag and drop functionalities.
