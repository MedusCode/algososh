import { Border } from "./constans";
import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";

const fibonacci = [1,1,2,3,5,8,13];

describe('Fibonacci tests', () => {
  it('Open fibonacci page', () => {
    cy.visit('http://localhost:3000/fibonacci');
  });

  it('Start button disabled with empty input', () => {
    cy.get('[data-cy="input"]').clear();
    cy.get('[data-cy="submit"]').should('be.disabled');
  });

  it('Set value', () => {
    cy.get('[data-cy="input"]').type(`${fibonacci.length - 1}`);
    cy.get('[data-cy="submit"]').click();
    cy.get('[data-cy="submit"]').should('be.disabled');
  });

  it('Fibonacci animation', () => {
    cy.get('[data-cy="circleContainer"]').as('circleContainers');

    for (let i = 0; i < fibonacci.length; i++) {
      cy.get('@circleContainers').should('have.length', i + 1);

      for (let j = 0; j <= i; j++) {
        cy.get('@circleContainers').eq(j).find('[data-cy="circle"]')
          .should('contain', fibonacci[j])
          .should('have.css', 'border', Border.Default);

        cy.get('@circleContainers').eq(j).find('[data-cy="circleIndex"]')
          .should('contain', j);
      }

      cy.wait(SHORT_DELAY_IN_MS);
    }
  })
})