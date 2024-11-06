class ContaCriada {
    finalizarProcessoContaCriada() {
        cy.get('[data-qa="continue-button"]').click()
    }

    //Verify that 'ACCOUNT CREATED!' is visible
    verificarSeContaCriadasComSucesso() {
        cy.url().should('includes', 'account_created')
        cy.get('[data-qa="account-created"]').should('be.visible')
        //cy.screenshot()
    }
}

export default new ContaCriada()