import { homePage } from '../../page-objects/homePage'

const URL = 'http://localhost:3000'

describe('Home Page', () => {

    	beforeEach(() => {
			cy.visit(URL)
            //this command has been added in the support/commands.js file
            cy.login()
		});
    it('should render the home page', () => {
        cy.get(homePage.navbar.header).should('be.visible')
        cy.get(homePage.navbar.homeButton).should('be.visible').contains('Home')
        cy.get(homePage.navbar.contactButton).should('be.visible').contains('Contact')
        cy.get(homePage.navbar.cartButton).should('be.visible').contains('Cart')
        cy.get(homePage.navbar.logoutButton).should('be.visible').contains('Logout')
        cy.get(homePage.homeTitle).should('be.visible').and('contain', 'Welcome to home')
        cy.get(homePage.product).should('be.visible').and('contain', 'Hoodie')
    })

    it('every product should contain certain elements', () => {
        cy.get(homePage.item.title).should('be.visible').and('contain', 'Hoodie')
        cy.get(homePage.item.description).should('be.visible').and('contain','Stay warm and stylish with our cozy hoodie.')
        cy.get(homePage.item.price).should('be.visible').and('contain','$29.99')
        cy.get(homePage.item.stock).should('be.visible').and('contain','10 left in stock')
        cy.get(homePage.item.addButton).should('be.visible').and('contain','Add to Cart')
    })

    it('when I add an item to cart the icon is shown',() => {
        cy.get(homePage.navbar.cartCount).should('not.exist')
        cy.get(homePage.item.addButton).click()
        cy.get(homePage.navbar.cartCount).should('be.visible').contains('1')
        cy.get(homePage.item.addButton).click()
        cy.get(homePage.navbar.cartCount).should('be.visible').contains('2')
    })

    it('I can intercept the call and return testdata',() => {

        //The intercept function catches the request as it is sent out and mocks the response
        //In this case the get call to the http://localhost:3000/data/articles.json url is caught
        //And then the fixture defined in the fixtures folder as articles.json is returned
        //The as() function adds an alias to the fixture which we can then wait for to be sure that the request has been sent

        cy.intercept('GET','http://localhost:3000/data/articles.json',{
            fixture: '../fixtures/articles.json',
        }).as("articles")

        cy.get(homePage.navbar.contactButton).click()
        cy.get(homePage.navbar.homeButton).click()
        cy.wait('@articles')
        cy.get(homePage.item.title).should('be.visible').and('contain', 'Intercepted response')
        cy.get(homePage.item.description).should('be.visible').and('contain','You can use this functionality to mock your own testdata')
        cy.get(homePage.item.price).should('be.visible').and('contain','$29.99')
        cy.get(homePage.item.stock).should('be.visible').and('contain','10 left in stock')
        cy.get(homePage.item.addButton).should('be.visible').and('contain','Add to Cart')
    })
})