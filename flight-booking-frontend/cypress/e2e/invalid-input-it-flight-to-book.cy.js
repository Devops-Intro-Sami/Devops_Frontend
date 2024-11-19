describe("test booking one flight success and fail when no seats", () => {
  it("test invalid input signs and letters", () => {
    const flightNum = 3;
    cy.visit("/");
    cy.get(`[data-cy='flight_site_header']`).should("be.visible");

    cy.get(`[data-cy='seats_number_textfield_flight_${flightNum}']`)
      .scrollIntoView()
      .should("be.visible")
      .clear()
      .type("aaa321!@#123");
    cy.get(`[data-cy='seats_number_textfield_flight_${flightNum}']`).should(
      "have.value",
      "321123"
    );
  });
  it("test invalid input number 0", () => {
    const flightNum = 3;
    cy.visit("/");
    cy.get(`[data-cy='flight_site_header']`).should("be.visible");

    cy.get(`[data-cy='seats_number_textfield_flight_${flightNum}']`)
      .scrollIntoView()
      .should("be.visible")
      .clear()
      .type("0");
    cy.get(`[data-cy='seats_number_textfield_flight_${flightNum}']`).should(
      "have.value",
      "0"
    );
    cy.get(`[data-cy='book_now_button_flight_${flightNum}']`)
      .should("be.visible")
      .click();

    cy.get(`[data-cy='error_message']`).should("be.visible");
  });
});
