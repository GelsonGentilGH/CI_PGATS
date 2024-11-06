class Produtos {
    pesquisarProduto(produto) {
        cy.get('input#search_product').type(produto)
        cy.get('button#submit_search').click()
    }

    addProdutoCarrinho() {
        cy.contains("Add to cart").click()
    }

    verProdutosCarrinho() {
        cy.contains("View Cart").click()
    }

    detalharUmProduto() {
        cy.get('.single-products')
            .should('be.visible')
            .and('have.length.at.least', 1)
            .first()
            .parent()
            .contains('View Product')
            .click()
    }

    //Verify user is navigated to ALL PRODUCTS page successfully
    verificarSeEstaNaPaginaDeProdutos() {
        cy.url().should('contain', 'products')
        cy.get('.title').should('be.visible').and('contain', 'All Products')
        //cy.screenshot()
    }

    //Verify that detail detail is visible: product name, category, price, availability, condition, brand
    verificarSeExibeDetalhesDoProduto() {
        cy.url().should('contain', 'product_details')
        cy.get('.product-information > h2').should('be.visible')
        cy.get('.product-information p').should('be.visible').and('have.length', 4)
        cy.get('.product-information span span').should('be.visible')
        //cy.screenshot()
    }

    //Verify 'SEARCHED PRODUCTS' is visible
    //Verify all the products related to search are visible
    verificarProdutoPesquisadoComSucesso() {
        cy.get('.title').should('be.visible').and('contain', 'Searched Products')
        cy.get('.single-products')
            .should('be.visible')
            .and('have.length.at.least', 1)
        //cy.screenshot()
    }
}

export default new Produtos()