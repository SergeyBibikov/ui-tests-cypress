
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


def testStage(cypressOptions = "", folderName){

    sh "cp -r /home/node/temp/* ."

    catchError(stageResult: 'FAILURE') {
        sh "npx cypress run ${cypressOptions}"
    }

    SaveArtifacts(folderName)
    sh "rm -rf ./*"
}

def electronTests = "Electron"
def chromeTests = "Ehrome"
def firefoxTests = "Firefox"

pipeline {

    agent none

       
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
                        testStage("", "${env.STAGE_NAME}")
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
                        testStage("--browser chrome", "${env.STAGE_NAME}")
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
                        testStage("--browser firefox", "${env.STAGE_NAME}")
                    }
                }
            }
        }

    }

}

