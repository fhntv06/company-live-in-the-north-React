import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import moment from 'moment';
import routes from './routes';
import Header from './components/Header/Header';
import PageFooter from './components/PageFooter/PageFooter';
// import BackgroundFigure from './components/BackgroundFigure/BackgroundFigure';
import 'moment/locale/ru';
import './App.scss';
import ScrollToTop from './helpers/ScrollToTop';
import MainPreloader from './components/MainPreloader/MainPreloader';

moment().locale('ru');

const createRoute = (data) => (
  data.map((route, index) => {
    const Element = route.element;
    return (
      <Route
        // eslint-disable-next-line react/no-array-index-key
        key={`${route.path}-${index}`}
        path={route.path}
        index={route.index ?? false}
        element={<Element />}
      >
        {route.children ? createRoute(route.children) : null}
      </Route>
    );
  })
);

const App = () => (
  <Suspense
    fallback={<MainPreloader />}
  >
    <Router>
      <Header
        needBasket
      />
      {/* <BackgroundFigure /> */}
      <ScrollToTop />
      <Routes>
        {createRoute(routes)}
      </Routes>
      <PageFooter />
    </Router>
  </Suspense>
);

export default App;
