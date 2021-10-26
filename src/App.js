import './App.css';
import { Switch, Route } from 'react-router-dom';
import { Home, Dashboard, Seller, Browse, History } from './pages'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path='/' exact={ true } component={ Home }/>
        <Route path='/Dashboard' exact={ true } component={ Dashboard }/>
        <Route path='/Seller' exact={ true } component={ Seller }/>
        <Route path='/Browse' exact={ true } component={ Browse }/>
        <Route path='/History' exact={ true } component={ History }/>
      </Switch>
    </div>
  );
}

export default App;
