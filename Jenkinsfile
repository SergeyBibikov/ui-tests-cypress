def CypressRun(options){
    sh "npx cypress run ${options}"
}

def SaveArtifacts(folderName){
    sh "mkdir ${folderName}"

    if (fileExists('cypress/screenshots')){
        sh "touch cypress/screenshots/dummy"
        sh "mv cypress/screenshots ${folderName}/screenshots"
        archiveArtifacts "${folderName}/screenshots/*"       
    }
    sh "mv cypress/videos ${folderName}/videos"
    archiveArtifacts "${folderName}/videos/*"         
}

def ClearWorkspace(){
    sh "rm -rf ./*"
}

def testStage(cypressOptions = "", folderName){

    sh "cp -r /home/node/temp/* ."

    catchError(stageResult: 'FAILURE') {
        CypressRun(cypressOptions)
    }

    SaveArtifacts(folderName)
    ClearWorkspace()
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
        stage('Test'){
            parallel{
                stage('Electron'){
                    agent { 
                        docker { 
                            image 'customcypress' 
                            args "-t"
                        }
                    }
                    steps{
                        testStage("", "electron")
                    }
                }
                stage('Chrome'){
                    agent { 
                        docker { 
                            image 'customcypress' 
                            args "-t"
                        }
                    }
                    steps{
                        testStage("--browser chrome", "chrome")
                    }
                }
                stage('Firefox'){
                    agent { 
                        docker { 
                            image 'customcypress' 
                            args "-t"
                        }
                    }
                    steps{
                        testStage("--browser firefox", "firefox")
                    }
                }
            }
        }
       

     
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
            
        
        // stage('Test') {
        //     // parallel{
        //         stage('Electron'){
        //             // agent { 
        //             //     docker { 
        //             //         image 'customcypress' 
        //             //         args "-t"
        //             //     }
        //             // }
        //              steps {
        //                 sh "cp -r /home/node/temp/* ."

        //                 catchError(stageResult: 'FAILURE') {
        //                     CypressRun("")
        //                 }

        //                 SaveArtifacts()
        //                 ClearWorkspace()
        //              }
                    
        //         }
        //         stage('Chrome'){
        //             // agent { 
        //             //     docker { 
        //             //         image 'customcypress' 
        //             //         args "-t"
        //             //     }
        //             // }
        //              steps {
        //                 sh "cp -r /home/node/temp/* ."

        //                 catchError(stageResult: 'FAILURE') {
        //                     CypressRun("--browser chrome")
        //                 }

        //                 SaveArtifacts()
        //                 ClearWorkspace()
        //              }
                    
        //         }
        //         stage('Firefox'){
        //             // agent { 
        //             //     docker { 
        //             //         image 'customcypress' 
        //             //         args "-t"
        //             //     }
        //             // }
        //              steps {
        //                 sh "cp -r /home/node/temp/* ."

        //                 catchError(stageResult: 'FAILURE') {
        //                     CypressRun("--browser firefox")
        //                 }

        //                 SaveArtifacts()
        //                 ClearWorkspace()
        //             }
                    
        //         }
        //     // }
           
        
        // // stage('Clear Workspace'){
        // //     agent { 
        // //         docker { 
        // //             image 'customcypress' 
        // //             args "-t"
        // //         }
        // //     }
        // //     steps{

        // //         sh "rm -rf ./*"
        // //         // catchError(buildResult:'SUCCESS', stageResult: 'SUCCESS'){
        // //         //     MoveMediaAfterTests()
        // //         // }
                
        // //     }
        // // }
        // }
    }

    // post{
    //     always{
    //         ClearWorkspace()
    //     }
    // }
}

