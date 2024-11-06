/// <reference types="cypress" />

import cadastro from '../pages/cadastro'
import login from '../pages/login'
import menu from '../pages/menu'
import contactUs from '../pages/contactUs'
import produtos from '../pages/produtos'
import subscription from '../pages/subscription'
import carrinho from '../pages/carrinho'
import checkout from '../pages/checkout'
import pagamento from '../pages/pagamento'
import deletarConta from '../pages/deletarConta'
import contaCriada from '../pages/contaCriada'
import homePage from '../pages/homePage'

//OBS:
//-UTILIZADO PAGE OBJECT
//-ASSERTS EFETUADOS DIRETAMENTE NA CLASSE DE TESTES / EXPLICITOS
//-ASSERTS EFETUADOS DE ACORDO COM A DESCRIÇÃO SOLICITADA NO CASO DE TESTE DO SITE
//-CADA VERIFY FOI TRANSFORMADO EM UM ASSERT DE FORMA QUE A VERIFICAÇÃO SEJA EFETUADA NA EXECUÇÃO DE CADA TESTE ISOLADO
//-PARA CADA ASSERT PODE SER HABILITADO UM SCREENSHOT DE EVIDÊNCIA DO TESTE, MAS POR FALTA DE ESPAÇO EM DISCO FORAM DEIXADOS COMENTADOS
//-INTEGRAÇÃO COM BROWSERSTACK EFETUADA, EVIDENCIA NA IMAGEM BrowserStack_Execucao.jpg ANEXA AO ARQUIVO ENVIADO .ZIP
//-USUARIO:gentilf_woLYOa
//-ACCESKEY:TgQkpsZSmp8wwaknzgD4

