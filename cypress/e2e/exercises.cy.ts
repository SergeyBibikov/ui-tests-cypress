describe('drag and drop', () => {
    it('image', { baseUrl: "https://www.w3schools.com/html" }, function () {
        cy.visit('/html5_draganddrop.asp')

        cy.get("#div1 > img").drag('#div2');
    })
})