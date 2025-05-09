pipeline {
    agent {
        docker {
            image 'node:16-alpine'
            args '-v /var/run/docker.sock:/var/run/docker.sock'
        }
    }
    
    options {
        skipDefaultCheckout()
    }
    
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

        stage('Setup Docker and Kubectl') {
            steps {
                sh '''
                    apk add --no-cache docker docker-cli-buildx curl
                    curl -LO https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl
                    chmod +x ./kubectl
                    mv ./kubectl /usr/local/bin/kubectl
                '''
            }
        }

        stage('Build Docker Image') {
            steps {
                sh """
                    docker build -t ${DOCKER_IMAGE} .
                    docker push ${DOCKER_IMAGE}
                """
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh """
                    kubectl apply -f k8s-manifests/deployment.yaml -f k8s-manifests/service.yaml -n ${NAMESPACE}
                    kubectl set image deployment/nodejs-app -n ${NAMESPACE} nodejs-app=${DOCKER_IMAGE}
                """
            }
        }
    }
}