describe('prueba de busqueda de carros', () => {
  
  it('abri pagina', () => {
    cy.viewport(1024, 768)
    //Ingresa al sitio 
    cy.visit('https://www.viajemos.com/es/')
    //Ingresa la localidad de reecogidad
    cy.get('[data-link="pickupLocation"]').type('Barcelona Airport');
    cy.get('#ui-id-1 li', { timeout: 10000 }).should('exist');
    cy.get('#ui-id-1 li')
    .contains('Aeropuerto de Barcelona, Barcelona, España') 
    .click();
    //Habilita la opción de recogida en otra localidad
    cy.get('.switch__slider.switch__slider--round').first()
      .click();

    //Ingresa la localidad de reecogidad
    cy.get('[data-link="returnLocation"]').type('Madrid');
    cy.get('#ui-id-2 li', { timeout: 10000 }).should('exist');
    cy.get('#ui-id-2 li')
    .contains('Aeropuerto de Madrid Barajas, Madrid, España') 
    .click();
    //Ingresa al modal de calendario, dando click a el pick up date 
    cy.get('[data-link="pickupDateCarModal"]') 
    .should('be.visible')  
    .click();
    //Verifica que el modal del calendario exista 
    cy.get('.container__months').should('exist');

    //Bucle for para realizar la acción de avanzar al siguiente mes 5 veces hasta llegar a julio
    for (let i = 0; i < 5; i++) {
     cy.get('.button-next-month').eq(1)
     .should('be.visible') 
     .click()
    }
    //Verifica que el mes de julio este visible 
    cy.get('.month-item-name').eq(1).should('contain', 'julio')
    //Selecciona el día 20
    cy.get('.month-item').eq(1) 
    .find('.day-item') 
    .contains('20') 
    .click();

    // Selecciona el día 22
    cy.get('.month-item').first()
    .find('.day-item') 
    .contains('22') 
    .click();
    //Clic en el botón 'Buscar'
    cy.get('.quicksearch__button.button-default--qs').first()
    .click();
    //Verifica que las tarjetas de vehiculo esten activas (disponibilidad)
    cy.get('.card-vehicle').should('be.visible');
    //Verifica en las tarjetas del vehiculo que la informacion este visible
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