describe('TRABALHO FINAL - DISCIPLINA DE CI E TESTES AUTOMATIZADOS: PIPE COM EXEC MANUAL', () => {
  //EXECUTA UMA UNICA VEZ ANTES DE TODOS OS TESTES.
  //Cria usuário padrão para ser utilizado nos testes.
  before(() => {
    cy.visit('/');
    timestampPadrao = new Date().getTime();
    userEmailPadrao = `testerPadrao-${timestampPadrao}@mail.com`
    menu.irParaCadastroLogin();
    login.iniciarCadastro(userSignUpNamePadrao, userEmailPadrao);
    cadastro.efetuarCadastro(userPasswordPadrao);
    contaCriada.finalizarProcessoContaCriada();
    menu.irParaLogout();
  });

  //EXECUTA ANTES DE INICIAR CADA UM DOS TESTES.
  //Entra no site e inicializa e-mail unico para cada teste que necessita delete da conta.
  beforeEach(() => {
    cy.visit('/');
    timestamp = new Date().getTime();
    userEmail = `tester-${timestamp}@mail.com`;
  });

  // Variaveis utilizadas nos testes que necessitam delete da conta
  const userSignUpName = 'Tester QA'
  let timestamp
  let userEmail
  const userPassword = '12345'

  // Variaveis da conta padrão utilizadas nos testes onde não ocorre o delete da conta.
  const userSignUpNamePadrao = 'Tester QA Padrao'
  let timestampPadrao
  let userEmailPadrao
  const userPasswordPadrao = '123456'

  //TESTES
  it('Test Case 1: Register User.', () => {
    //Arrange
    homePage.verificarSeEstaNaHomePage()
    menu.irParaCadastroLogin()
    login.verificarOpcaoRegistroNovoUsuarioExiste()
    login.iniciarCadastro(userSignUpName, userEmail)
    cadastro.verificarSeEstaNaPaginaDeCadastro()
    //Act
    cadastro.efetuarCadastro(userPassword)
    //Assert
    contaCriada.verificarSeContaCriadasComSucesso()

    contaCriada.finalizarProcessoContaCriada()
    homePage.verificarSeUsuarioEstaLogado(userSignUpName)
    menu.irParaDeletarConta()
    deletarConta.verificarSeContaDeletadaComSucesso()
    deletarConta.finalizarProcessoDeletarConta()
  });

  it('Test Case 2: Login User with correct email and password.', () => {
    //Arrange
    menu.irParaCadastroLogin()
    login.iniciarCadastro(userSignUpName, userEmail)
    cadastro.efetuarCadastro(userPassword)
    contaCriada.finalizarProcessoContaCriada()
    menu.irParaLogout()
    menu.irParaHomePage()
    homePage.verificarSeEstaNaHomePage()
    //Act
    menu.irParaCadastroLogin()
    login.verificarOpcaoLoginExisteParaUsuarioDeslogado()
    login.efetuarLogin(userEmail, userPassword)
    //Assert
    homePage.verificarSeUsuarioEstaLogado(userSignUpName)

    menu.irParaDeletarConta()
    deletarConta.verificarSeContaDeletadaComSucesso()
    deletarConta.finalizarProcessoDeletarConta()
  });

  it('Test Case 3: Login User with incorrect email and password.', () => {
    //Arrange
    homePage.verificarSeEstaNaHomePage()
    //Act
    menu.irParaCadastroLogin()
    login.verificarOpcaoLoginExisteParaUsuarioDeslogado()
    login.efetuarLogin('tester-emailErrado0@mail.com', '54321')
    //Assert
    login.verificarMsgErroLoginIncorreto()
  });

  it('Test Case 4: Logout User.', () => {
    //Arrange
    homePage.verificarSeEstaNaHomePage()
    menu.irParaCadastroLogin()
    login.verificarOpcaoLoginExisteParaUsuarioDeslogado()
    login.efetuarLogin(userEmailPadrao, userPasswordPadrao)
    homePage.verificarSeUsuarioEstaLogado(userSignUpNamePadrao)
    //Act
    menu.irParaLogout()
    //Assert
    login.verificarOpcaoLoginExisteParaUsuarioDeslogado()
  });

  it('Test Case 5: Register User with existing email.', () => {
    //Arrange
    homePage.verificarSeEstaNaHomePage()
    menu.irParaCadastroLogin()
    login.verificarOpcaoRegistroNovoUsuarioExiste()
    //Act
    login.iniciarCadastro(userSignUpNamePadrao, userEmailPadrao)
    //Assert
    login.verificarMsgErroCadastroJaExistente()
  });

  it('Test Case 6: Contact Us Form.', () => {
    //Arrange
    homePage.verificarSeEstaNaHomePage()
    //Act
    menu.irParaContactUs()
    contactUs.verificarSeEstaNaPaginaContactUs()
    contactUs.submeterFormularioContactUs()
    //Assert
    contactUs.verificarSubmeterFormularioContatUsComSucesso()

    menu.irParaHomePage()
    homePage.verificarSeEstaNaHomePage()
  });

  it('Test Case 8: Verify All Products and product detail page.', () => {
    //Arrange
    homePage.verificarSeEstaNaHomePage()
    //Act
    menu.irParaProdutos()
    produtos.verificarSeEstaNaPaginaDeProdutos()
    produtos.detalharUmProduto()
    //Assert
    produtos.verificarSeExibeDetalhesDoProduto()
  });

  it('Test Case 9: Search Product.', () => {
    //Arrange
    homePage.verificarSeEstaNaHomePage()
    //Act
    menu.irParaProdutos()
    produtos.verificarSeEstaNaPaginaDeProdutos()
    produtos.pesquisarProduto('Shirt')
    //Assert
    produtos.verificarProdutoPesquisadoComSucesso()
  });

  it('Test Case 10: Verify Subscription in home page.', () => {
    //Arrange
    homePage.verificarSeEstaNaHomePage()
    //Act
    homePage.irParaOfimDaHomePage()
    homePage.verificarExistenciaDeSubscription()
    subscription.submeterInscricao()
    //Assert
    subscription.verificarSubmerterFormularioSubscriptionComSucesso()
  });

  it('Test Case 15: Place Order: Register before Checkout.', () => {
    //Arrange
    homePage.verificarSeEstaNaHomePage()
    menu.irParaCadastroLogin()
    login.iniciarCadastro(userSignUpName, userEmail)
    cadastro.efetuarCadastro(userPassword)
    contaCriada.verificarSeContaCriadasComSucesso()
    contaCriada.finalizarProcessoContaCriada()
    homePage.verificarSeUsuarioEstaLogado(userSignUpName)
    homePage.addProdutoCarrinho()
    homePage.verProdutosCarrinho()
    carrinho.verificarSeEstaNaPaginaCarrinho()
    //Act
    carrinho.irParaCheckout()
    checkout.verificarSeEstaNaPaginaDeCheckOut()
    checkout.preencherDescricaoComentarioParaCheckout()
    checkout.efetuarPedido()
    pagamento.efetuarPagamento()
    //Assert
    pagamento.verificarPedidoFeitoEpagoComSucesso()
    
    menu.irParaDeletarConta()
    deletarConta.verificarSeContaDeletadaComSucesso()
    deletarConta.finalizarProcessoDeletarConta()
  });
});