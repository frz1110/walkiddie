import { render as rtlRender } from '@testing-library/react';
import { BrowserRouter, MemoryRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import LaporanDetail from './LaporanDetail';
import userEvent from '@testing-library/user-event';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

function render(
    ui,
    {
      initialState = {
        auth: {
            isAuthenticated: true,
            user: {role: "Operator"}
        }
      },
      store = createStore(state => state, initialState),
      ...renderOptions
    } = {},
  ) {
    function Wrapper({ children }) {
      return <Provider store={store}><MemoryRouter initialEntries={["/laporan/1"]}>{children}</MemoryRouter></Provider>
    }
    return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

const mockMatch = {
    params : {
        pk : 1
    }
}

const detailData = [
    {
        pk: 1,
        namaMainan: "Komidi Putar",
        namaToko: "Fun Werld",
        lokasiToko: "Jl. Akhnreias Mrhine",
        nomorTelepon: "1234567890",
        status: "NAS",
        deskripsi: "mainan rusak",
        fotoKerusakan: ""
    }
];

const detailAssignedData = [
    {
        pk: 1,
        namaMainan: "Komidi Putar",
        namaToko: "Fun Werld",
        lokasiToko: "Jl. Akhnreias Mrhine",
        nomorTelepon: "1234567890",
        status: "ASG",
        deskripsi: "mainan rusak",
        fotoKerusakan: ""
    }
];

const configGet = {
    headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `JWT ${localStorage.getItem('access')}`,
    }
};

const configPut = {
    headers: {
        'Authorization': `JWT ${localStorage.getItem('access')}`,
    }
};

describe('<Laporan Detail />', () => {
    it('should contains back button', () => {
        const { getAllByTestId } = render(<LaporanDetail match={mockMatch} />);
        expect(getAllByTestId("back")).not.toHaveLength(0);
    })
    
    it('should redirect to login page if not authenticated', () => {
        let testLoc;
        render(
            <MemoryRouter initialEntries={["/laporan/1"]}>
                <LaporanDetail match={mockMatch} />
                <Route
                    path="*"
                    render={({ location }) => {
                    testLoc = location;
                    return null;
                    }}
                />
            </MemoryRouter>,
            {initialState: {auth: {isAuthenticated: false}}}
        );
        
        expect(testLoc.pathname).toBe("/masuk");
    })

    it('should redirect to / if not operator', () => {
        let testLoc;
        render(
            <MemoryRouter initialEntries={["/laporan/1"]}>
                <LaporanDetail match={mockMatch} />
                <Route
                    path="*"
                    render={({ location }) => {
                    testLoc = location;
                    return null;
                    }}
                />
            </MemoryRouter>,
            {initialState: {auth: {isAuthenticated: true,user: {
                role: "Mitra"
            }}}}
        );
        
        expect(testLoc.pathname).toBe("/");
    })

    it('renders the right contents', () => {
        const mockUser = jest.fn();
        const mockAuthenticate = jest.fn();
        const initialState = { auth: {
            isAuthenticated: true,
            user: {
                role: "Operator"
                }
            }
        };
        localStorage.setItem('access', 'token');
        const store = mockStore(initialState);

        var mock = new MockAdapter(axios);
        mock.onGet(`${process.env.REACT_APP_BACKEND_API_URL}/api/laporan/1/detail/`, configGet).reply(200, detailData);
        const { getByText } = rtlRender(
            <Provider store={store}>
                <BrowserRouter>
                    <LaporanDetail isAuthenticated={mockAuthenticate} user={mockUser}/>
                </BrowserRouter>
            </Provider>);

        expect(getByText(/Nama Permainan/)).toBeInTheDocument();
        expect(getByText(/Nama Toko/)).toBeInTheDocument();
        expect(getByText(/Alamat/)).toBeInTheDocument();
        expect(getByText(/Kontak Pemilik Toko/)).toBeInTheDocument();
        expect(getByText(/Deskripsi Kerusakan/)).toBeInTheDocument();
    });

//    Postponed until I can find a way to pass laporan.status to the mock page for testing buttons. Coverage will increase dramatically when these work.
//    
//    it('should contains Button components', () => {
//        const { getAllByTestId } = render(<LaporanDetail match={mockMatch} />);
//        expect(getAllByTestId("m-i-buat-0")).not.toHaveLength(0);
//        expect(getAllByTestId("m-i-buat-1")).not.toHaveLength(0);
//        expect(getAllByTestId("m-i-buat-2")).not.toHaveLength(0);
//    })
//
//    test('back button work correctly', () => {
//        let testLoc;
//        const { getByTestId } = render(
//            <MemoryRouter initialEntries={["/laporan/1"]}>
//                <LaporanDetail match={mockMatch} />
//                <Route
//                    path="*"
//                    render={({ location }) => {
//                    testLoc = location;
//                    return null;
//                    }}
//                />
//            </MemoryRouter>,
//            {initialState: {auth: {isAuthenticated: true,user: {
//                role: "Operator"
//            }}}}
//        );
//            
//        const backButton = getByTestId('back');
//        userEvent.click(backButton);
//        expect(testLoc.pathname).toBe("/operator");
//    });

//    test('handleAssign works correctly', () => {
//        let testLoc;
//        localStorage.setItem('access', 'token');
//
//        var mock = new MockAdapter(axios);
//        mock.onGet(`${process.env.REACT_APP_BACKEND_API_URL}/api/laporan/1/detail/`, configGet).reply(200, detailData);
//        const { getByTestId } = render(
//            <MemoryRouter initialEntries={["/laporan/1"]}>
//                <LaporanDetail match={mockMatch} />
//                <Route
//                    path="*"
//                    render={({ location }) => {
//                    testLoc = location;
//                    return null;
//                    }}
//                />
//            </MemoryRouter>,
//            {initialState: {auth: {isAuthenticated: true,user: {
//                role: "Operator"
//            }}}}
//        );
//            
//      const button = getByTestId('m-i-buat');
//      userEvent.click(button);
//      mock.onPatch(`${process.env.REACT_APP_BACKEND_API_URL}/api/laporan/1/assign/`, {}, configPut);
//      expect(testLoc.pathname).toBe("/operator");
//    });
//
//    test('handleRefuse works correctly', () => {
//        let testLoc;
//        localStorage.setItem('access', 'token');
//
//        var mock = new MockAdapter(axios);
//        mock.onGet(`${process.env.REACT_APP_BACKEND_API_URL}/api/laporan/1/detail/`, configGet).reply(200, detailAssignedData);
//        const { getByTestId } = render(
//            <MemoryRouter initialEntries={["/laporan/1"]}>
//                <LaporanDetail match={mockMatch} />
//                <Route
//                    path="*"
//                    render={({ location }) => {
//                    testLoc = location;
//                    return null;
//                    }}
//                />
//            </MemoryRouter>,
//            {initialState: {auth: {isAuthenticated: true,user: {
//                role: "Operator"
//            }}}}
//        );
//            
//      const button = getByTestId('m-i-buat-1');
//      userEvent.click(button);
//      mock.onPatch(`${process.env.REACT_APP_BACKEND_API_URL}/api/laporan/1/unassign/`, {}, configPut);
//      expect(testLoc.pathname).toBe("/operator");
//    });
//
//    test('handleResolve works correctly', () => {
//        let testLoc;
//        localStorage.setItem('access', 'token');
//
//        var mock = new MockAdapter(axios);
//        mock.onGet(`${process.env.REACT_APP_BACKEND_API_URL}/api/laporan/1/detail/`, configGet).reply(200, detailAssignedData);
//        const { getByTestId } = render(
//            <MemoryRouter initialEntries={["/laporan/1"]}>
//                <LaporanDetail match={mockMatch} />
//                <Route
//                    path="*"
//                    render={({ location }) => {
//                    testLoc = location;
//                    return null;
//                    }}
//                />
//            </MemoryRouter>,
//            {initialState: {auth: {isAuthenticated: true,user: {
//                role: "Operator"
//            }}}}
//        );
//            
//      const button = getByTestId('m-i-buat-2');
//      userEvent.click(button);
//      mock.onPatch(`${process.env.REACT_APP_BACKEND_API_URL}/api/laporan/1/resolve/`, {}, configPut);
//      expect(testLoc.pathname).toBe("/operator");
//    });
})