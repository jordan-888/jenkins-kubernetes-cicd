pipeline {
    agent any
    
    environment {
        DOCKER_REGISTRY = 'localhost:5001'
        APP_NAME = 'nodejs-app'
        DOCKER_IMAGE = "${DOCKER_REGISTRY}/${APP_NAME}:${BUILD_NUMBER}"
        NAMESPACE = 'financial-dashboard'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Setup Environment') {
            steps {
                sh '''
                    # Install Node.js and npm
                    curl -sL https://deb.nodesource.com/setup_16.x | bash -
                    apt-get update && apt-get install -y nodejs
                    # Verify installation
                    node --version
                    npm --version
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh """
                    # Ensure Docker is available
                    docker --version || (apt-get update && apt-get install -y docker.io)
                    # Build and push Docker image
                    docker build -t ${DOCKER_IMAGE} .
                    docker push ${DOCKER_IMAGE}
                """
            }
        }

        stage('Setup Kubectl') {
            steps {
                sh '''
                    # Install kubectl
                    curl -LO "https://dl.k8s.io/release/stable.txt"
                    curl -LO "https://dl.k8s.io/release/$(cat stable.txt)/bin/linux/amd64/kubectl"
                    chmod +x kubectl
                    mv kubectl /usr/local/bin/
                    kubectl version --client
                '''
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh """
                    # Deploy to Kubernetes
                    kubectl apply -f k8s-manifests/deployment.yaml -f k8s-manifests/service.yaml -n ${NAMESPACE}
                    kubectl set image deployment/nodejs-app -n ${NAMESPACE} nodejs-app=${DOCKER_IMAGE}
                """
            }
        }
    }
}