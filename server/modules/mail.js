'use strict';

// Import the module for creating a mail transporter
const nodemailer = require('nodemailer');


  exports.sendConfirmationMail = async (email, verificationCode) => {
    
    const smtpTransport= nodemailer.createTransport({
        service: 'outlook',
        requireTLS: true,
        port: 465,
        auth: {
          user: 'team1se2@outlook.it',
          pass: 'Password0.1'
        }
      });
      //const userId = email.split('@')[0];
      const mail = {
        from: `team1se2@outlook.it`,
        to: email,
        subject: "Confirmation link",
        text: "Team1 Tracker. Thanks for the registration! Click the link below to complete the registration process, http://localhost:3000/verify?id=${userId}&token=${verificationCode}", // plain text body
        html: `
              <div style="color: #001829; padding: 30px">
              <h1 style="color: #003052;">Team1 Tracker</h1>
          
              <p>Thanks for the registration! Click the following link to complete the registration process,
          
              <a href="http://localhost:3000/verify?Id=${email}&code=${verificationCode}">click!</a></p>
              </div>`,
      };
    
      smtpTransport.sendMail(mail, (err) => {
        if(err){
          console.log(err);
          return { status: 500,
            text: err
          };   
        }else{
          console.log('mail sent');
          return { status: 200,
               text: "mail sent"
          };  
        }
      });
    }