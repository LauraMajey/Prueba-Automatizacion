describe('prueba de busqueda de carros', () => {
  
  it('abri pagina', () => {
    cy.viewport(1024, 768)
    cy.visit('https://www.viajemos.com/es/')
    cy.get('[data-link="pickupLocation"]').type('Barcelona Airport');
    cy.get('#ui-id-1 li', { timeout: 10000 }).should('exist');
    cy.get('#ui-id-1 li')
    .contains('Aeropuerto de Barcelona, Barcelona, España') 
    .click();
    cy.get('.switch__slider.switch__slider--round').first()
      .click();


    cy.get('[data-link="returnLocation"]').type('Madrid');
    cy.get('#ui-id-2 li', { timeout: 10000 }).should('exist');
    cy.get('#ui-id-2 li')
    .contains('Aeropuerto de Madrid Barajas, Madrid, España') 
    .click();

    cy.get('[data-link="pickupDateCarModal"]') 
    .should('be.visible')  
    .click();
    cy.get('.container__months').should('exist');

    for (let i = 0; i < 5; i++) {
     cy.get('.button-next-month').eq(1)
     .should('be.visible') 
     .click()
    }
    cy.get('.month-item-name').eq(1).should('contain', 'julio')

    cy.get('.month-item').eq(1) 
    .find('.day-item') 
    .contains('20') 
    .click();


    cy.get('.month-item').first()
    .find('.day-item') 
    .contains('22') 
    .click();

    cy.get('.quicksearch__button.button-default--qs').first()
   .click();

   cy.get('.card-vehicle').should('be.visible');

   cy.get('.card-vehicle').each(($vehicle) => {

    cy.wrap($vehicle)
    .find('.card-vehicle__tile')
    .should('be.visible');

    cy.wrap($vehicle)
    .find('.mb-XS')
    .should('be.visible');

    cy.wrap($vehicle)
    .find('.price__number')
    .scrollIntoView()
    .should('be.visible')
    .and('not.be.empty');
   });
  })

})