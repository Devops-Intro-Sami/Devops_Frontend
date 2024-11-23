describe("search flighs", () => {
  it("seach only by Departure", () => {
    const flightNum = 3;
    cy.visit("/");
    cy.get(`[data-cy='flight_site_header']`).should("be.visible");

    cy.get(`[data-cy='departure_search_textfield']`)
      .should("be.visible")
      .clear()
      .type("Israel");
    cy.get(`[data-cy='search_flights_button']`).should("be.visible").click();

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
});
