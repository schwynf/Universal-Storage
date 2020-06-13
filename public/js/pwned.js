const pwnedAPI = {
  submitPass: async () => {
    const passText = pwnedPassword.val().trim()
    pwnedAPI.getPwnedPass(passText)    ;
    pwnedPassword.val("")
  },
  getPwnedPass: async (password) => {
    const data = await $.get("/api/pwned/" + password);
    console.log(data)
 }

};
