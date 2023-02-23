
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
    sh "mv allure-results ${stashName}"
    stash name: stashName, includes: "${stashName}/*"
    sh "rm -rf ./*"
}
def firstSpec = 'hp'
def secondSpec = 'tb'
def thirdSpec = 'cb'

pipeline {

    agent none

       
    options {
        ansiColor('xterm')
    }
    
    stages {
        stage('Test'){
            parallel{
                stage('Homepage'){
                    agent { 
                        docker { 
                            image 'customcypress' 
                            args "-t"
                        }
                    }
                    steps{
                        testStage("-s cypress/e2e/homePage*", firstSpec)
                    }
                }
                stage('TextBox'){
                    agent { 
                        docker { 
                            image 'customcypress' 
                            args "-t"
                        }
                    }
                    steps{
                        testStage("-s cypress/e2e/textBox*", seconSpec)
                    }
                }
                stage('CheckBox'){
                    agent { 
                        docker { 
                            image 'customcypress' 
                            args "-t"
                        }
                    }
                    steps{
                        testStage("-s cypress/e2e/checkBox*", thirdSpec)
                    }
                }
            }
        }
        stage('Consolidate report'){
            agent any
            steps{
                unstash firstSpec
                unstash secondSpec
                unstash thirdSpec
                sh 'ls -a'
                sh  '''
                    if [ -d allure-results ] 
                    then 
                        rm -rf allure-results
                    fi
                    '''
                sh 'mkdir allure-results'
                sh "cp -r ${firstSpec}/* allure-results/*"
                sh "cp -r ${secondSpec}/* allure-results/*"
                sh "cp -r ${thirdSpec}/* allure-results/*"
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

