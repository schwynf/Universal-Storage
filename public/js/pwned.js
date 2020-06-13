const pwnedAPI = {
  submitPass: async () => {
    const passText = pwnedPassword.val().trim();
    pwnedAPI.getPwnedPass(passText);
    pwnedPassword.val("");
  },
  submitEmail: async( )=> {
    const emailText = pwnedEmail.val().trim();
    pwnedAPI.getPwnedEmail(emailText);
    pwnedEmail.val("")
  },
  getPwnedEmail: async (email) => {
    const data = await $.get("/api/pwned/email/" + email);
    console.log(data);
  },
  getPwnedPass: async (password) => {
    const data = await $.get("/api/pwned/password/" + password);
    console.log(data)
 }

};
