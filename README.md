# Opus Entra External Native Authentication (Angular)

An enterprise-ready **Angular** application implementing native user authentication via **Azure Entra External ID**, seamlessly deployed and hosted on **Azure Static Web Apps**.

## Overview

This repository demonstrates how to build a modern frontend authentication flow using Azure Entra External ID's native authentication capabilities. Instead of redirecting users to hosted login pages, this application handles sign-in, sign-up, and token management directly within the Angular UI, offering a smoother user experience.

## Key Features

- **Native Authentication Flow:** Custom Angular login, sign-up, and password reset flows powered by Azure Entra External ID.
- **Secure Token Handling:** Automatic acquisition, storage, and attachment of OAuth2/OIDC tokens for authenticated API requests.
- **Protected Routes:** Angular Route Guards securing private views for authenticated users only.
- **Cloud Native Deployment:** Continuous deployment pipeline configured for **Azure Static Web Apps**.

## Tech Stack

- **Frontend Framework:** Angular (TypeScript)
- **Authentication:** Microsoft Authentication Library (MSAL) / Azure Entra External ID
- **Hosting & CI/CD:** Azure Static Web Apps (SWA)

## Getting Started & Installation

### Prerequisites

- Node.js (v18+ recommended)
- Angular CLI installed globally (`npm install -g @angular/cli`)
- .NET SDK for generating the local HTTPS development certificate
- An active Azure subscription with an **Azure Entra External ID** tenant configured.

### 1. Clone the Repository

```bash
git clone https://github.com/UdhayarajanJ/opus-entra-external-native-authentication.git
cd opus-entra-external-native-authentication
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure HTTPS / SSL

Create the `ssl` directory:

```bash
mkdir -p ssl
```

Generate and trust the local HTTPS development certificate:

```bash
dotnet dev-certs https -ep ssl/localhost.crt --format PEM --no-password --trust
```

Ensure the certificate and private key are configured correctly in your Angular development server settings. Add `ssl/` to `.gitignore` to prevent committing local certificate files.

### 4. Run the Development Server

```bash
ng serve --ssl
```

Navigate to `https://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Deployment (Azure Static Web Apps)

This repository includes configuration for **Azure Static Web Apps**. To deploy your Angular application:

1. Push your code to your GitHub repository.
2. In the [Azure Portal](https://portal.azure.com/), create a new **Static Web App resource**.
3. Link your GitHub account and select this repository and branch (`main`).
4. Set the build presets:
   - **App location:** `/`
   - **Api location:** Leave blank if no backend API is used.
   - **Output location:** `dist/opus-entra-external-native-authendication` (or `dist`, depending on your Angular configuration).
5. Azure will automatically generate a GitHub Actions workflow file in `.github/workflows/`, handling future builds and deployments on every push.

## Author

Built with TypeScript and Angular for secure cloud-native authentication architectures.
