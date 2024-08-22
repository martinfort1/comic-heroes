import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { HeroPage } from "../../../heroes/pages/HeroPage";

const mockUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),

  useNavigate: () => mockUseNavigate,
}));


describe("tests HeroPage", () => {
  beforeEach(() => jest.clearAllMocks());

  test("debe de mostrar la página de marvel si no se encuentra el heroe", () => {
    const id_erroneo = "dr-doom";

    render(
      <MemoryRouter initialEntries={[`/hero/${id_erroneo}`]}>
        <Routes>
          <Route path="/hero/:id" element={<HeroPage />} />

          {/* Definir la ruta de /marvel porque se navega a ella desde el componente, si no se hace renderiza la pagina de /hero en un bucle */}
          <Route path="/marvel" element={<h1>This is a Marvel page !</h1>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("This is a Marvel page !")).toBeTruthy();

    // screen.debug()
  });

  test("debe de mostrar la pagina del heroe si existe", () => {
    const heroeId = "dc-arrow";

    render(
      <MemoryRouter initialEntries={[`/hero/${heroeId}`]}>
        <Routes>
          <Route path="/hero/:id" element={<HeroPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Green Arrow")).toBeTruthy();

    // screen.debug()
  });

  test("debe de volver a la página anterior cuando se regresa con el botón", () => {
    const heroId = "dc-black";

    render(
      <MemoryRouter initialEntries={[`/hero/${heroId}`]}>
        <Routes>
          <Route path="/hero/:id" element={<HeroPage />} />
        </Routes>
      </MemoryRouter>
    );

    const backBtn = screen.getByRole("button");

    fireEvent.click(backBtn);

    expect(mockUseNavigate).toHaveBeenCalled();

    expect(mockUseNavigate).toHaveBeenCalledWith(-1);
  });

  test("debe de coincidir con el SnapShot", () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/hero/dc-arrow"]}>
        <Routes>
          <Route path="/hero/:id" element={<HeroPage />} />
        </Routes>
      </MemoryRouter>
    );
    expect(container).toMatchSnapshot();
  });
});
