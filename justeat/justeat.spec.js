// zipcode.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test



const url = "https://www.just-eat.co.uk/";
const popularLocations = [
    { zipCode: 'B3 1EU', city: 'Birmingham' },
    { zipCode: 'CF10 1QR', city: 'Cardiff' },
    { zipCode: 'G1 2FF', city: 'Glasgow' },
    { zipCode: 'LS1 3DA', city: 'Leeds' },
    { zipCode: 'M2 4WU', city: 'Manchester' },
]
const famousRestaurants = [" McDonald's ", " Greggs ", " Costa Coffee ",
    " KFC ", " Starbucks ", " Subway ",
    " Burger King ", " Pret A Manger ",
    " LEON ", " Papa John's ", " Pizza Hut ",
    " German Doner Kebab ",
    " View all brands "
]
const typeText = (getElement, text) => {
    cy.get(getElement)
        .type(text)
}
describe('Testing: just-eat.co.uk/', () => {
    before(() => {
        cy.visit(url)
    })

    it('accept cookies', () => {
        cy.get('.Button_o-btn--primary_NRuBe')
            .click();
    })
    describe('check if given zipcode suggests valid location name', () => {
        popularLocations.map(item => {
            it('should pass with location: ' + item.city, () => {
                typeText('.Form_c-search-placeholder_2F0h-', item.zipCode)

                it('should check suggestion is valid', () => {
                    cy.get('[data-test-id="full-address-suggestions"]')

                    .should('contain', item.city)
                })
            })
        })
    })
    describe('check \'Famous restaurants\' section', () => {
        it('should check the length of section and text of items', () => {
            cy.get('#footer-famous-restaurants-heading > .c-ficon')
                .click()
            cy.get('#footer-famous-restaurants a')
                .should('have.length', 13)
            cy.get('#footer-famous-restaurants a')
                .each((item, index, list) => {
                    expect(Cypress.$(item).text()).to.eq(famousRestaurants[index])
                })
        })
    })
    describe('check if brand\'s URL is valid', () => {
        it('should pass if URL has restaurant\'s name', () => {
            cy.get('#footer-famous-restaurants a')
                .each((item, index, list) => {
                    cy.wrap(item).invoke('attr', 'href')
                        .then(href => {
                            cy.visit(url + href)
                                .url()
                                .should('contain', href)
                        })
                })
        })
    })
})