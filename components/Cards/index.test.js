// import SubHeading from ".";
// import { render, screen } from "@testing-library/react";

// test("renders 'We dolphinitely love coding!' as text content for the SubHeading component", () => {
//   render(<SubHeading>We dolphinitely love coding!</SubHeading>);
//   const element = screen.getByText("We dolphinitely love coding!");
//   expect(element).toBeInTheDocument();
// });
test("test", () => {
  render(<Heading>Marvelous Cinematic Unisearch</Heading>);
  const element = screen.getByText("Marvelous Cinematic Unisearch");
  expect(element).toBeInTheDocument();
});
