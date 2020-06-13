const pwnedAPI = {
  submitPass: async () => {
    const passText = pwnedPassword.val().trim();
    if (passText === "Please enter a valid password" || passText === "") {
      pwnedPassword.val("Please enter a valid password");
      pwnedPassword.addClass("invalid");
    }
    else {
      // console.log("no");
      pwnedAPI.getPwnedPass(passText);
      pwnedPassword.val("");
    }
  },
  submitEmail: async () => {
    const emailText = pwnedEmail.val().trim();
    if (validateEmail(emailText)) {
      pwnedAPI.getPwnedEmail(emailText);
      pwnedEmail.val("");
    }
    else {
      pwnedEmail.val("Please enter a valid email");
      pwnedEmail.addClass("invalid");
      return;
    }
  },
  getPwnedEmail: async (email) => {
    const data = await $.get("/api/pwned/email/" + email);
    // console.log(data);
  },
  getPwnedPass: async (password) => {
    //spinner installed
    let eleI = $("<i>");
    eleI.addClass("fa fa-spinner fa-spin");
    eleI.css("font-size", "24px");
    $("#pwned-pass-btn").append(eleI);

    const data = await $.get("/api/pwned/password/" + password);
    //spinner uninstalled
    $(".fa-spinner").remove();

    if (data.match != "NO-MATCH"){
      pwnedAPI.displayPassword(data);
    }
  },
  displayPassword: (data) => {
    pwnedDiv.empty();
    if (data.length > 0) {
      const pEl = $("<p>")
      .text(`Oh no! Its looks like we found ${data.length} matches. Consider changing your credentials`)
      .attr({
        class: "text-center pt-3"
      });
      pwnedDiv.append(pEl);
      pwnedCard.addClass("danger");
    }
  }
};
