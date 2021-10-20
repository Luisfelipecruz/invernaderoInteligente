import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Calculadora from './components/Calculadora';
import Sidebar from './components/Sidebar';
import {  GraficaLinealPage, GraficaTortaPage, GraficaHistogramaPage } from './pages/GraficasPage';
import { Geodata } from './pages/Geodata';
import LandingPage from './components/LandingPage';
import UseDatabaseEntry from "./components/UseDatabaseEntry";
import LinealHumedadTierra from "./components/LinealHumedadTierra";
import LinealHumedadAire from "./components/LinealHumedadAire";
import TableComponent from "./components/tableComponent";
import LinealTemperatura from "./components/LinealTemperatura";
import LinealCompleta from "./components/LinealCompleta";

function App() {
    return (
        <>
            <Router>
                <Sidebar/>
                <Switch>
                    <Route path="/calculadora" exact component={Calculadora}/>
                    <Route path="/data" exact component={TableComponent}/>
                    <Route path='/data/completa' exact component={LinealCompleta} />
                    <Route path='/data/humaire' exact component={LinealHumedadAire} />
                    <Route path='/data/humtierra' exact component={LinealHumedadTierra} />
                    <Route path='/data/temperatura' exact component={LinealTemperatura} />
                    <Route path='/geodata' exact component={Geodata} />
                    <Route exact path="/" exact component={LandingPage}/>
                    <Route exact path="/Talleres_Desarrollo_web" exact component={LandingPage}/>
                </Switch>
            </Router>
        </>
    );
}

export default App;
