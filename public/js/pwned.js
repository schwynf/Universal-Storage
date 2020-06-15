const pwnedAPI = {
  submitPass: async () => {
    const passText = pwnedPassword.val().trim();
    if (passText === "Please enter a valid password" || passText === "") {
      pwnedPassword.val("Please enter a valid password");
      pwnedPassword.addClass("invalid");
    }
    else {
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
    pwnedDiv.empty();
    const eleI = $("<div>")
      .attr({
        class: "spinner-border text-light m-3"
      })
    const spanEl = $("<span>")
      .attr({
        class: "sr-only"
      })
    eleI.append(spanEl)
    $(pwnedDiv).append(eleI);
    const data = await $.get("/api/pwned/email/" + email);
    eleI.remove()
    pwnedAPI.displayEmail(data);
  },
  getPwnedPass: async (password) => {
    //spinner installed
    pwnedDiv.empty();
    const eleI = $("<div>")
      .attr({
        class: "spinner-border text-light m-3"
      })
    const spanEl = $("<span>")
      .attr({
        class: "sr-only"
      })
    eleI.append(spanEl)
    $(pwnedDiv).append(eleI);

    const data = await $.get("/api/pwned/password/" + password);
    //spinner uninstalled
    eleI.remove()
    pwnedAPI.displayPassword(data);
  },
  displayPassword: (data) => {
    if (data.match === true) {
      data.hashed = data.hashed.slice(36, data.hashed.length);
      pwnedCard.removeClass("danger");
      pwnedCard.removeClass("bg-success");
      const pEl = $("<p>")
        .text(`Oh no! Its looks like we found ${data.hashed} matches. Consider changing your credentials`)
        .attr({
          class: "text-center pt-3"
        });
      pwnedDiv.append(pEl);
      pwnedCard.addClass("danger");
    } else {
      pwnedCard.removeClass("danger");
      pwnedCard.removeClass("bg-success");
      pwnedCard.addClass("bg-success");
      pEl = $("<p>")
        .text(`Hooray! No matches found!`)
        .attr({
          class: "text-center pt-3"
        });
      pwnedDiv.append(pEl);
    }
  },
  displayEmail: (data) => {
    pwnedCard.removeClass("danger");
    pwnedCard.removeClass("bg-success");
    pwnedCard.addClass("danger");
    if (data.length > 0) {
      pEl = $("<p>")
        .text(`Oh no! It looks like your account was found in the following data breaches:`)
        .attr({
          class: "text-center pt-3"
        });
      pwnedDiv.append(pEl);
      data.forEach(breach => {
        const h4El = $("<h4>")
          .attr({
            class: "text-center d-block"
          })
          .text(breach.Name);

        const col = $("<div>")
          .attr({
            class: "col-12"
          })
          .append(h4El);

        const row = $("<div>")
          .attr({
            class: "row"
          }).append(col);
        pwnedDiv.append(row);
      })
    }
    else {
      pwnedCard.removeClass("danger");
      pwnedCard.removeClass("bg-success");
      pwnedCard.addClass("bg-success");
      pEl = $("<p>")
        .text(`Hooray! No matches found!`)
        .attr({
          class: "text-center pt-3"
        });
      pwnedDiv.append(pEl);
    }
  }
};
