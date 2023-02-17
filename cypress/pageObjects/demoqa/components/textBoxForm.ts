
const USER_NAME = '#userName'
const USER_EMAIL = '#userEmail'
const CURRENT_ADDRESS = '#currentAddress'
const PERMANENT_ADDRESS = '#permanentAddress'
const SUBMIT_BTN = '#submit'

function fill(el: string, val: string) {
    cy.get(el).type(val)
}

export class TextBoxForm {

    fillUserName(username: string) {
        fill(USER_NAME, username)
        return this
    }
    fillUserEmail(email: string) {
        fill(USER_EMAIL, email)
        return this
    }
    fillUserCurrentAddress(currentAddress: string) {
        fill(CURRENT_ADDRESS, currentAddress)
        return this
    }
    fillUserPermanentAddress(permanentAddress: string) {
        fill(PERMANENT_ADDRESS, permanentAddress)
        return this
    }
    submitForm() {
        cy.get(SUBMIT_BTN).click()
    }
}