/// <reference types= "cypress" />
import { Homepage } from "../pageObjects/homepage";




describe('Homepage spec', () => {

  context('Anti fishing banner', () => {

    const PHISHING_BANNER_KA = 'img[src*="fishing_popup_ka.png"]'
    const PHISHING_BANNER_EN = 'img[src*="fishing_popup_en.png"]'
    const PHISHING_BANNER_RU = 'img[src*="fishing_popup_ru.png"]'

    it('Anti phishing banner is shown after the language is changed', () => {
      cy.visit('');
      cy.get(PHISHING_BANNER_KA).should('be.visible')
      Homepage.changeLanguage('en');
      cy.get(PHISHING_BANNER_EN).should('be.visible')
      Homepage.changeLanguage('ru');
      cy.get(PHISHING_BANNER_RU).should('be.visible')
    })

  })

  context('Propery search', () => {
    beforeEach(() => {
      cy.visit('');
      Homepage.closePhishingBanner();
    })

    it('Deal type filters should have 5 types', function () {

    })
  })

})
