import React from 'react';
import { Modal } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { loadDataIfNeeded } from '../Utils/loadDataIfNeeded.utils';
import { UserContext } from '../Contexts/UserContext';
import MailchimpSignupForm from './MailchimpSignupForm';

export default class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      footer: {},
    }
  }

  componentDidMount() {
		loadDataIfNeeded(this, '/once/footer',  { lang: this.context.lang }, 'footer');
  }

  handleShow = () => {
    this.setState({ show: true });
  }

  handleClose = () => {
    this.setState({ show: false });
  }
  
  render() {
    const { footer, show } = this.state;
    
    return (
      <footer id="Footer">
        <Modal
          dialogClassName="mailchimp-modal"
          show={show}
          onHide={this.handleClose}
          animation={false}
          size="xl"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Body>
            <button className="modal-close" onClick={this.handleClose}></button>
            <MailchimpSignupForm context={this.context} />
          </Modal.Body>
        </Modal>
        {this.props.location.pathname.includes('/admin') || this.props.location.pathname === '/' ? null :
          <div className="w3-row">
            <div className="footer w3-col l3">
              <h3>Contact</h3>
              <a onMouseDown={this.props.changeColor} onMouseUp={this.props.resetColor} href={"mailto:" + footer.mail_address}>
                {footer['mail_label_'+this.context.lang]}
              </a>
              <a onMouseDown={this.props.changeColor} onMouseUp={this.props.resetColor} href={footer.instagram_link} target="_blank" rel="noopener noreferrer">
                {footer['instagram_label_'+this.context.lang]}
              </a>
              <button onMouseDown={this.props.changeColor} onMouseUp={this.props.resetColor} onClick={this.handleShow} id="Newsletter" className="">
                {footer['newsletter_label_'+this.context.lang]}
              </button>
            </div>
            {this.props.location.pathname === '/about' ?
              <div className="credits w3-col l3">
                <h3>Website</h3>
                <p>{this.context.lang === 'fr' ? 'Designé par' : 'Designed by'} Thélonious Goupil</p>
                <p>{this.context.lang === 'fr' ? 'Développé par' : 'Developped by'} Lorenzo Armandin & Baptiste André</p>
                <Link onMouseDown={this.props.changeColor} onMouseUp={this.props.resetColor} to="/legalnotices"><u>{this.context.lang === 'fr' ? 'Mentions légales' : 'Legal notices'}</u>↗</Link>
              </div>
            : null}
          </div>
        }
      </footer>
    )
  }
}

Footer.contextType = UserContext;