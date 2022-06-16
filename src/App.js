import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Logging } from './components/Logging';
import Home from './components/Home'

import PrivateRoute from './components/PrivateRoute'

function App() {

  return (
    <div className="App">
      <Router>
        <Route exact path="/login" component={Logging} />
        <PrivateRoute exact path="/" component={Home} />
      </Router>
    </div >
  );
}

export default App;
