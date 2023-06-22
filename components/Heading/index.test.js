import Heading from ".";
import { render, screen } from "@testing-library/react";

test("test", () => {
  render(hello);
  const element = screen.getByText("hello");
  expect(element).toBeInTheDocument();
});
