def CreateNMLink() {
    sh "[ ! -d node_modules ] && ln -s /home/node/temp/node_modules node_modules"
}
def CypressRun(options){
    sh "npx cypress run ${options}"
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
        stage("Tests setup"){
            steps{
                sh '[ -d media ] && rm -r media'    
                sh '[ -d .media ] && rm -r .media'    
                CreateNMLink()
            }
        }
        stage('Test') {
            parallel{
                stage('Electron'){
                     steps {
                        catchError {
                            CypressRun()
                        }
                     }
                    
                }
                stage('Chrome'){
                     steps {
                        catchError {
                            CypressRun("--browser chrome")
                        }
                     }
                    
                }
                stage('Firefox'){
                     steps {
                        catchError {
                            CypressRun("--browser firefox")
                        }
                    }
                    
                }
            }
           
        }
        stage('Tests cleanup'){
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

