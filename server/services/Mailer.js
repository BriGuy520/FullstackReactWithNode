const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

class Mailer extends helper.Mail {
  constructor({ subject, recipients }, content){
    super();

    this.sgApi = sendgrid(keys.sendGridKey);
    this.from_email = new helper.Email('no-reply@emaily.com');
    this.subject = subject;
    this.body = new helper.Content('text/html', content);
    this.recipients = this.formatAddresses(recipients);

    // addContent is a built in function. No need to create our own helper
    // function.
    this.addContent(this.body);
    this.addClickTracking();
    this.addRecipients();
  }

  formatAddresses(recipients){
    return recipients.map(({ email }) => {
      return new helper.Email(email);
    });
  }

  // This has a lot of things going on. Read sendgrip docs for more info.
  addClickTracking(){
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }


  // define personalize, iterate over the recipients, forEach recipient 
  // add them to the personalize object. Then call addPersonaliztion function
  // which is provided by the mailer base class. 
  addRecipients(){
    const personalize = new helper.Personalization();

    this.recipients.forEach(recipient => {
      personalize.addTo(recipient);
    });
    
    this.addPersonalization(personalize);
  }

  // send this off to sendgrip api
  async send(){
    const request = this.sgApi.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: this.toJSON()
    });

   const response = await this.sgApi.API(request);
   return response;
  }
}

module.exports = Mailer;