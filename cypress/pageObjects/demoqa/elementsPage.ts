export enum ElementPageOptions {
    TEXT_BOX = "text-box"
}

export class ElementsPage {
    static open(element: ElementPageOptions) {
        cy.visit(`/${element}`)
    }
}