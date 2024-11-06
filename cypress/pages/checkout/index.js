class Checkout {
    preencherDescricaoComentarioParaCheckout() {
        cy.get('.form-control').type('TESTE COMENTÁRIO')
    }

    efetuarPedido() {
        cy.get('.btn-default.check_out').click()
    }

    //Verify Address Details and Review Your Order
    verificarSeEstaNaPaginaDeCheckOut() {
        cy.get('.heading').first().should('have.text', 'Address Details')
        cy.get('.heading').last().should('have.text', 'Review Your Order')
        //cy.screenshot()
    }
}

export default new Checkout()