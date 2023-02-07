import { Homepage } from "../pageObjects/homepage";
import { shouldBeVisible, shouldHaveText } from "../allureSteps/assertions"
describe('Homepage spec', () => {
  beforeEach(() => {
    cy.intercept('https://www.facebook.com/**', { statusCode: 503 })
    cy.intercept('**ban**', { statusCode: 503 })

    Homepage.open();
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

      const checks = (bannerLoc, lang, expectedText: string,) => {
        shouldBeVisible(bannerLoc, `anti phishing banner in ${lang}`)
        shouldHaveText(Homepage.searchBlockHeader, expectedText, "search block header")
      }

      checks(phishingBannerGe, "Georgian", expectedTextGe)

      Homepage.changeLanguage('en');
      checks(phishingBannerEn, "English", expectedTextEn)

      Homepage.changeLanguage('ru');
      checks(phishingBannerRu, "Russian", expectedTextRu)
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

  })

})