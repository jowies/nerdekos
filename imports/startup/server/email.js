import { Accounts } from 'meteor/accounts-base';

Accounts.emailTemplates.from = 'Nerdekos <no-reply@nerdekos.no>';
Accounts.config({
  sendVerificationEmail: true,
});

Accounts.emailTemplates.enrollAccount.text = (user, url) => {
  return 'Kjære ' + user.username + ',\n\n' + 'Takk for at du har meldt deg til å være administrator! \n' + 'Vennligst klikk linken under for å sette passord og begynne. \n\n' + url + '\n\n' + 'Med vennlig hilsen,\n' + 'Jowie';
};
