export class Homepage {

    /**
     * @param {en|ru|ka} lang 
     */
    static changeLanguage(lang) {
        return cy.get(`a[class*="dropdown-item"][data-code="${lang}"]`).click({ force: true })
    }
}
