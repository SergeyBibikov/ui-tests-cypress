
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
        SaveArtifacts("${env.STAGE_NAME}")
    }

    // junit "results/*.xml"
    stash name:"allure-results", includes: "allure-results/*"
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
                        testStage("")
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
                        testStage("--browser chrome")
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
                        testStage("--browser firefox")
                    }
                }
            }
        }

        stage('Allure report'){
            agent any
            steps {
                sh "rm -rf ./*"
                sh "mkdir -p /home/petya/temp/bin && cp -r /home/petya/bin/* /home/petya/temp/bin"
                unstash 'allure-results'
                // sh "pwd && ls"
                // sh '/home/allure/bin/allure generate allure-results'
                allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]
            }
        }

    }

}

