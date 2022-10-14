describe('Routing test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  });

  it('Open string page', () => {
    cy.get('a[href*="recursion"]').click()
    cy.contains('Строка')
  });

  it('Open fibonacci page', () => {
    cy.get('a[href*="fibonacci"]').click()
    cy.contains('Последовательность Фибоначчи')
  });

  it('Open sorting page', () => {
    cy.get('a[href*="sorting"]').click()
    cy.contains('Сортировка массива')
  });

  it('Open stack page', () => {
    cy.get('a[href*="stack"]').click()
    cy.contains('Стек')
  });

  it('Open queue page', () => {
    cy.get('a[href*="queue"]').click()
    cy.contains('Очередь')
  });

  it('Open list page', () => {
    cy.get('a[href*="list"]').click()
    cy.contains('Связный список')
  });
})