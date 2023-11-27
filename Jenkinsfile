pipeline {
    agent {
        label 'linux'

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

        tools {
            nodejs ''//specify version here
        }
    }

    // environment{
    //     containerRegistryCredentials = credential('ARTIFACTORY_PUBLISH')
    //     containerRegistryURL = 'jack.hc-sc.gc.ca'
    //     imageName = 'devops-practice-cert-tracker-fe'
    // }

    stages {
        stage('Environment Setup') {
            steps {

                cleanWs()

                checkout scm

                // script {
                //         version = "1.0.${env.BUILD_ID}"
                //         artifactoryServer = Artifactory.server 'default'
                //         artifactoryDocker = artifactoryDocker = server: artifactoryServer
                //         buildInfo = artifactory.newBuildInfo()
                // }
            }
        }

        stage('Build Docker Image') {
            steps {

                sh """
                    docker login -u ${containerRegistryCredentials_USR} -p ${containerRegistryCredentials_PSW} ${containerRegistryURL}
                    docker-compose build --build-arg FRONTEND_VERSION=${env.version}
                    docker tag ${FRONTEND_IMAGE_NAME}:${env.version} ${ARTIFACTORY_URL}/${ARTIFACTORY_REPO}/${FRONTEND_IMAGE_NAME}:${env.version}
                    docker push ${ARTIFACTORY_URL}/${ARTIFACTORY_REPO}/${FRONTEND_IMAGE_NAME}:${env.version}
                   """
            }
        }

               stage("Deploy to Dev") {
           steps {
               script {
                   def currentBranch = env.BRANCH_NAME
                   echo "Current Branch: ${currentBranch}"


                       sh "docker-compose -f ${DOCKER_COMPOSE_FILE} down"
                       sh "docker-compose -f ${DOCKER_COMPOSE_FILE} up -d"
               }
           }
       }

    }
}