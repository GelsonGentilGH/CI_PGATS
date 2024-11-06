class HomePage {
    addProdutoCarrinho() {
        cy.contains("Add to cart").click()
    }

    verProdutosCarrinho() {
        cy.contains("View Cart").click()
    }

    irParaOfimDaHomePage() {
        cy.scrollTo("bottom")
        cy.get("footer").should("be.visible")
    }

    //Verify that home page is visible successfully
    verificarSeEstaNaHomePage() {
        cy.contains("a", "Home").should("have.attr", "style", "color: orange;")
        cy.get('h2').should('contain', 'Features Items')
        //cy.screenshot()
    }

    //Verify that 'Logged in as username' is visible
    verificarSeUsuarioEstaLogado(user) {
        cy.get('i.fa-user').parent().should('contain', user)
        //cy.screenshot()
    }

    //Verify text 'SUBSCRIPTION'
    verificarExistenciaDeSubscription() {
        cy.contains("#footer", "Subscription").should("be.visible")
        //cy.screenshot()
    }
}

export default new HomePage()