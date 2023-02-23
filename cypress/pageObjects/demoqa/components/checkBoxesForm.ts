export class CheckBoxesForm {

    toggleFolder(folderName: string) {
        cy.get(`label:contains(${folderName})`).prev('button').click()
        return this
    }

    checkFolder(folderName: string) {
        cy.contains("span.rct-title", folderName).prevAll().eq(0).click()
        return this
    }

}