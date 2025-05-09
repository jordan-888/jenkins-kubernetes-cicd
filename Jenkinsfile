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