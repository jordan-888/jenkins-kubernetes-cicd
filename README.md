# Jenkins Kubernetes CI/CD Pipeline Demo

This project demonstrates a CI/CD pipeline using Jenkins and Kubernetes for a Node.js application.

## Prerequisites

- Node.js 16+
- Docker
- Kubernetes cluster
- Jenkins with Kubernetes plugin
- kubectl configured to access your cluster

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run tests:
   ```bash
   npm test
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

## Docker Build

Build the image locally:
```bash
docker build -t nodejs-app .
```

## Kubernetes Deployment

Deploy to Kubernetes:
```bash
kubectl apply -f k8s-manifests/
```

## CI/CD Pipeline

The Jenkins pipeline includes the following stages:
- Checkout code
- Install dependencies
- Run tests
- Build Docker image
- Deploy to Kubernetes

### Jenkins Setup Requirements

1. Configure Jenkins with Kubernetes plugin
2. Add Docker registry credentials
3. Configure Kubernetes credentials
4. Create a new pipeline job using the Jenkinsfile

## API Endpoints

- GET `/`: Welcome message
- GET `/health`: Health check endpoint