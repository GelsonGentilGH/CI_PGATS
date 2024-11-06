class DeletarConta {
    finalizarProcessoDeletarConta() {
        cy.get('[data-qa="continue-button"]').click()
    }

    //Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button
    verificarSeContaDeletadaComSucesso() {
        cy.get('b').should('contain', 'Account Deleted!')
        //cy.screenshot()
    }
}

export default new DeletarConta()