import { Border } from "./constans";
import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";


describe('Stack tests', () => {
  beforeEach('Open stack page', () => {
    cy.visit('/stack');
  });

  it('Remove and clear buttons disabled initially', () => {
    cy.get('[data-cy="circle"]').should('not.exist');
    cy.get('[data-cy="remove"]').should('be.disabled');
    cy.get('[data-cy="clear"]').should('be.disabled');
  });

  it('Add button disabled with empty input', () => {
    cy.get('[data-cy="input"]').clear();
    cy.get('[data-cy="add"]').should('be.disabled');
  });

  const addElement = (value) => {
    cy.get('[data-cy="input"]').type(value);
    cy.get('[data-cy="add"]').click();
  }

  const removeElement = () => {
    cy.get('[data-cy="remove"]').click();
  }

  const checkTop = (elements, index, value, border) => {
    cy.get(elements).should('have.length', index + 1);
    cy.get(elements).eq(index).as('element')
    cy.get('@element').find('[data-cy="circle"]')
      .should('have.css', 'border', border)
      .should('contain', value)
    cy.get('@element').find('[data-cy="circleIndex"]')
      .should('contain', index);
    cy.get('@element').find('[data-cy="circleHead"]')
      .should('contain', 'top');
  }

  const checkNotTop = (elements, index, value) => {
    cy.get(elements).should('have.lengthOf.greaterThan', index + 1);
    cy.get(elements).eq(index).as('element')
    cy.get('@element').find('[data-cy="circle"]')
      .should('have.css', 'border', Border.Default)
      .should('contain', value)
    cy.get('@element').find('[data-cy="circleIndex"]')
      .should('contain', index);
    cy.get('@element').find('[data-cy="circleHead"]')
      .should('not.exist');
  }

  it('Add element', () => {
    addElement('one');

    cy.get('[data-cy="circleContainer"]').as('circleContainers');

    checkTop('@circleContainers', 0, 'one', Border.Changing);

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('@circleContainers').eq(0).find('[data-cy="circle"]')
      .should('have.css', 'border', Border.Default)

    addElement('two')

    checkTop('@circleContainers', 1, 'two', Border.Changing);
    checkNotTop('@circleContainers', 0, 'one');

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('@circleContainers').eq(1).find('[data-cy="circle"]')
      .should('have.css', 'border', Border.Default);
  });

  it('Remove element', () => {
    addElement('one');
    cy.wait(SHORT_DELAY_IN_MS);
    addElement('two');
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[data-cy="circleContainer"]').as('circleContainers');

    removeElement();

    checkTop('@circleContainers', 1, 'two', Border.Changing);

    cy.wait(SHORT_DELAY_IN_MS);

    checkTop('@circleContainers', 0, 'one', Border.Default);
  });

  it('Clear elements', () => {
    addElement('one');
    cy.wait(SHORT_DELAY_IN_MS);
    addElement('two');
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[data-cy="circleContainer"]').as('circleContainers');

    cy.get('[data-cy="clear"]').click();

    cy.get('@circleContainers').should('not.exist');
  });
})