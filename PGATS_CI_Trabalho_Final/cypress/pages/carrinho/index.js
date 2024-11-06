class Carrinho {
    irParaCheckout() {
        cy.get('.btn-default.check_out').click()
    }

    // Verify that cart page is displayed
    verificarSeEstaNaPaginaCarrinho() {
        cy.url().should('contain', 'view_cart')
        //cy.screenshot()
    }
}

export default new Carrinho()