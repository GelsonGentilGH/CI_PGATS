class Subscription {
    submeterInscricao() {
        cy.get('input#susbscribe_email')
            .scrollIntoView()
            .type('tester-qa@mail.com')
        cy.get('button#subscribe').click()
    }

    //Verify success message 'You have been successfully subscribed!' is visible
    verificarSubmerterFormularioSubscriptionComSucesso() {
        cy.contains('You have been successfully subscribed!').should('be.visible')
        //cy.screenshot()
    }
}

export default new Subscription()