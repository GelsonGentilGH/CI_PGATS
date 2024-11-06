class Menu {
    irParaProdutos() {
        cy.contains(`Products`).click()
    }

    irParaCadastroLogin() {
        cy.contains('Signup').click()
    }

    irParaContactUs() {
        cy.contains(`Contact us`).click()
    }

    irParaLogout() {
        cy.contains('Logout').click()
    }

    irParaDeletarConta(){
        cy.get('[href *="delete"]').click()
    }

    irParaHomePage(){
        cy.contains(`Home`).click()
    }
}

export default new Menu()