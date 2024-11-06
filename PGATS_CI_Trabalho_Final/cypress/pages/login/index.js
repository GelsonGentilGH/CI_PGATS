class Login {
    efetuarLogin(userEmail, userPassword) {
        cy.get('[data-qa="login-email"]').type(userEmail)
        cy.get('[data-qa="login-password"]').type(userPassword, { log: false })
        cy.get('[data-qa="login-button"]').click()
    }

    iniciarCadastro(userSignUpName, userEmail) {
        cy.get('[data-qa="signup-name"]').type(userSignUpName)
        cy.get('[data-qa="signup-email"]').type(userEmail)
        cy.contains('button', 'Signup').click()
    }

    //Verify 'New User Signup!' is visible
    verificarOpcaoRegistroNovoUsuarioExiste() {
        cy.get('h2').should('contain', 'New User Signup!')
        //cy.screenshot()
    }

    //Verify 'Login to your account' is visible
    verificarOpcaoLoginExisteParaUsuarioDeslogado() {
        cy.url().should('contain', 'login')
        cy.contains("Login to your account").should("be.visible")
        //cy.screenshot()
    }

    //Verify error 'Your email or password is incorrect!' is visible
    verificarMsgErroLoginIncorreto() {
        cy.get('p').should('contain', 'Your email or password is incorrect!')
        //cy.screenshot()
    }

    //Verify error 'Email Address already exist!' is visible
    verificarMsgErroCadastroJaExistente() {
        cy.get(`.signup-form form p`)
            .should('be.visible')
            .and('contain', 'Email Address already exist!')
        //cy.screenshot()
    }
}

export default new Login()