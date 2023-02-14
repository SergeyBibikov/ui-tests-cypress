def CypressRun(options){
    sh "npx cypress run ${options}"
}
def SaveArtifacts(){
    sh "touch cypress/screenshots/dummy"
                
    archiveArtifacts "cypress/screenshots/*"        
    archiveArtifacts "cypress/videos/*"
}

def ClearWorkspace(){
    sh "rm -rf ./*"
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
       
    options {
        ansiColor('xterm')
    }
    
    stages {
        // stage("Tests setup"){
        //     agent { 
        //         docker { 
        //             image 'customcypress' 
        //             args "-t"
        //         }
        //     }
        //     steps{
        //         catchError(buildResult:'SUCCESS', stageResult: 'SUCCESS') {
        //             ClearMedia()
        //         }
        //     }
            
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
                        sh "cp -r /home/node/temp/* ."

                        catchError(stageResult: 'FAILURE') {
                            CypressRun("")
                        }

                        SaveArtifacts()
                        ClearWorkspace()
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
                        sh "cp -r /home/node/temp/* ."

                        catchError(stageResult: 'FAILURE') {
                            CypressRun("--browser chrome")
                        }

                        SaveArtifacts()
                        ClearWorkspace()
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
                        sh "cp -r /home/node/temp/* ."

                        catchError(stageResult: 'FAILURE') {
                            CypressRun("--browser firefox")
                        }

                        SaveArtifacts()
                        ClearWorkspace()
                    }
                    
                }
            }
           
        
        // stage('Clear Workspace'){
        //     agent { 
        //         docker { 
        //             image 'customcypress' 
        //             args "-t"
        //         }
        //     }
        //     steps{

        //         sh "rm -rf ./*"
        //         // catchError(buildResult:'SUCCESS', stageResult: 'SUCCESS'){
        //         //     MoveMediaAfterTests()
        //         // }
                
        //     }
        // }
    }
}

