import React from 'react';
import jsonp from 'jsonp';
import queryString from 'query-string';

class MailchimpSignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      LNAME: '',
      FNAME: '',
      EMAIL: '',
      result: '',
    }
  }

  onChange = event => {
		this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit = async event => {
		event.preventDefault();
    const formData = {
      LNAME: this.state.LNAME,
      FNAME: this.state.FNAME,
      EMAIL: this.state.EMAIL,
    }

    jsonp(`https://theloniousgoupil.us20.list-manage.com/subscribe/post-json?u=871c840eaeb573acad1e965b5&id=ab3090c483&${queryString.stringify(formData)}`, { param: 'c' }, (err, data) => {
      this.setState({ result: data.msg });
      setTimeout(() => this.setState({ result: '' }), 3000);
    });
  }

  render() {
    const { lang } = this.props.context;
    let value = "Ok";
    if (this.state.result && this.state.result !== '') value = this.state.result;
    return (
      <div id="mc_embed_signup">
        <form onSubmit={this.onSubmit} id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" noValidate>
        {/* <form action="https://theloniousgoupil.us20.list-manage.com/subscribe/post-json?u=871c840eaeb573acad1e965b5&amp;id=ab3090c483&amp;c=?" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" noValidate> */}
          <div id="mc_embed_signup_scroll">
            <div className="mc-field-group w3-row">
              <input value={this.state.LNAME} onChange={this.onChange} className="w3-rest" placeholder={lang === 'fr' ? 'Nom' : 'Last Name'} type="text" name="LNAME" id="mce-LNAME" />
            </div>
            <div className="mc-field-group w3-row">
              <input value={this.state.FNAME} onChange={this.onChange} className="w3-rest" placeholder={lang === 'fr' ? 'Prénom' : 'First Name'} type="text" name="FNAME" id="mce-FNAME" />
            </div>
            <div className="mc-field-group w3-row">
              <input value={this.state.EMAIL} onChange={this.onChange} className="required email w3-rest" placeholder={lang === 'fr' ? 'Email' : 'Email Address'} type="email" name="EMAIL" id="mce-EMAIL" />
            </div>
            <div id="mce-responses" className="clear">
              <div className="response" id="mce-error-response" style={{display: "none"}}></div>
              <div className="response" id="mce-success-response" style={{display: "none"}}></div>
            </div>    
              {/* <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups--> */}
            <div style={{position: 'absolute', left: '-5000px'}} aria-hidden="true">
              <input type="text" name="b_871c840eaeb573acad1e965b5_ab3090c483" tabIndex="-1" />
            </div>
            <div className="button clear">
              <input type="submit" value={value} name="subscribe" id="mc-embedded-subscribe" />
            </div>
          </div>
        </form>
      </div>
    )
  }
};

export default MailchimpSignupForm;