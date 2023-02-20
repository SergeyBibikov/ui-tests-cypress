import { TextBoxForm } from "../pageObjects/demoqa/components/textBoxForm"
import { ElementPageOptions, ElementsPage } from "../pageObjects/demoqa/elementsPage"

describe('Text box suite', { baseUrl: "https://demoqa.com" }, () => {

    beforeEach(() => {
        cy.fixture('textBox.json').as('testData')
        cy.intercept(/ad/ig, { statusCode: 503 })
        ElementsPage.open(ElementPageOptions.TEXT_BOX)
    })

    it('Successful form submission if all fields are filled', function () {

        const { userName, email, currentAddress, permanentAddress } = this.testData

        new TextBoxForm()
            .fillUserName(userName)
            .fillUserEmail(email)
            .fillUserCurrentAddress(currentAddress)
            .fillUserPermanentAddress(permanentAddress)
            .submitForm()

        cy
            .get('#output')
            .find('div')
            .as("output")
            .should('have.length', 1)

        cy.get("@output").eq(0).find('#name').should('contain.text', userName)
        cy.get("@output").eq(0).find('#email').should('contain.text', email)
        cy.get("@output").eq(0).find('#currentAddress').should('contain.text', currentAddress)
        cy.get("@output").eq(0).find('#permanentAddress').should('contain.text', permanentAddress)
    })

    it('Successful form submission if only required fields are filled', function () {
        const { userName, email } = this.testData

        new TextBoxForm()
            .fillUserName(userName)
            .fillUserEmail(email)
            .submitForm()

        cy
            .get('#output')
            .find('div')
            .as("output")
            .should('have.length', 1)

        cy.get("@output").eq(0).find('#name').should('contain.text', userName)
        cy.get("@output").eq(0).find('#email').should('contain.text', email)
    })

})