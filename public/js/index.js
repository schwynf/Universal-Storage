$(document).ready(() => {
  const passForm = $("#pass-form");
  /*global CryptoJS, API*/
  /*eslint no-undef: "error"*/
  var API = {
    saveExample: async (data) => {
      try {
        const res = await $.ajax({
          headers: {
            "Content-Type": "application/json"
          },
          type: "POST",
          url: "/api/passwords",
          data: JSON.stringify(data)
        });
        return res;
      } catch (error) {
        console.error(error)
      }
    },
    getExamples: async () => {
      const data = await $.ajax({
        url: "/api/passwords",
        type: "GET"
      });
      return data;
    },
    deleteExample: async (id) => {
      const data = await $.ajax({
        url: "/api/passwords" + id,
        type: "DELETE"
      });
      return data;
    }
  };
  class entry {
    constructor(site, username, password) {
      this.site = site;
      this.username = username;
      this.password = password;
    }
  }
  const site = $("#site")
  const username = $("#username")
  const password = $("#password")
  const submitBtn = $("#password-submit")
  const cardRow = $("#password-card")

  var refreshExamples = async () => {
    try {
      const data = await API.getExamples()
      const cards = data.map(entry => {
        const unencrypted = CryptoJS.AES.decrypt(entry.password, `${entry.site}${entry.username}`)
        const password = $("<p>")
          .text(unencrypted.toString(CryptoJS.enc.Utf8))


        const username = $("<p>")
          .text(entry.username)

        const rightDiv = $("<div>")
          .attr({
            class: "p-2"
          })
          .append([password, username])

        let className;

        switch (entry.site) {
          case "Facebook":
            className = "fab fa-facebook-square fa-3x"
            break;
          case "Twitter":
            className = "fab fa-twitter fa-3x"
            break;
          case "Instagram":
            className = "fab fa-instagram fa-3x"
            break;
          case "LinkedIn":
            className = "fab fa-linkedin-in fa-3x"
            break;
          case "Email":
            className = "fab fa-envelope fa-3x"
            break;
          case "Snapchat":
            className = "fab fa-snapchat-square fa-3x"
            break;
          case "Youtube":
            className = "fab fa-youtube fa-3x"
            break;
          case "Github":
            className = "fab fa-github-square fa-3x"
            break;
          case "Other":
            className = "fab fa-key fa-3x"
            break;

          default:
            className = "fab fa-key fa-3x"
            break;
        }

        const icon = $("<i>")
          .attr({
            class: className
          })

        const leftDiv = $("<div>")
          .attr({
            class: "d-flex align-items-center p-2"
          })
          .append(icon)

        const cardBody = $("<div>")
          .attr({
            class: "card-body d-flex flex-row"
          })
          .append([leftDiv, rightDiv])

        const card = $("<div>")
          .attr({
            class: "card my-2 lightDark",
            "data-id": entry.id
          })
          .append(cardBody)

        const col = $("<div>")
          .attr({
            class: "col-12"
          })
          .append(card)

        const row = $("<div>")
          .attr({
            class: "row"
          })
          .append(col)

        return row;
      });
      cardRow.empty()
      cards.forEach(card => {
        cardRow.prepend(card)
      })
    } catch (error) {
      console.error(error)
    }
  };

  var handleFormSubmit = async (event) => {
    event.preventDefault();

    const siteText = site.val().trim()
    const passText = password.val().trim()
    const userText = username.val().trim()

    if (userText == "" || passText == "") {
      alert("Please fill out all input fields");
      return;
    }

    const encrypted = CryptoJS.AES.encrypt(passText, `${siteText}${userText}`)

    const data = new entry(siteText, userText, encrypted.toString());

    console.log(data)
    await API.saveExample(data)
    await refreshExamples();


    password.val("");
    username.val("");
  };

  refreshExamples();

  submitBtn.on('click', handleFormSubmit)
});

