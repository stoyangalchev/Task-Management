import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Task Management header", () => {
  render(<App />);
  const headerElement = screen.getByRole("banner"); 
  expect(headerElement).toHaveTextContent(/Task Management/i);
});
