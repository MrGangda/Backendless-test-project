import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';

const App = () => {
    const [tabs, setTabs] = useState([]);
    const location = useLocation();

    useEffect(() => {
        fetch("/tabs.json")
            .then(response => response.json())
            .then(data => setTabs(data.sort((a, b) => a.order - b.order)));
    }, []);

    return (
        <div className="container">
            <div className="tabs-header">
                {tabs.map(tab => (
                    <Link
                        key={tab.id}
                        to={`/${tab.id}`}
                        className={location.pathname === `/${tab.id}` ? 'active' : ''}
                    >
                        {tab.title}
                    </Link>
                ))}
            </div>

            <div className="tabs-content">
                <Routes>
                    {tabs.map(tab => {
                        const LazyComponent = React.lazy(() => import(`./pages/tabs/${tab.path.split('/').pop()}`));
                        return (
                            <Route key={tab.id} path={`/${tab.id}`} element={
                                <React.Suspense fallback={<div>Loading...</div>}>
                                    <LazyComponent />
                                </React.Suspense>
                            } />
                        );
                    })}
                </Routes>
            </div>
        </div>
    );
}

export default App;
