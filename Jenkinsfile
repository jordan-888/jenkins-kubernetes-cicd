pipeline {
    agent {
        kubernetes {
            yaml '''
                apiVersion: v1
                kind: Pod
                metadata:
                  labels:
                    jenkins: agent
                spec:
                  serviceAccountName: jenkins
                  containers:
                  - name: node
                    image: node:16-alpine
                    command:
                    - cat
                    tty: true
                  - name: docker
                    image: docker:latest
                    command:
                    - cat
                    tty: true
                    volumeMounts:
                    - mountPath: /var/run/docker.sock
                      name: docker-sock
                  - name: kubectl
                    image: bitnami/kubectl:latest
                    command:
                    - cat
                    tty: true
                  volumes:
                  - name: docker-sock
                    hostPath:
                      path: /var/run/docker.sock
            '''
            defaultContainer 'node'
        }
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

        stage('Build Docker Image') {
            steps {
                container('docker') {
                    sh """
                        docker build -t ${DOCKER_IMAGE} .
                        docker push ${DOCKER_IMAGE}
                    """
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                container('kubectl') {
                    sh """
                        kubectl apply -f k8s-manifests/deployment.yaml -f k8s-manifests/service.yaml
                        kubectl set image deployment/nodejs-app -n ${NAMESPACE} nodejs-app=${DOCKER_IMAGE}
                    """
                }
            }
        }
    }
}