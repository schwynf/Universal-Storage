const pwnedAPI = {
  submitPass: async () => {
    const passText = pwnedPassword.val().trim();
    if (passText === "Please enter a valid password" || passText === "") {
      pwnedPassword.val("Please enter a valid password")
      pwnedPassword.addClass("invalid")
    }
    else {
      console.log("no")
      pwnedAPI.getPwnedPass(passText);
      pwnedPassword.val("");
    }
  },
  submitEmail: async () => {
    const emailText = pwnedEmail.val().trim();
    if (validateEmail(emailText)) {
      pwnedAPI.getPwnedEmail(emailText);
      pwnedEmail.val("")
    }
    else {
      pwnedEmail.val("Please enter a valid email");
      pwnedEmail.addClass("invalid")
      return
    }
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
