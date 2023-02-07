type Language = 'en' | 'ru' | 'ka'

function wrapWithAllureStep(stepName: string, commandsToWrap: () => void) {
    cy.allure().startStep(stepName)
    commandsToWrap()
    cy.allure().endStep()
}

export class Homepage {

    static searchBlockHeader = "#search_form .searchblock-text"

    static open() {
        wrapWithAllureStep("Open homepage", () => cy.visit(''))
    }

    static changeLanguage(newLang: Language) {
        wrapWithAllureStep(`Change page language to ${newLang}`, () => {
            cy
                .get(`a[class*="dropdown-item"][data-code="${newLang}"]`)
                .click({ force: true })
        })
    }

    static closePhishingBanner() {
        wrapWithAllureStep("Close anti phishing banner", () => cy.get('#Modal1').invoke('remove'))
    }

}
