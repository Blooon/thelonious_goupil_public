import React from 'react';
import { UserContext } from '../Contexts/UserContext';
import { loadDataIfNeeded } from '../Utils/loadDataIfNeeded.utils';
import FixedSidebar from './FixedSidebar';
import CollapsingTopbar from './CollapsingTopbar';

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: {
        name: '',
        occupation: '',	
      },
      navbar: {},
      responsive: !(Math.max(document.documentElement.clientWidth, window.innerWidth || 0) > 992),
    }
  }

  componentDidMount () {
    loadDataIfNeeded(this, '/once/title',  { lang: this.context.lang }, 'title');
    loadDataIfNeeded(this, '/once/navbar',  { lang: this.context.lang }, 'navbar');
  }

  handleResponsive = () => {
    if (Math.max(document.documentElement.clientWidth, window.innerWidth || 0) > 992) {
      this.setState({ responsive: true })
    }
  }

  render() {
    const { title, navbar, responsive } = this.state;

    return (
      !responsive
      ? <FixedSidebar
          title={title} 
          navbar={navbar}
          context={this.context}
          changeColor={this.props.changeColor}
          resetColor={this.props.resetColor}
          changeLang={this.props.changeLang}
          {...this.props}
        />
      : <CollapsingTopbar 
          title={title}
          navbar={navbar}
          context={this.context}
          changeColor={this.props.changeColor}
          resetColor={this.props.resetColor}
          changeLang={this.props.changeLang}
          {...this.props}
        />
    )
  }
}

Navbar.contextType = UserContext;