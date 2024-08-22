import { fireEvent, getByRole, render, screen } from "@testing-library/react";
import { Navbar } from "../../ui";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth";

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate
}));

beforeEach(() => jest.clearAllMocks());

describe("Pruebas en <NavBar />", () => {

  const contextValue = {
    logged: true,
    user: {
      id: "abc",
      name: "Martin Fort",
    },
    logout: jest.fn(),
  };


  test("debe de mostrar el nombre del usuario", () => {
    render(
      <MemoryRouter>
        <AuthContext.Provider value={contextValue}>
          <Navbar />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText("Martin Fort")).toBeTruthy();
  });

  test("debe de llamar el logout y navigate cuando se hace click en el botón", () => {

      
      render(
        <MemoryRouter>
            <AuthContext.Provider value={contextValue}>
                <Navbar />
            </AuthContext.Provider>
        </MemoryRouter>
    );
    
    const logoutBtn = screen.getByRole('button');
    fireEvent.click( logoutBtn );

    expect( contextValue.logout ).toHaveBeenCalled();
    expect( mockedUseNavigate ).toHaveBeenCalledWith('/login', {"replace": true});

  });
});
