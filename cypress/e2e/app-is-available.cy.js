describe('Application availability test', function() {
  it('Should be available on localhost:3000', function() {
    cy.visit('/');
  });
});