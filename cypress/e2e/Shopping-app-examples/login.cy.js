import loginData from '../../data-objects/loginData.json'
import { homePage } from '../../page-objects/homePage.js'
import { loginPage } from '../../page-objects/loginPage.js'


const URL = 'http://localhost:3000'

describe('Login page', () => {
	beforeEach(() => {
		//here we declared the url in a const so it is easier to modify it if for some reason it would change
			cy.visit(URL)
		});
	it('should render the login page and all of its elements', () => {
		//every selector is added to a page-object file so it is easier to modify it if for some reason it would change
		//and every input data/label info is added to a data-object file for the same reason
		cy.get(loginPage.loginTitle).should('contain', loginData.LOGIN.TITLE)
		cy.get(loginPage.gebruikersnaamLabel).should('contain', loginData.LOGIN.GEBRUIKERSLABEL),
		cy.get(loginPage.gebruikersnaamInput).should('be.visible').type(loginData.LOGIN.GEBRUIKERSINPUT)
		cy.get(loginPage.wachtwoordLabel).should('contain', loginData.LOGIN.WACHTWOORDLABEL)
		cy.get(loginPage.wachtwoordInput).should('be.visible').type(loginData.LOGIN.WACHTWOORDINPUT)
	});

	it('I should not be able to log in when I enter the wrong password', () => {
		cy.get(loginPage.loginTitle).should('contain', loginData.LOGIN.TITLE)
		cy.get(loginPage.gebruikersnaamLabel).should('contain', loginData.LOGIN.GEBRUIKERSLABEL),
		cy.get(loginPage.gebruikersnaamInput).should('be.visible').type(loginData.LOGIN.GEBRUIKERSINPUT)
		cy.get(loginPage.wachtwoordLabel).should('contain', loginData.LOGIN.WACHTWOORDLABEL)
		cy.get(loginPage.wachtwoordInput).should('be.visible').type('wrongPassword')
        cy.get(loginPage.loginButton).click()
		cy.get(homePage.navbar.homeButton).should('not.exist')
	})

	it('I should not be able to log in when I enter the wrong username', () => {
		cy.get(loginPage.loginTitle).should('contain', loginData.LOGIN.TITLE)
		cy.get(loginPage.gebruikersnaamLabel).should('contain', loginData.LOGIN.GEBRUIKERSLABEL),
		cy.get(loginPage.gebruikersnaamInput).should('be.visible').type('wrongUsername')
		cy.get(loginPage.wachtwoordLabel).should('contain', loginData.LOGIN.WACHTWOORDLABEL)
		cy.get(loginPage.wachtwoordInput).should('be.visible').type(loginData.LOGIN.WACHTWOORDINPUT)
        cy.get(loginPage.loginButton).click()
		cy.get(homePage.navbar.homeButton).should('not.exist')
	})

	it('I should be able to log in', () => {
		cy.get(loginPage.loginTitle).should('contain', loginData.LOGIN.TITLE)
		cy.get(loginPage.gebruikersnaamLabel).should('contain', loginData.LOGIN.GEBRUIKERSLABEL),
		cy.get(loginPage.gebruikersnaamInput).should('be.visible').type(loginData.LOGIN.GEBRUIKERSINPUT)
		cy.get(loginPage.wachtwoordLabel).should('contain', loginData.LOGIN.WACHTWOORDLABEL)
		cy.get(loginPage.wachtwoordInput).should('be.visible').type(loginData.LOGIN.WACHTWOORDINPUT)
        cy.get(loginPage.loginButton).click()
		cy.get(homePage.navbar.homeButton).should('contain', 'Home')
    });

	it('the toggle password button should be visible', () => {
		cy.get(loginPage.loginTitle).should('contain', loginData.LOGIN.TITLE)
		cy.get(loginPage.gebruikersnaamLabel).should('contain', loginData.LOGIN.GEBRUIKERSLABEL),
		cy.get(loginPage.gebruikersnaamInput).should('be.visible').type(loginData.LOGIN.GEBRUIKERSINPUT)
		cy.get(loginPage.wachtwoordLabel).should('contain', loginData.LOGIN.WACHTWOORDLABEL)
		cy.get(loginPage.wachtwoordInput).should('be.visible').type(loginData.LOGIN.WACHTWOORDINPUT)
		cy.get(loginPage.togglePasswordButton).should('be.visible')
		cy.get(loginPage.wachtwoordInput).should('have.attr','type','password')
		cy.get(loginPage.togglePasswordButton).click()
		cy.get(loginPage.wachtwoordInput).should('have.attr','type','text')
	})
});
