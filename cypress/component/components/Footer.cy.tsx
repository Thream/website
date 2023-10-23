import { Footer } from "../../../components/Footer"

describe("<Footer />", () => {
  it("should render with appropriate link tag version", () => {
    const version = "1.0.0"
    cy.mount(<Footer version={version} />)
    cy.contains("Thream")
      .get("[data-cy=version-link-website]")
      .should("have.text", `website v${version}`)
      .should(
        "have.attr",
        "href",
        `https://github.com/Thream/website/releases/tag/v${version}`,
      )
  })
})
