/// <reference types= "cypress" />
import { Homepage } from "../pageObjects/homepage";




describe('Homepage spec', () => {
  beforeEach(() => {
    cy.intercept('https://www.facebook.com/**', { statusCode: 503 })
    cy.intercept('**ban**', { statusCode: 503 })

    cy.visit('');
  })

  context('Language and anti-phishing banner', () => {

    const phishingBannerGe = 'img[src*="fishing_popup_ka.png"]'
    const phishingBannerEn = 'img[src*="fishing_popup_en.png"]'
    const phishingBannerRu = 'img[src*="fishing_popup_ru.png"]'

    const expectedTextGe = 'მარტივი გზა შენს ახალ სახლამდე'
    const expectedTextEn = 'The easiest way to your new home'
    const expectedTextRu = 'простой путь к твоему новому дому'

    it(`Anti-phishing banner should show on each language change and 
        page text should have selected language`, () => {

      cy.get(phishingBannerGe).should('be.visible')
      cy.get(Homepage.searchBlockHeader).should('have.text', expectedTextGe)

      Homepage.changeLanguage('en');
      cy.get(phishingBannerEn).should('be.visible')
      cy.get(Homepage.searchBlockHeader).should('have.text', expectedTextEn)

      Homepage.changeLanguage('ru');
      cy.get(phishingBannerRu).should('be.visible')
      cy.get(Homepage.searchBlockHeader).should('have.text', expectedTextRu)
    })

  })

  context('Propery search', () => {
    beforeEach(() => {
      Homepage.closePhishingBanner();
    })

    it('Deal type filters should have 5 types', function () {

    })
  })

})