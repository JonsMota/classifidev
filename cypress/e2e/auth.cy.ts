describe('Fluxo de Autenticação', () => {
  const user = {
    firstName: 'Teste',
    lastName: 'Cypress',
    user: `testecypress${Date.now()}`,
    email: `teste${Date.now()}@cypress.com`,
    password: 'senha123'
  }

  it('Deve registrar e logar o usuário', () => {
    // 1. Registro
    cy.visit('/register')

    cy.get('input[placeholder="Primeiro Nome"]').type(user.firstName)
    cy.get('input[placeholder="Sobrenome"]').type(user.lastName)
    cy.get('input[placeholder="Nome de Usuário"]').type(user.user)
    cy.get('input[placeholder="Email"]').type(user.email)
    cy.get('input[placeholder="Senha"]').type(user.password)

    cy.contains('button', 'Cadastrar').click()

    // Verifica redirecionamento para login
    cy.url().should('include', '/login')

    // 2. Login
    cy.get('input[placeholder="Email ou Nome de Usuário"]').type(user.email)
    cy.get('input[placeholder="Senha"]').type(user.password)

    cy.contains('button', 'Entrar').click()

    // 3. Verificação final
    cy.url().should('eq', 'http://localhost:3000/')
    cy.getCookie('auth_token').should('exist')
  })
})
