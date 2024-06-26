const Router = ReactRouterDOM.HashRouter
const { Route, Routes } = ReactRouterDOM
const { Provider } = ReactRedux


import { AppHeader } from './cmps/AppHeader.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'
import { TodoDetails } from './pages/TodoDetails.jsx'
import { UserProfile } from './pages/UserProfile.jsx'

import { HomePage } from './pages/HomePage.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { TodoIndex } from './pages/TodoIndex.jsx'
import { store } from './store/store.js'


export class App extends React.Component {

    render() {
        return (
            <Provider store={store}>
                <Router>
                    <section className="app">
                        <AppHeader />
                        <main className='main-layout'>
                            <Routes>
                                <Route element={<HomePage />} path="/" />
                                <Route element={<AboutUs />} path="/about" />
                                <Route element={<TodoIndex />} path="/todo" />
                                <Route element={<TodoDetails />} path={'/todo/:id'} />
                                <Route element={<UserProfile />} path={'/user'} />
                            </Routes>
                        </main>
                        <AppFooter />
                    </section>
                </Router>
            </Provider>

        )
    }
}


