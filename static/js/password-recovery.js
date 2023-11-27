import {authenticationSubmit, displaySuccessMessages, displayServerErrorMessages, backendDomain} from './module.js'

const forgotPasswordForm = document.querySelector('#recovery-email-form');

authenticationSubmit(forgotPasswordForm, fetchPasswordRecovery);

// Calling backend API for sign in
async function fetchPasswordRecovery(emailData) {
    let apiUrl = `${backendDomain}/api/auth/password-reset-request`;
  
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify(emailData)
      });
      if(!response.ok ||response.ok){
        displaySuccessMessages('recovery-email-form', `Recovery email has sent to you (${emailData.email}).`);
        location.href = './password-recovery-verification.html';
      }
    } catch (error) {
      console.error("Error fetching JSON data (password recovery):", error);
    }
}