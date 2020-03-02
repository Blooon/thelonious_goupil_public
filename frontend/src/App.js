import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { UserContext } from './Contexts/UserContext';
import { loadDataIfNeeded } from './Utils/loadDataIfNeeded.utils';
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';
import Admin from './Admin/Admin';
import Cookies from './Routes/Components/Cookies';
import Home from './Routes/Home';
import Exhibitions from './Routes/Exhibitions';
import CollectionsTypologie from './Routes/CollectionsTypologie';
import About from './Routes/About';
import LegalNotices from './Routes/LegalNotices';
import NoMatch from './Routes/NoMatch';

import './static/stylesheet.css';
import './static/w3.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lang: 'en',
      user: {},
      changeState: this.changeState,
      changeLang: this.changeLang,
      error: null,
      colors: [],
    }
  }

	componentDidMount() {
    loadDataIfNeeded(this, '/colors',  { lang: this.context.lang }, 'colors');
  }
  
  getRandomColor = () => {
    return this.state.colors[Math.floor(Math.random() * Math.floor(this.state.colors.length-1))].value;
  }

  changeLang = () => {
    this.setState({ lang: (this.state.lang === 'fr') ? 'en' : 'fr' });
  }

  changeState = (newParams) => {
    this.setState(newParams);
  }

	changeColor = event => {
    const color = this.getRandomColor();
    const link = event.currentTarget;
    const linkText = link.getElementsByTagName('u')[0];
    if (linkText) {
      linkText.style.borderBottomColor = color;
    }
    link.classList.add('no-opacity');
    link.style.color = color;
	}

	resetColor = event => {
    const link = event.currentTarget;
    const linkText = link.getElementsByTagName('u')[0];
    if (linkText) {
      linkText.style.borderBottomColor = 'black';
    }
    event.currentTarget.classList.remove('no-opacity');
    event.currentTarget.style.color = 'black';
	}

  render() {
    
    return (
      <UserContext.Provider value={this.state}>
        <Router>
          <Route path="/" render={props => 
            <Navbar
              changeColor={this.changeColor}
              resetColor={this.resetColor}
              changeLang={this.changeLang}
              lang={this.state.lang}
              {...props}
            />
          }/>

          <Switch>
            <Route exact path={["/", "/projects"]} render={props => <Home {...props} />} />
            <Route exact path="/exhibitions" render={props =>
              <Exhibitions
                changeColor={this.changeColor}
                resetColor={this.resetColor}
                {...props}
              />
            }/>
            <Route exact path="/collections_typologie" render={props =>
              <CollectionsTypologie
                changeColor={this.changeColor}
                resetColor={this.resetColor}
                {...props}
              />
            }/>
            <Route path="/about" render={props =>
              <About
                changeColor={this.changeColor}
                resetColor={this.resetColor}
                {...props}
              />
            }/>
            <Route exact path="/legalnotices" render={props =>
              <LegalNotices
                changeColor={this.changeColor}
                resetColor={this.resetColor}
                {...props}
              />
            }/>
            <Route path="/admin" render={props =>
              <Admin
                changeColor={this.changeColor}
                resetColor={this.resetColor}
                {...props}
              />
            }/>

            <Route path="*" render={props =>
              <NoMatch
                changeColor={this.changeColor}
                resetColor={this.resetColor}
                changeLang={this.changeLang}
                lang={this.state.lang}
                {...props}
              />
            }/>
          </Switch>

          <Route path="/" render={props =>
            <Footer
              changeColor={this.changeColor}
              resetColor={this.resetColor}
              {...props}
            />
          }/>
          <Route path="/" render={props => 
            <Cookies
              changeColor={this.changeColor}
              resetColor={this.resetColor}
              changeLang={this.changeLang}
              lang={this.state.lang}
              {...props}
            />
          }/>
        </Router>
      </UserContext.Provider>
    )
  }
};

export default App;
