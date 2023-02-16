describe('drag and drop', () => {
    it.skip('image', { baseUrl: "https://www.w3schools.com/html", pageLoadTimeout: 3000 }, function () {
        cy.visit('/html5_draganddrop.asp')

        cy.get("#div1 > img").drag('#div2');
    })
    it('Will always fail', () => {
        cy.visit('https://www.wikipedia.org/');
        cy.wrap(false).should('be.true');
    })
})