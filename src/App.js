import './App.css';
import Header from './Components/Header/Header';
import LetMeIn from './Components/LetMeIn/LetMeIn';
import Main from './Components/Main/Main';
import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Info from './Components/Info/Info';
import JogForm from './Components/Jog/JogForm';
import NothingFound from './Components/NothingFound/NothingFound';
import PrivateRoute from './Components/PrivateRoute';

function App() {
  return (
    <div className="App">
      <ToastContainer />
       <Header />
        <Switch>
            <Route path="/sign-in" component={LetMeIn} />
            <PrivateRoute path="/info" component={Info} />
            <PrivateRoute exact path="/jog-form" component={JogForm} />
            <Route exact path="/" component={Main} />
            <Route path="*" component={NothingFound} />
        </Switch>
    </div>
  );
}

export default App;
