describe("search flighs", () => {
  it("seach only by Departure", () => {
    cy.visit("/");
    cy.get(`[data-cy='flight_site_header']`).should("be.visible");

    cy.get(`[data-cy='departure_search_textfield']`)
      .should("be.visible")
      .clear()
      .type("Israel");
    cy.get(`[data-cy='search_flights_button']`).should("be.visible").click();
    cy.get(`[data-cy='depart_dest_text_flight_7']`)
      .should("be.visible")
      .and("contain.text", "Israel (ISR) ➡️");
    cy.get(`[data-cy='flight_component']`).should("have.length", 1);
  });

  it("seach only by Destenation", () => {
    cy.visit("/");
    cy.get(`[data-cy='flight_site_header']`).should("be.visible");

    cy.get(`[data-cy='destination_search_textfield']`)
      .should("be.visible")
      .clear()
      .type("Israel");
    cy.get(`[data-cy='search_flights_button']`).should("be.visible").click();
    cy.get(`[data-cy='depart_dest_text_flight_8']`)
      .should("be.visible")
      .and("contain.text", " ➡️ Israel (ISR)");
    cy.get(`[data-cy='flight_component']`).should("have.length", 1);
  });
  it("seach by Destenation and Departure", () => {
    cy.visit("/");
    cy.get(`[data-cy='flight_site_header']`).should("be.visible");
    cy.get(`[data-cy='departure_search_textfield']`)
      .should("be.visible")
      .clear()
      .type("Chicago");
    cy.get(`[data-cy='destination_search_textfield']`)
      .should("be.visible")
      .clear()
      .type("Miami");
    cy.get(`[data-cy='search_flights_button']`).should("be.visible").click();
    cy.get(`[data-cy='depart_dest_text_flight_2']`)
      .should("be.visible")
      .and("contain.text", "Chicago (ORD) ➡️ Miami (MIA)");
    cy.get(`[data-cy='flight_component']`).should("have.length", 1);
  });
  it("Clear search text and get all flights", () => {
    cy.visit("/");
    cy.get(`[data-cy='flight_site_header']`).should("be.visible");
    cy.get(`[data-cy='departure_search_textfield']`)
      .should("be.visible")
      .clear()
      .type("Chicago");
    cy.get(`[data-cy='destination_search_textfield']`)
      .should("be.visible")
      .clear()
      .type("Miami");
    cy.get(`[data-cy='search_flights_button']`).should("be.visible").click();
    cy.get(`[data-cy='depart_dest_text_flight_2']`)
      .should("be.visible")
      .and("contain.text", "Chicago (ORD) ➡️ Miami (MIA)");
    cy.get(`[data-cy='flight_component']`).should("have.length", 1);

    cy.get(`[data-cy='departure_search_textfield']`).clear();
    cy.get(`[data-cy='destination_search_textfield']`).clear();
    cy.get(`[data-cy='search_flights_button']`).should("be.visible").click();
    cy.get(`[data-cy='flight_component']`).should("have.length.at.least", 8);
  });
});
