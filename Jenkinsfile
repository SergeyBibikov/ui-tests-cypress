pipeline {
    
    agent { 
        docker { 
            image 'temp' //custom image with cypress installed 
            args "-t"
        }
    }
    
    options {
        ansiColor('xterm')
    }
    
    stages {
        stage("Clear media"){
            steps{
                catchError(buildResult: 'SUCCESS', stageResult: 'SUCCESS'){
                    sh 'rm -r media'    
                }
            }
        }
        stage('Test') {
            steps {
                catchError {
                    sh 'ln -s /home/node/temp/node_modules node_modules'
                    sh 'npx cypress run --browser chrome'
                }
            }
        }
        stage('Cleanup'){
            steps{
                sh 'mkdir .media && cp -r ./cypress/screenshots/ .media/ && cp -r ./cypress/videos/ .media/'
                sh 'rm -r ./*'
                sh 'mv .media media'
            }
        }
    }
}
