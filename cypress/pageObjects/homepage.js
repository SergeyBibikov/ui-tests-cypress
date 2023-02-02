export class Homepage {

    static searchBlockHeader = "#search_form .searchblock-text"

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
