// import Heading from ".";
// import { render, screen } from "@testing-library/react";

// test("test", () => {
//   render(<Heading>🐬</Heading>);
//   const element = screen.getByText("🐬");
//   expect(element).toBeInTheDocument();
// });
test("test", () => {
  render(<Heading>Marvelous Cinematic Unisearch</Heading>);
  const element = screen.getByText("Marvelous Cinematic Unisearch");
  expect(element).toBeInTheDocument();
});
