describe('Formulario de Farmacia', () => {

  beforeEach(() => {
    const farmacias = [
      { nit: '12345', pharmacyName: 'Farmacia Ya Registrada' }
    ];
    const representantes = ['9999999999'];

    localStorage.setItem('pharmacies', JSON.stringify(farmacias));
    localStorage.setItem('legalRepresentatives', JSON.stringify(representantes));

    cy.visit('http://localhost:5173');
  });

  it('Muestra error si el NIT ya está registrado', () => {
    cy.get('input[name="nit"]').type('12345');
    cy.wait(1100);
    cy.contains('Esta farmacia está en proceso de aprobación')
      .should('be.visible');
  });

  it('Muestra error si la cédula del representante legal no está registrada', () => {
    cy.get('input[name="pharmacyName"]').type('Mi Farmacia');
    cy.get('input[name="nit"]').type('00000');
    cy.get('input[name="address"]').type('Calle Falsa 123');
    cy.get('select[name="department"]').select('Antioquia');
    cy.get('select[name="city"]').select('Medellín');
    cy.get('input[name="phone"]').type('1234567890');
    cy.get('input[name="email"]').type('correo@farmacia.com');
    cy.contains('Siguiente').click();

    cy.get('input[name="representativeId"]').type('1111111111');
    cy.wait(1100);
    cy.contains('No hay registro de este representante legal')
      .should('be.visible');
  });

  it('Impide avanzar con NIT duplicado luego de llenar todos los campos', () => {
    cy.get('input[name="pharmacyName"]').type('Farmacia Falsa');
    cy.get('input[name="nit"]').type('12345'); // NIT duplicado
    cy.get('input[name="address"]').type('Calle Principal 456');
    cy.get('select[name="department"]').select('Antioquia');
    cy.get('select[name="city"]').select('Medellín');
    cy.get('input[name="phone"]').type('9876543210');
    cy.get('input[name="email"]').type('falsa@correo.com');

    cy.contains('Siguiente').click();

    cy.get('input[name="representativeId"]').type('9999999999');
    cy.contains('Siguiente').click();

    cy.get('input[type="file"]').eq(0).selectFile('cypress/fixtures/NewBalanceTekela.jpg', { force: true });
    cy.get('input[type="file"]').eq(1).selectFile('cypress/fixtures/NewBalanceTekela.jpg', { force: true });
    cy.get('input[type="file"]').eq(2).selectFile('cypress/fixtures/NewBalanceTekela.jpg', { force: true });

    cy.contains('Siguiente').click();
    cy.contains('Enviar Solicitud').click();

    cy.contains('Ya existe una farmacia registrada con este NIT.').should('be.visible');
  });

  it('No permite avanzar si la primera página está vacía', () => {
    cy.contains('Siguiente').click();

    cy.contains('Por favor corrija los siguientes errores')
      .should('be.visible')
      .and('contain', 'Nombre de la farmacia');
  });

  it('Permite avanzar si la cédula del representante está registrada', () => {
    cy.get('input[name="pharmacyName"]').type('Farmacia OK');
    cy.get('input[name="nit"]').type('99999');
    cy.get('input[name="address"]').type('Av Siempre Viva 742');
    cy.get('select[name="department"]').select('Antioquia');
    cy.get('select[name="city"]').select('Medellín');
    cy.get('input[name="phone"]').type('3210001111');
    cy.get('input[name="email"]').type('farmacia@ok.com');

    cy.contains('Siguiente').click();

    cy.get('input[name="representativeId"]').type('9999999999');
    cy.wait(1100);

    cy.contains('No hay registro de este representante legal')
      .should('not.exist');

    cy.contains('Siguiente').click();
    cy.contains('Documentos Requeridos').should('be.visible');
  });

  it('Completa el flujo exitoso y muestra el modal de éxito', () => {
    const nit = 'NEWNIT' + Date.now(); // NIT único para no duplicar

    // Página 1
    cy.get('input[name="pharmacyName"]').type('Farmacia Nueva');
    cy.get('input[name="nit"]').type(nit);
    cy.get('input[name="address"]').type('Calle Test 123');
    cy.get('select[name="department"]').select('Antioquia');
    cy.get('select[name="city"]').select('Medellín');
    cy.get('input[name="phone"]').type('5555555555');
    cy.get('input[name="email"]').type('nueva@farmacia.com');
    cy.contains('Siguiente').click();

    // Página 2
    cy.get('input[name="representativeId"]').type('9999999999');
    cy.wait(1100);
    cy.contains('Siguiente').click();

    // Página 3
    cy.get('input[type="file"]').eq(0).selectFile('cypress/fixtures/NewBalanceTekela.jpg', { force: true });
    cy.get('input[type="file"]').eq(1).selectFile('cypress/fixtures/NewBalanceTekela.jpg', { force: true });
    cy.get('input[type="file"]').eq(2).selectFile('cypress/fixtures/NewBalanceTekela.jpg', { force: true });
    cy.contains('Siguiente').click();

    // Página 4
    cy.get('textarea[name="comments"]').type('Comentario de prueba exitoso.');

    // Enviar
    cy.contains('Enviar Solicitud').click();

    // Confirmación
    cy.contains('Registro Exitoso').should('be.visible');
    cy.contains('La farmacia ha sido registrada correctamente.').should('be.visible');
  });

});
