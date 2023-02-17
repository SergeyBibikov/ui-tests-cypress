export enum ElementPageOptions {
    TEXT_BOX = "text-box",
    CHECK_BOX = "checkbox"
}

export class ElementsPage {
    static open(element: ElementPageOptions) {
        cy.visit(`/${element}`)
    }
}