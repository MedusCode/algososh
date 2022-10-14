import { Border } from "./constans";
import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";

describe('List tests', () => {
  beforeEach('Open list page', () => {
    cy.visit('/list');
  });

  it('Add buttons disabled with empty input', () => {
    cy.get('[data-cy="valueInput"]').clear();
    cy.get('[data-cy="addToHead"]').should('be.disabled');
    cy.get('[data-cy="addToTail"]').should('be.disabled');
    cy.get('[data-cy="addByIndex"]').should('be.disabled');
  });

  it('Initial circles exists', () => {
    cy.get('[data-cy="circleContainer"]').each(($circleContainer, index, $list) => {
      if (index === 0) {
        cy.wrap($circleContainer).find('[data-cy="circleHead"]').should('contain', 'head')
      }
      if (index === $list.length - 1) {
        cy.wrap($circleContainer).find('[data-cy="circleTail"]').should('contain', 'tail')
      }
      cy.wrap($circleContainer).find('[data-cy="circleIndex"]').should('contain', index);
    })
  });

  const checkButtonsDisability = () => {
    cy.get('[data-cy="addToHead"]').should('be.disabled');
    cy.get('[data-cy="addToTail"]').should('be.disabled');
    cy.get('[data-cy="addByIndex"]').should('be.disabled');
    cy.get('[data-cy="removeFromHead"]').should('be.disabled');
    cy.get('[data-cy="removeFromTail"]').should('be.disabled');
    cy.get('[data-cy="removeByIndex"]').should('be.disabled');
  }

  const checkBorder = (element, border) => {
    cy.get(element).find('[data-cy="circle"]')
      .should('have.css', 'border', border)
  }

  const checkValue = (element, value) => {
    cy.get(element).find('[data-cy="circle"]')
      .should('contain', value)
  }

  const checkIndex = (element, index) => {
    cy.get(element).find('[data-cy="circleIndex"]')
      .should('contain', index);
  }

  const checkPosition = (element, head, tail) => {
    if (head) {
      cy.get(element).find('[data-cy="circleHead"]')
        .should('contain', 'head');
    } else {
      cy.get(element).find('[data-cy="circleHead"]')
        .should('not.contain.value');
    }
    if (tail) {
      cy.get(element).find('[data-cy="circleTail"]')
        .should('contain', 'tail');
    } else {
      cy.get(element).find('[data-cy="circleTail"]')
        .should('not.contain.value');
    }
  }

  it('Add element to head', () => {
    cy.get('[data-cy="circleContainer"]').as('circleContainers');

    cy.get('@circleContainers').its('length').then((length) => {
      cy.get('[data-cy="valueInput"]').type('one');
      cy.get('[data-cy="addToHead"]').click();

      cy.get('@circleContainers').should('have.length', length + 1);

      cy.get('@circleContainers').eq(0).as('firstElement').find('[data-cy="circleHead"]').as('firstElementHead');
      checkBorder('@firstElementHead', Border.Changing);
      checkValue('@firstElementHead', 'one');

      checkButtonsDisability();
      cy.wait(SHORT_DELAY_IN_MS);

      checkValue('@firstElement', 'one');
      checkIndex('@firstElement', 0);
      checkBorder('@firstElement', Border.Modified);
      checkPosition('@firstElement', true, false);

      cy.wait(SHORT_DELAY_IN_MS);

      checkBorder('@firstElement', Border.Default);
      cy.get('@circleContainers').eq(1).find('[data-cy="circleHead"]').should('contain', '');
    })
  })

  it('Add element to tail', () => {
    cy.get('[data-cy="circleContainer"]').as('circleContainers');

    cy.get('@circleContainers').its('length').then((length) => {
      cy.get('[data-cy="valueInput"]').type('one');
      cy.get('[data-cy="addToTail"]').click();

      cy.get('@circleContainers').should('have.length', length + 1);

      cy.get('@circleContainers').eq(length - 1).as('penultimateElement')
      cy.get('@penultimateElement').find('[data-cy="circleHead"]').as('penultimateElementHead');
      checkBorder('@penultimateElementHead', Border.Changing);
      checkValue('@penultimateElementHead', 'one');

      checkButtonsDisability();
      cy.wait(SHORT_DELAY_IN_MS);

      cy.get('@circleContainers').last().as('lastElement');
      checkValue('@lastElement', 'one');
      checkIndex('@lastElement', length);
      checkBorder('@lastElement', Border.Modified);
      checkPosition('@lastElement', false, true);

      cy.wait(SHORT_DELAY_IN_MS);

      checkBorder('@lastElement', Border.Default);
      cy.get('@penultimateElement').find('[data-cy="circleTail"]').should('contain', '');
    })
  });

  it('Add by index', () => {
    cy.get('[data-cy="circleContainer"]').as('circleContainers');

    cy.get('@circleContainers').its('length').then((length) => {
      cy.get('[data-cy="valueInput"]').type('one');
      cy.get('[data-cy="indexInput"]').type('1');
      cy.get('[data-cy="addByIndex"]').click();

      cy.get('@circleContainers').should('have.length', length + 1);

      cy.get('@circleContainers').eq(0).as('firstElement').find('[data-cy="circleHead"]').as('firstElementHead');
      checkBorder('@firstElementHead', Border.Changing);
      checkValue('@firstElementHead', 'one');

      checkButtonsDisability();
      cy.wait(SHORT_DELAY_IN_MS);

      checkBorder('@firstElement', Border.Changing);
      checkPosition('@firstElement', true, false);

      cy.get('@circleContainers').eq(1).as('secondElement').find('[data-cy="circleHead"]').as('secondElementHead');
      checkBorder('@secondElementHead', Border.Changing);
      checkValue('@secondElementHead', 'one');

      cy.wait(SHORT_DELAY_IN_MS);

      checkBorder('@firstElement', Border.Default);
      checkValue('@secondElement', 'one');
      checkIndex('@secondElement', 1);
      checkBorder('@secondElement', Border.Modified);
      checkPosition('@secondElement', false, false);

      cy.wait(SHORT_DELAY_IN_MS);

      checkBorder('@secondElement', Border.Default);
    })
  });

  it('Remove from head', () => {
    cy.get('[data-cy="circleContainer"]').as('circleContainers');

    cy.get('[data-cy="valueInput"]').type('one');
    cy.get('[data-cy="addToHead"]').click();
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[data-cy="valueInput"]').type('two');
    cy.get('[data-cy="addToHead"]').click();
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('@circleContainers').its('length').then((length) => {
      cy.get('[data-cy="removeFromHead"]').click();

      cy.get('@circleContainers').eq(0).as('firstElement').find('[data-cy="circleTail"]').as('firstElementTail');
      checkBorder('@firstElementTail', Border.Changing);
      checkValue('@firstElementTail', 'two')

      checkButtonsDisability();
      cy.wait(SHORT_DELAY_IN_MS);

      checkValue('@firstElement', 'one');
      checkIndex('@firstElement', 0);
      checkBorder('@firstElement', Border.Default);
      checkPosition('@firstElement', true, false);

      cy.get('@circleContainers').should('have.length', length - 1);
    })
  });

  it('Remove from tail', () => {
    cy.get('[data-cy="circleContainer"]').as('circleContainers');

    cy.get('[data-cy="valueInput"]').type('one');
    cy.get('[data-cy="addToTail"]').click();
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[data-cy="valueInput"]').type('two');
    cy.get('[data-cy="addToTail"]').click();
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('@circleContainers').its('length').then((length) => {
      cy.get('[data-cy="removeFromTail"]').click();

      cy.get('@circleContainers').eq(length - 1).as('penultimateElement');
      cy.get('@penultimateElement').find('[data-cy="circleTail"]').as('penultimateElementTail');
      checkBorder('@penultimateElementTail', Border.Changing);
      checkValue('@penultimateElementTail', 'two');

      checkButtonsDisability();
      cy.wait(SHORT_DELAY_IN_MS);

      cy.get('@circleContainers').last().as('lastElement')
      checkValue('@lastElement', 'one');
      checkIndex('@lastElement', length - 2);
      checkBorder('@lastElement', Border.Default);
      checkPosition('@lastElement', false, true);

      cy.get('@circleContainers').should('have.length', length - 1);
    })
  });

  it('Remove by index', () => {
    cy.get('[data-cy="circleContainer"]').as('circleContainers');

    cy.get('[data-cy="valueInput"]').type('one');
    cy.get('[data-cy="addToHead"]').click();
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[data-cy="valueInput"]').type('two');
    cy.get('[data-cy="addToHead"]').click();
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('@circleContainers').its('length').then((length) => {
      cy.get('[data-cy="indexInput"]').type('1');
      cy.get('[data-cy="removeByIndex"]').click();

      checkButtonsDisability();
      cy.wait(SHORT_DELAY_IN_MS);

      cy.get('@circleContainers').first().as('firstElement')
      checkBorder('@firstElement', Border.Changing);

      cy.wait(SHORT_DELAY_IN_MS);

      cy.get('@circleContainers').eq(1).as('secondElement')
      cy.get('@secondElement').find('[data-cy="circleTail"]').as('secondElementTail');
      checkBorder('@secondElementTail', Border.Changing);
      checkValue('@secondElementTail', 'one');

      cy.wait(SHORT_DELAY_IN_MS);

      checkValue('@firstElement', 'two');
      checkBorder('@firstElement', Border.Default);
      checkIndex('@secondElement', 1);
      checkBorder('@secondElement', Border.Default);
      checkPosition('@secondElement', false, false);
      cy.get('@secondElement').should('not.contain', 'one');

      cy.get('@circleContainers').should('have.length', length - 1);
    })
  });
});