type Language = 'en' | 'ru' | 'ka'

export class Homepage {

    static searchBlockHeader = "#search_form .searchblock-text"

    static changeLanguage(newLang: Language) {
        return cy.get(`a[class*="dropdown-item"][data-code="${newLang}"]`).click({ force: true })
    }

    static closePhishingBanner() {
        return cy.get('#Modal1').invoke('remove')
    }

}
