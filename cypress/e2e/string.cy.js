import { Border } from "./constans";
import { DELAY_IN_MS } from "../../src/constants/delays";


describe('String tests', () => {
  it('Open string page', () => {
    cy.visit('/recursion')
  });

  it('Start button disabled with empty input', () => {
    cy.get('[data-cy="input"]').clear();
    cy.get('[data-cy="submit"]').should('be.disabled');
  });

  it('Set value', () => {
    cy.get('[data-cy="input"]').type('весна');
    cy.get('[data-cy="submit"]').click();
    cy.get('[data-cy="submit"]').should('be.disabled');
  });

  it('Reverse animation', () => {
    cy.get('[data-cy="circle"]').as('circles');

    const checkSpell = (elements, spell) => {
      cy.get(elements).should('have.length', spell.length);
      for (let i = 0; i < spell.length; i++) {
        cy.get(elements).eq(i).should('contain', spell[i]);
      }
    }

    checkSpell('@circles', 'весна');
    cy.get('@circles').each(($circle, index) => {
      if (index === 0 || index === 4) {
        cy.wrap($circle).should('have.css', 'border', Border.Changing);
      } else {
        cy.wrap($circle).should('have.css', 'border', Border.Default);
      }
    });

    cy.wait(DELAY_IN_MS);
    checkSpell('@circles', 'аеснв');
    cy.get('@circles').each(($circle, index) => {
      if (index === 1 || index === 3) {
        cy.wrap($circle).should('have.css', 'border', Border.Changing);
      } else if (index < 1 || index > 3) {
        cy.wrap($circle).should('have.css', 'border', Border.Modified);
      } else {
        cy.wrap($circle).should('have.css', 'border', Border.Default);
      }
    });

    cy.wait(DELAY_IN_MS);
    checkSpell('@circles', 'ансев');
    cy.get('@circles').each(($circle) => {
      cy.wrap($circle).should('have.css', 'border', Border.Modified);
    });
  })
})