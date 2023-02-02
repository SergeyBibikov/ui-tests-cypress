def CreateNMLink() {
    [ ! -f node_modules ] && ln -s /home/node/temp/node_modules node_modules
}
def CypressRun(options){
    npx cypress run ${options}
}

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
                            CreateNMLink()
                            CypressRun()
                        }
                     }
                    
                }
                stage('Chrome'){
                     steps {
                        catchError {
                            CreateNMLink()
                            CypressRun("--browser chrome")
                        }
                     }
                    
                }
                stage('Firefox'){
                     steps {
                        catchError {
                            CreateNMLink()
                            CypressRun("--browser firefox")
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

