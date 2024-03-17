# Starter Project for Node.js API and React Client

This project provides the starter code for building a Node.js API backend and a client-only React app using Vite. It is organized into three folders: `src/client`, `src/server`, and `src/shared`. This structure is ideal for medium-sized applications that require simplicity in deployment as a single app using Docker.

## Features

- **Node.js API Backend**: Provides the foundation for building a robust API backend using Node.js.
- **React Client**: Starter code for a client-only React application.
- **Vite**: Leverages Vite for a faster and leaner development experience.
- **Docker Deployment**: Simplifies deployment using Docker, allowing the entire application to be run as a single app.

## Development Environment

The project relies on `.devcontainers` to set up the development environment and related extensions. This ensures a consistent and reliable development environment across different setups.

## Configurations and Support

The project comes with an opinionated prettier, editorconfig and ESLint configuration to enforce consistent coding styles and practices. It also includes support for Tailwind CSS, a utility-first CSS framework for rapidly building custom user interfaces.

## Getting Started

### Prerequisites

1. Install WSL2 and Docker daemon running inside WSL2. You can find the installation guide here.
2. Install VS Code with WSL Extension and DevContainers Extension.

### Setting Up the Development Environment

1. Clone this repository inside WSL2.
2. Open the repository by using the command `code .` inside the folder.
3. Once opened, press `ctrl+shift+p` and type `reopen in dev container` to open the project.

### Running the Application Locally

1. Use the command `npm run dev`. This will run the application in watch mode and you will be able to access the client app as well as the server app without CORS issues.
2. Use the command `npm run build` to build the app. It will create a `dist` folder with `client` and `server` folders.
3. Use the command `npm run start` to serve the `dist` folder bundle.

### Deploying the Application Using Docker

1. To build the Docker image, use the command `docker build .`.

## TODO Items

1. Add support for Unit test
2. Add logging