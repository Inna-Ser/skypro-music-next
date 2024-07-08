import { render, screen } from "@testing-library/react";
import { MenuItem } from "./Menu";
import "@testing-library/jest-dom"; // Импортируем для использования метода toBeInTheDocument

describe("MenuItem component", () => {
  it("должна рендериться ссылка 'Выйти'", () => {
    const onClick = jest.fn();

    render(
      <MenuItem
        link="/signin"
        title="Выйти"
        isActive={true}
        onClick={onClick}
      />
    );
    const signinLink = screen.getByText(/Выйти/i);
    expect(signinLink).toBeInTheDocument();
  });
  it("кнопка должна иметь класс Active", () => {
    const onClick = jest.fn();

    render(
      <MenuItem
        link="/signin"
        title="Выйти"
        isActive={true}
        onClick={onClick}
      />
    );
    const signinLink = screen.getByText(/Выйти/i);
    expect(signinLink).toHaveClass("active");
  });
});
