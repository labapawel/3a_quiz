describe('Test strony Quiz', () => {
  it('Powinien otworzyć stronę i sprawdzić poprawność elementów', () => {
    // Otwórz stronę
    cy.visit('http://127.0.0.1:5500/3a_quiz-master/public/index.html');

    // Sprawdź czy tytuł strony jest poprawny
    cy.title().should('eq', 'Quiz');

    // Sprawdź czy istnieje przycisk "Play" i czy jest przekierowujący do ScreenPage.html
    cy.get('.btn-play').should('exist').and('have.attr', 'href', 'ScreenPage.html');

    // Sprawdź czy istnieje element .record-container i czy zawiera element .record
    cy.get('.btn-play').should('exist').and('have.attr', 'href', 'ScreenPage.html')
    .click(); // Kliknij przycisk "Play"
  });
});
