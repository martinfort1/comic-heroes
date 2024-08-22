import { render, screen } from "@testing-library/react";
import { AuthContext } from "../../../auth";
import { MemoryRouter } from "react-router-dom";
import { AppRouter } from "../../../router/AppRouter";


describe('Pruebas en <AppRouter />', () => { 
    
    test('debe de mostrar el login si no está autenticado', () => { 
        
        const contextValue = {
            logged: false
        };

        render(
            <MemoryRouter initialEntries={['/marvel']}>
                <AuthContext.Provider value={ contextValue }>
                    <AppRouter />
                </AuthContext.Provider>
            </MemoryRouter>
        );

        expect( screen.getAllByText('Login').length ).toBe(2);
    
     });

     test('debe de mostrar el componente de Marvel si está autenticado', () => { 
        
        const contextValue = {
            logged: true,
            user: {
                id: 'abc',
                name:'Martin Fort'
            }
        };

        render(
            <MemoryRouter initialEntries={['/marvel']}>
                <AuthContext.Provider value={ contextValue }>
                    <AppRouter />
                </AuthContext.Provider>
            </MemoryRouter>
        )

        expect( screen.getByText('Marvel Comics') ).toBeTruthy();
        expect( screen.getByText('Martin Fort') ).toBeTruthy();
      });



 });