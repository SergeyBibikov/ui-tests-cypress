def CreateNMLink() {
    if (!fileExists('node_modules')) {
        sh 'ln -s /home/node/temp/node_modules node_modules'
    }
}
def CypressRun(options){
    sh "npx cypress run ${options}"
}

def ClearMedia(){
    if (fileExists('media')) {
        sh 'rm -r media'
    }
    if (fileExists('.media')) {
        sh 'rm -r .media'
    }
}

def MoveMediaAfterTests(){
    sh 'mkdir .media'
    sh 'cp -r ./cypress/videos/ .media/'
    if (fileExists('./cypress/screenshots')){
        sh 'cp -r ./cypress/screenshots/ .media/'   
    }
    sh 'rm -r ./*'
    sh 'mv .media media'    
}

pipeline {

    agent none
    
    // agent { 
    //     docker { 
    //         image 'customcypress' 
    //         args "-t"
    //     }
    // }
    
    options {
        ansiColor('xterm')
    }
    
    stages {
        stage("Tests setup"){
            agent { 
                docker { 
                    image 'customcypress' 
                    args "-t"
                }
            }
            steps{
                catchError(buildResult:'SUCCESS', stageResult: 'SUCCESS') {
                    ClearMedia()
                }
            }
            
        }
        stage('Test') {
            parallel{
                stage('Electron'){
                    agent { 
                        docker { 
                            image 'customcypress' 
                            args "-t"
                        }
                    }
                     steps {
                        catchError(stageResult: 'FAILURE') {
                            CreateNMLink()
                            CypressRun("")
                        }
                     }
                    
                }
                stage('Chrome'){
                    agent { 
                        docker { 
                            image 'customcypress' 
                            args "-t"
                        }
                    }
                     steps {
                        catchError(stageResult: 'FAILURE') {
                            CreateNMLink()
                            CypressRun("--browser chrome")
                        }
                     }
                    
                }
                stage('Firefox'){
                    agent { 
                        docker { 
                            image 'customcypress' 
                            args "-t"
                        }
                    }
                     steps {
                        catchError(stageResult: 'FAILURE') {
                            CreateNMLink()
                            CypressRun("--browser firefox")
                        }
                    }
                    
                }
            }
           
        }
        stage('Tests cleanup'){
            agent { 
                docker { 
                    image 'customcypress' 
                    args "-t"
                }
            }
            steps{
                catchError(buildResult:'SUCCESS', stageResult: 'SUCCESS'){
                    MoveMediaAfterTests()
                }
                
            }
        }
    }
}

