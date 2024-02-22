describe('Testy przycisków', () => {
  it('Powinien sprawdzić, czy przycisk 1 jest klikalny', () => {
    cy.visit('http://127.0.0.1:5500/3a_quiz-master/public/ScreenPage.html');

    // Sprawdzanie czy przycisk 1 jest klikalny
    cy.get('.p0').should('be.visible').click();
  });

  it('Powinien sprawdzić, czy przycisk 2 jest klikalny', () => {
    cy.visit('http://127.0.0.1:5500/3a_quiz-master/public/ScreenPage.html');

    // Sprawdzanie czy przycisk 2 jest klikalny
    cy.get('.p1').should('be.visible').click();
  });

  it('Powinien sprawdzić, czy przycisk 3 jest klikalny', () => {
    cy.visit('http://127.0.0.1:5500/3a_quiz-master/public/ScreenPage.html');

    // Sprawdzanie czy przycisk 3 jest klikalny
    cy.get('.p2').should('be.visible').click();
  });

  it('Powinien sprawdzić, czy przycisk 4 jest klikalny', () => {
    cy.visit('http://127.0.0.1:5500/3a_quiz-master/public/ScreenPage.html');

    // Sprawdzanie czy przycisk 4 jest klikalny
    cy.get('.p3').should('be.visible').click();
  });
});
