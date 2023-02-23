
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


def testStage(cypressOptions = "", stashName){

    sh "cp -r /home/node/temp/* ."

    catchError(stageResult: 'FAILURE') {
        sh "npx cypress run ${cypressOptions}"
        SaveArtifacts("${env.STAGE_NAME}")
    }

    // junit "results/*.xml"
    stash name: stashName, includes: "allure-results/*"
    sh "rm -rf ./*"
}

pipeline {

    agent none

       
    options {
        ansiColor('xterm')
    }
    
    stages {
        stage('Test'){
            parallel{
                stage('Homepage spec'){
                    agent { 
                        docker { 
                            image 'customcypress' 
                            args "-t"
                        }
                    }
                    steps{
                        testStage("-s cypress/e2e/homePage*", "hp")
                    }
                }
                stage('TextBox spec'){
                    agent { 
                        docker { 
                            image 'customcypress' 
                            args "-t"
                        }
                    }
                    steps{
                        testStage("-s cypress/e2e/textBox*", "tb")
                    }
                }
                stage('CheckBox spec'){
                    agent { 
                        docker { 
                            image 'customcypress' 
                            args "-t"
                        }
                    }
                    steps{
                        testStage("-s cypress/e2e/checkBox*", "cb")
                    }
                }
            }
        }
        stage('Consolidate report'){
            agent any
            steps{
                unstash "hp"
                unstash "tb"
                unstash "cb"
                sh 'ls -a'
                sh  '''
                    if [ -d allure-results ] 
                    then 
                        rm -rf allure-results
                    fi
                    '''
                sh 'mkdir allure-results'
                sh 'cp -r hp/* allure-results/*'
                sh 'cp -r tb/* allure-results/*'
                sh 'cp -r cb/* allure-results/*'
                stash name: 'allure-results', includes: "allure-results/*"
            }
        }
        stage('Allure report'){
            agent {
                docker('alluregenerator')
            }
            steps {
                sh "rm -rf ./*"
                unstash 'allure-results'
                allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]
            }
        }

    }

}

