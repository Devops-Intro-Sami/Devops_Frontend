describe("test booking one flight success and fail when no seats", () => {
  it("test success booking 1 flight", () => {
    const flightNum = 5;
    cy.visit("/");
    cy.get(`[data-cy='available_seats_number_flight_${flightNum}']`)
      .invoke("attr", "seats")
      .then((seats) => {
        const seatsBefore = seats;
        cy.get(`[data-cy='seats_number_textfield_flight_${flightNum}']`)
          .should("be.visible")
          .clear()
          .type("1");
        cy.get(`[data-cy='book_now_button_flight_${flightNum}']`)
          .should("be.visible")
          .click();

        cy.get(`[data-cy='sucsess_dialog_popup_flight_${flightNum}']`).should(
          "be.visible"
        );
        cy.get(`[data-cy='x_close_dialog_button_flight_${flightNum}']`)
          .should("be.visible")
          .click();
        cy.get(`[data-cy='sucsess_dialog_popup_flight_${flightNum}']`).should(
          "not.be.visible"
        );

        cy.get(`[data-cy='available_seats_number_flight_${flightNum}']`).should(
          "have.attr",
          "seats",
          seatsBefore - 1
        );
      });
  });

  it("test fail booking 1 flight", () => {
    const flightNum = 7;
    cy.visit("/");
    cy.get(`[data-cy='available_seats_number_flight_${flightNum}']`).should(
      "have.attr",
      "seats",
      "0"
    );
    cy.get(`[data-cy='seats_number_textfield_flight_${flightNum}']`)
      .should("be.visible")
      .clear()
      .type("1");
    cy.get(`[data-cy='book_now_button_flight_${flightNum}']`)
      .should("be.visible")
      .click();

    cy.get(`[data-cy='error_message']`).should("be.visible");

    cy.get(`[data-cy='available_seats_number_flight_${flightNum}']`)
      .invoke("attr", "seats")
      .should("equal", "0");
  });
});
