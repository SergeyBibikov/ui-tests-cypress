export class Homepage {

    /**
     * @param {en|ru|ka} lang 
     */
    static changeLanguage(lang) {
        return cy.get(`a[class*="dropdown-item"][data-code="${lang}"]`).click({ force: true })
    }

    static closePhishingBanner() {
        return cy.get('#Modal1').invoke('remove')
    }
}
