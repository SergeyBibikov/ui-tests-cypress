import { CheckBoxesForm } from "../pageObjects/demoqa/components/checkBoxesForm"
import { ElementPageOptions, ElementsPage } from "../pageObjects/demoqa/elementsPage"

describe('Check box', () => {

    beforeEach(() => {
        cy.intercept(/ad/ig, { statusCode: 503 })
        ElementsPage.open(ElementPageOptions.CHECK_BOX)
    })

    it('All inner folders should be checked on Home check', function () {
        new CheckBoxesForm().toggleFolder('Home').checkFolder('Desktop');
    })

    it.skip('The unfolded folded icon shoud change icon fill color', function () {

    })
})