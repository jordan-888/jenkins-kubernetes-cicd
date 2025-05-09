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
                    # Use NVM to install Node.js
                    export NVM_DIR="$HOME/.nvm"
                    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
                    [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
                    
                    # Install NVM if not already installed
                    if ! command -v nvm &> /dev/null; then
                        curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
                        export NVM_DIR="$HOME/.nvm"
                        [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
                    fi
                    
                    # Install Node.js
                    nvm install 16 || true
                    nvm use 16 || true
                    
                    # Verify installation
                    node -v || echo "Node.js not installed properly"
                    npm -v || echo "npm not installed properly"
                    
                    # If NVM fails, try to use system Node.js
                    if ! command -v node &> /dev/null; then
                        echo "Using system Node.js if available"
                        export PATH="$PATH:/usr/local/bin:/usr/bin"
                    fi
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
                    # Use existing Docker installation
                    docker --version || echo "Docker not available, please install Docker"
                    # Build and push Docker image
                    docker build -t ${DOCKER_IMAGE} .
                    docker push ${DOCKER_IMAGE}
                """
            }
        }

        stage('Setup Kubectl') {
            steps {
                sh '''
                    # Install kubectl to user directory if not available
                    if ! command -v kubectl &> /dev/null; then
                        mkdir -p $HOME/bin
                        curl -LO "https://dl.k8s.io/release/stable.txt"
                        curl -LO "https://dl.k8s.io/release/$(cat stable.txt)/bin/linux/amd64/kubectl"
                        chmod +x kubectl
                        mv kubectl $HOME/bin/
                        export PATH=$HOME/bin:$PATH
                    fi
                    kubectl version --client || echo "kubectl not installed properly"
                '''
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh """
                    # Make sure kubectl is in the PATH
                    export PATH=$HOME/bin:$PATH
                    
                    # Deploy to Kubernetes
                    kubectl apply -f k8s-manifests/deployment.yaml -f k8s-manifests/service.yaml -n ${NAMESPACE}
                    kubectl set image deployment/nodejs-app -n ${NAMESPACE} nodejs-app=${DOCKER_IMAGE}
                """
            }
        }
    }
}