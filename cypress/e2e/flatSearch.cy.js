describe('Homepage spec', () => {
  beforeEach(() => {
    cy.visit('');
  })

  it('Anti fishing warning is shown on the homepage', () => {
    cy.get('img[src*="fishing_popup_ka.png"]').should('be.visible')
  })


  context('Tests without the antifishing banner', () => {
    beforeEach(() => {
      cy.get('#Modal1').invoke('remove')
    })

    it('No anti fishing warning is shown with session', function () {
    })
  })

})
