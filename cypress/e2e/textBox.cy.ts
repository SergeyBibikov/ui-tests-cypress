import { TextBoxForm } from "../pageObjects/demoqa/components/textBoxForm"
import { ElementPageOptions, ElementsPage } from "../pageObjects/demoqa/elementsPage"

describe('Text box suite', { baseUrl: "https://demoqa.com" }, () => {

    beforeEach(() => {
        cy.intercept(/ad/ig, { statusCode: 503 })
        ElementsPage.open(ElementPageOptions.TEXT_BOX)
    })
    it('Successful form submission if all fields are filled', function () {

        const uName = "Mark"
        const uEmail = "Mark@gmail.com"

        new TextBoxForm()
            .fillUserName(uName)
            .fillUserEmail(uEmail)
            .fillUserCurrentAddress("SomeCity, SomeStreet, 42")
            .fillUserPermanentAddress("SomeCity, SomeStreet, 42")
            .submitForm()

        cy
            .get('#output')
            .find('div')
            .as("output")
            .should('have.length', 1)

        cy.get("@output").eq(0).find('#name').should('contain.text', uName)
        cy.get("@output").eq(0).find('#email').should('contain.text', uEmail)
    })

    it.skip('Successful form submission if only required fields are filled', function () {

    })

})