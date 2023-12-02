pipeline {
    agent any

    environment {
    containerRegistryCredentials = credentials('ARTIFACTORY_PUBLISH')
    containerRegistryURL = 'jaewoo.jfrog.io'
    imageName = 'devops-test'
    ARTIFACTORY_URL = 'jaewoo.jfrog.io'
    ARTIFACTORY_REPO = 'docker'
    FRONTEND_IMAGE_NAME = 'cert-fe'
    DOCKER_COMPOSE_FILE = 'docker-compose.yml'
    version = "1.0.${env.BUILD_ID}"
    FRONTEND_VERSION = "${env.version}"
    }


    stages {
        stage('Build Docker Image') {
            steps {

                bat """
                    docker login -u ${containerRegistryCredentials_USR} -p ${containerRegistryCredentials_PSW} ${containerRegistryURL}
                    docker-compose build --build-arg FRONTEND_VERSION=${env.version}
                    docker tag ${FRONTEND_IMAGE_NAME}:${env.version} ${ARTIFACTORY_URL}/${ARTIFACTORY_REPO}/${FRONTEND_IMAGE_NAME}:${env.version}
                    docker push ${ARTIFACTORY_URL}/${ARTIFACTORY_REPO}/${FRONTEND_IMAGE_NAME}:${env.version}
                   """
            }
        }

        stage('Run Tests') {
            steps {
                echo "Running Tests..."
                bat "docker-compose -f docker-compose.test.yml down"
                def testResult = bat(script: "docker-compose -f docker-compose.test.yml run --rm", returnStatus: true)
                currentBuild.result = testResult == 0 ? 'SUCCESS' : 'FAILURE'
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