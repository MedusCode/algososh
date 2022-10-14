import { Border } from "./constans";
import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";


describe('Queue tests', () => {
  beforeEach('Open queue page', () => {
    cy.visit('http://localhost:3000/queue');
  });

  it('Remove and clear buttons disabled initially', () => {
    cy.get('[data-cy="remove"]').should('be.disabled');
    cy.get('[data-cy="clear"]').should('be.disabled');
  });

  it('Add button disabled with empty input', () => {
    cy.get('[data-cy="input"]').clear();
    cy.get('[data-cy="add"]').should('be.disabled');
  });

  it('Initial circles exists', () => {
    cy.get('[data-cy="circleContainer"]').each(($circleContainer, index) => {
      cy.wrap($circleContainer).find('[data-cy="circleIndex"]').should('contain', index);
    })
  })

  const checkButtonsDisability = () => {
    cy.get('[data-cy="add"]').should('be.disabled')
    cy.get('[data-cy="remove"]').should('be.disabled')
    cy.get('[data-cy="clear"]').should('be.disabled')
  }

  const addElement = (value) => {
    cy.get('[data-cy="input"]').type(value);
    cy.get('[data-cy="add"]').click();
  }

  const removeElement = () => {
    cy.get('[data-cy="remove"]').click();
  }

  const checkBorder = (element, border) => {
    cy.get(element).find('[data-cy="circle"]')
      .should('have.css', 'border', border)
  }

  const checkElement = (element, index, value) => {
    cy.get(element).find('[data-cy="circle"]')
      .should('contain', value)
    cy.get(element).find('[data-cy="circleIndex"]')
      .should('contain', index);
  }

  const checkPosition = (element, head, tail) => {
    if (head) {
      cy.get(element).find('[data-cy="circleHead"]')
        .should('contain', 'head');
    } else {
      cy.get(element).find('[data-cy="circleHead"]')
        .should('contain', '');
    }
    if (tail) {
      cy.get(element).find('[data-cy="circleTail"]')
        .should('contain', 'tail');
    } else {
      cy.get(element).find('[data-cy="circleTail"]')
        .should('contain', '');
    }
  }

  it('Add element', () => {
    cy.get('[data-cy="circleContainer"]').as('circleContainers');

    addElement('one');
    cy.get('@circleContainers').eq(0).as('firstElement');

    checkElement('@firstElement', 0, 'one');
    checkBorder('@firstElement', Border.Changing);
    checkPosition('@firstElement', true, true);

    checkButtonsDisability();
    cy.wait(SHORT_DELAY_IN_MS);
    checkBorder('@firstElement', Border.Default);

    addElement('two');
    cy.get('@circleContainers').eq(1).as('secondElement');

    checkElement('@secondElement', 1, 'two');
    checkBorder('@secondElement', Border.Changing);
    checkPosition('@secondElement', false, true);

    checkElement('@firstElement', 0, 'one');
    checkBorder('@firstElement', Border.Default);
    checkPosition('@firstElement', true, false);

    checkButtonsDisability();
    cy.wait(SHORT_DELAY_IN_MS);
    checkBorder('@secondElement', Border.Default);
  })

  it ('Remove element', () => {
    cy.get('[data-cy="circleContainer"]').as('circleContainers');

    addElement('one');
    cy.get('@circleContainers').eq(0).as('firstElement');
    cy.wait(SHORT_DELAY_IN_MS);
    addElement('two');
    cy.get('@circleContainers').eq(1).as('secondElement');
    cy.wait(SHORT_DELAY_IN_MS);

    removeElement();

    checkBorder('@firstElement', Border.Changing);
    checkButtonsDisability();
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('@firstElement').should('not.contain', 'one');
    checkPosition('@firstElement', false, false);
    checkPosition('@secondElement', true, true);
  })

  it ('Clear elements', () => {
    cy.get('[data-cy="circle"] p').as('text');

    addElement('one');
    cy.wait(SHORT_DELAY_IN_MS);
    addElement('two');
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[data-cy="clear"]').click();

    cy.get('@text').each($element => {
      expect($element).to.contain('');
    })
  })
})