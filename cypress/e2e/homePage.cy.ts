import { Homepage } from "../pageObjects/homepage";
import { skipOn, isOn, onlyOn } from "@cypress/skip-test";


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

    const SEARCH_FILTERS = "#adtypepos > div"

    it('Deal type filters should have 5 types', function () {

      const DEAL_TYPES = 'div > a'

      const expectedTypes = [
        'იყიდება',
        'გირავდება',
        'ქირავდება',
        'ქირავდება დღიურად',
        'გაიცემა იჯარით'
      ]
      const actualTypes = []

      cy.get(SEARCH_FILTERS)
        .find(DEAL_TYPES)
        .should('have.length', 5)
        .each((el) => {
          actualTypes.push(el.text())
        })

      cy
        .wrap(actualTypes)
        .should('deep.equal', expectedTypes)
    })

    it('Estate type filters should have 5 types', function () {

      const ESTATE_TYPES = 'ul>li span'

      const expectedTypes = [
        'ბინები',
        'სახლები და აგარაკები',
        'კომერციული ფართები',
        'მიწის ნაკვეთები',
        'სასტუმროები'
      ]

      const actualTypes = []
      cy
        .get(SEARCH_FILTERS)
        .find(ESTATE_TYPES)
        .should('have.length', 5)
        .each((el) => {
          actualTypes.push(el.text())
        })

      cy
        .wrap(actualTypes)
        .should('deep.equal', expectedTypes)

    })

    it('debug', function () {
      onlyOn('firefox')
      cy.wrap([1, 2, 3]).then((ar) => {
        return ar.length > 2
      }).then((a) => {
        cy.task('log', [a])
      })

    })
  })

})