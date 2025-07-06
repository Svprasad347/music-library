import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Login from "../Authorization/Login.jsx";

describe("Login Component", () => {
  it("renders login form", () => {
    render(<Login onLogin={() => {}} />);
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Role/i)).toBeInTheDocument();
  });
it("displays the app name BeatBoxx", () => {
  render(<Login onLogin={() => {}} />);
  expect(screen.getByText(/BeatBoxx/i)).toBeInTheDocument();
});
it("display placeholder",()=>{
    render(<Login onLogin={()=>{}}/>);
    expect(screen.getByPlaceholderText(/Your name/i)).toBeInTheDocument();
})
  it("submits with entered data", () => {
    const mockLogin = jest.fn();
    render(<Login onLogin={mockLogin} />);

    fireEvent.change(screen.getByLabelText(/Username/i), {
      target: { value: "varaprasad" },
    });
    fireEvent.change(screen.getByLabelText(/Role/i), {
      target: { value: "admin" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(mockLogin).toHaveBeenCalled();
    expect(mockLogin.mock.calls[0][0].username).toBe("varaprasad");
    expect(mockLogin.mock.calls[0][0].role).toBe("admin");
  });
});
