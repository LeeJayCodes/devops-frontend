pipeline {

    agent {
        label 'devops-dev'
    }
    
    environment {
        containerRegistryCredentials = credentials('ARTIFACTORY_PUBLISH')
        containerRegistryURL = 'jack.hc-sc.gc.ca'
        ARTIFACTORY_REPO = 'devops'
        FRONTEND_IMAGE_NAME = 'devops-training-cert-tracker-fe'
        DOCKER_COMPOSE_FILE = 'docker-compose.yml'
        version = "1.0.${env.BUILD_ID}"
        FRONTEND_APP_VERSION = "${env.version}"
    }


    stages {
        stage('Environment Setup') {
            steps {
                cleanWs()
                checkout scm
                script {
                    artifactoryServer = Artifactory.server 'default'
                    artifactoryDocker = Artifactory.docker server: artifactoryServer
                    buildInfo = Artifactory.newBuildInfo()
                }
            }
        }
        stage('Build Docker Image') {
            steps {

                bat """
                    docker login -u ${containerRegistryCredentials_USR} -p ${containerRegistryCredentials_PSW} ${containerRegistryURL}
                    docker-compose build --build-arg FRONTEND_APP_VERSION=${env.version}
                    docker tag ${FRONTEND_IMAGE_NAME} ${containerRegistryURL}/${ARTIFACTORY_REPO}/${FRONTEND_IMAGE_NAME}:${env.version}
                    docker push ${containerRegistryURL}/${ARTIFACTORY_REPO}/${FRONTEND_IMAGE_NAME}:${env.version}
                   """
            }
        }

        stage("Deploy to Dev") {
            steps {
                script {
                   def currentBranch = env.BRANCH_NAME
                   echo "Current Branch: ${currentBranch}"
                       bat "docker-compose -f ${DOCKER_COMPOSE_FILE} down"
                       bat "docker-compose -f ${DOCKER_COMPOSE_FILE} up -d"
                }
            }
        }
    }
}