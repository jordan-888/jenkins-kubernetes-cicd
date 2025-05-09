pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'your-dockerhub-username/financial-dashboard:${BUILD_NUMBER}'
        NAMESPACE = 'default'
        PATH = "${env.HOME}/.local/bin:${env.PATH}"
        NODE_PATH = "${env.HOME}/.local/node"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Setup Node.js') {
            steps {
                sh '''
                    # Create local directories
                    mkdir -p $HOME/.local/bin $HOME/.local/node
                    
                    # Download and install Node.js
                    cd $HOME/.local
                    curl -sL https://nodejs.org/dist/v16.20.0/node-v16.20.0-linux-x64.tar.gz | tar xz
                    mv node-v16.20.0-linux-x64/* node/
                    
                    # Create symlinks
                    ln -sf $HOME/.local/node/bin/node $HOME/.local/bin/node
                    ln -sf $HOME/.local/node/bin/npm $HOME/.local/bin/npm
                    ln -sf $HOME/.local/node/bin/npx $HOME/.local/bin/npx
                    
                    # Verify installation
                    export PATH=$HOME/.local/bin:$PATH
                    node -v
                    npm -v
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                sh '''
                    export PATH=$HOME/.local/bin:$PATH
                    npm install
                '''
            }
        }

        stage('Run Tests') {
            steps {
                sh '''
                    export PATH=$HOME/.local/bin:$PATH
                    npm test
                '''
            }
        }

        stage('Build') {
            steps {
                sh '''
                    export PATH=$HOME/.local/bin:$PATH
                    npm run build
                '''
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                    # Check if Docker is available
                    if command -v docker &> /dev/null; then
                        # Build Docker image
                        docker build -t ${DOCKER_IMAGE} .
                        
                        # Check if we can push the image
                        if docker push ${DOCKER_IMAGE}; then
                            echo "Docker image pushed successfully"
                        else
                            echo "Failed to push Docker image, but continuing..."
                        fi
                    else
                        echo "Docker not available, skipping Docker build"
                    fi
                '''
            }
        }

        stage('Setup Kubectl') {
            steps {
                sh '''
                    # Install kubectl to user directory if not available
                    if ! command -v kubectl &> /dev/null; then
                        mkdir -p $HOME/.local/bin
                        curl -LO "https://dl.k8s.io/release/stable.txt"
                        curl -LO "https://dl.k8s.io/release/$(cat stable.txt)/bin/linux/amd64/kubectl"
                        chmod +x kubectl
                        mv kubectl $HOME/.local/bin/
                        export PATH=$HOME/.local/bin:$PATH
                    fi
                    kubectl version --client || echo "kubectl not installed properly"
                '''
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh '''
                    # Make sure kubectl is in the PATH
                    export PATH=$HOME/.local/bin:$PATH
                    
                    # Check if kubectl is available
                    if command -v kubectl &> /dev/null; then
                        # Deploy to Kubernetes
                        kubectl apply -f k8s-manifests/deployment.yaml -f k8s-manifests/service.yaml -n ${NAMESPACE} || echo "Failed to apply manifests"
                        kubectl set image deployment/nodejs-app -n ${NAMESPACE} nodejs-app=${DOCKER_IMAGE} || echo "Failed to update image"
                    else
                        echo "kubectl not available, skipping deployment"
                    fi
                '''
            }
        }
    }
}