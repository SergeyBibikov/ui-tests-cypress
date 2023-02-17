import { ElementPageOptions, ElementsPage } from "../pageObjects/demoqa/elementsPage"

describe('Check box', () => {

    beforeEach(() => {
        cy.intercept(/ad/ig, { statusCode: 503 })
        ElementsPage.open(ElementPageOptions.CHECK_BOX)
    })

    it('All inner folders should be checked on Home check', function () {

    })
})