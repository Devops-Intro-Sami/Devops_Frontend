describe("test booking one flight success and fail when no seats", () => {
  it("test success booking multiple flight", () => {
    const flightNum = 5;
    const bookNum = 3;
    cy.visit("/");
    cy.get(`[data-cy='available_seats_number_flight_${flightNum}']`)
      .invoke("attr", "seats")
      .then((seats) => {
        const seatsBefore = seats;
        cy.get(`[data-cy='seats_number_textfield_flight_${flightNum}']`)
          .should("be.visible")
          .clear()
          .type(bookNum);
        cy.get(`[data-cy='book_now_button_flight_${flightNum}']`)
          .should("be.visible")
          .click();

        cy.get(`[data-cy='sucsess_dialog_popup']`).should("be.visible");
        cy.get(`[data-cy='x_close_dialog_button']`)
          .should("be.visible")
          .click();
        cy.get(`[data-cy='sucsess_dialog_popup']`).should("not.be.visible");

        cy.get(`[data-cy='available_seats_number_flight_${flightNum}']`).should(
          "have.attr",
          "seats",
          seatsBefore - bookNum
        );
      });
  });

  it("test fail booking multiple flight", () => {
    const flightNum = 7;
    const bookNum = 3;
    cy.visit("/");
    cy.get(`[data-cy='available_seats_number_flight_${flightNum}']`).should(
      "have.attr",
      "seats",
      "2"
    );
    cy.get(`[data-cy='seats_number_textfield_flight_${flightNum}']`)
      .should("be.visible")
      .clear()
      .type(bookNum);
    cy.get(`[data-cy='book_now_button_flight_${flightNum}']`)
      .should("be.visible")
      .click();

    cy.get(`[data-cy='error_message']`).should("be.visible");

    cy.get(`[data-cy='available_seats_number_flight_${flightNum}']`)
      .invoke("attr", "seats")
      .should("equal", "2");
  });
});
