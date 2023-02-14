describe('drag and drop', () => {
    it('image', { baseUrl: "https://www.w3schools.com/html", pageLoadTimeout: 30000 }, function () {
        cy.visit('/html5_draganddrop.asp')

        cy.get("#div1 > img").drag('#div2');
    })
    it('Will always fail', () => {
        cy.wrap(false).should('be.true')
    })
})