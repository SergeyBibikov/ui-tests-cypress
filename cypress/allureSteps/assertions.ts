export function shouldBeVisible(selector: string, elementAlias?: string) {
    cy.allure().startStep(`Check that ${elementAlias ? elementAlias : selector} is visible`)
    cy.get(selector).should('be.visible')
    cy.allure().endStep()
}

export function shouldHaveText(selector: string, expectedText: string, elementAlias?: string) {
    cy.allure().startStep(`Check that ${elementAlias ? elementAlias : selector} has text ${expectedText}`)
    cy.get(selector).should('have.text', expectedText)
    cy.allure().endStep()
}
