pipeline {
    
    agent { 
        docker { 
            image 'customcypress' 
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
                    sh 'rm -r media; rm -r .media'    
                }
            }
        }
        stage('Test') {
            parallel{
                stage('Electron'){
                     steps {
                        catchError {
                            sh 'ln -s /home/node/temp/node_modules node_modules'
                            sh 'npx cypress run'
                        }
                     }
                    
                }
                stage('Chrome'){
                     steps {
                        catchError {
                            sh 'ln -s /home/node/temp/node_modules node_modules'
                            sh 'npx cypress run --browser chrome'
                        }
                     }
                    
                }
                stage('Firefox'){
                     steps {
                        catchError {
                            sh 'ln -s /home/node/temp/node_modules node_modules'
                            sh 'npx cypress run --browser firefox'
                        }
                    }
                    
                }
            }
           
        }
        stage('Cleanup'){
            steps{
                catchError{
                    sh 'mkdir .media'
                    sh 'cp -r ./cypress/videos/ .media/'
                    sh '[ -d "./cypress/screenshots" ] && cp -r ./cypress/screenshots/ .media/'   
                }
                sh 'rm -r ./*'
                catchError{
                    sh 'mv .media media'    
                }
                
            }
        }
    }
}

