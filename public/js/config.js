/*global CryptoJS*/
/*eslint no-undef: "error"*/
const site = $("#site");
const username = $("#username");
const password = $("#password");
const submitBtn = $("#password-submit");
const cardRow = $("#password-card");
const deleteButtons = $(".del-btn");
const viewButtons = $(".view-btn")
const generatedPass = $("#generated")
const copyButton = $("#copy-btn")
console.log(copyButton)


const viewPassword = (e) => {
  const passEl = $(e.target).parent().parent()[0].children[1].children[2];
  const siteEl = ($(e.target).parent().parent()[0].children[1].children[0])
  const userEl = ($(e.target).parent().parent()[0].children[1].children[1])
  const siteText = $(siteEl).text();
  const userText = $(userEl).text();
  if ($(passEl).data().hidden === true) {
    const unencrypted = CryptoJS.AES.decrypt($(passEl).data().encrypt, `${siteText}${userText}`);
    const unencryptText = unencrypted.toString(CryptoJS.enc.Utf8)
    $(passEl).text(unencryptText)
    $(passEl).data().hidden = false
    $(e.target).text("Hide")
  }
  else {
    $(passEl).data().hidden = true
    $(passEl).text($(passEl).data().encrypt.slice(0, 24));
    $(e.target).text("View")
  }
};

const API = {
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
      console.error(error);
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
      url: "/api/passwords/" + id,
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

const refreshExamples = async () => {
  try {
    const data = await API.getExamples();
    if (typeof data === "object") {
      const cards = data.map(entry => {
        const password = $("<p>")
          .text(entry.password.slice(0, 24))
          .attr({
            "data-encrypt": entry.password,
            "data-hidden": true
          });


        const site = $("<h5>")
          .text(entry.site)
          .attr({
            class: "pb-2"
          });

        const username = $("<p>")
          .text(entry.username);

        const viewBtn = $("<button>")
          .attr({
            class: "btn btn-outline-light view-btn align-self-end mx-1 btn-block"
          })
          .text("View")

        const delBtn = $("<button>")
          .attr({
            class: "btn btn-danger del-btn align-self-end mx-1 btn-block"
          })
          .text("Delete");

          const rightDiv = $("<div>")
          .attr({
            class: "d-flex flex-column justify-content-around px-2"
          })
          .append([viewBtn, delBtn])

        const centerDiv = $("<div>")
          .attr({
            class: "p-2 w-100"
          })
          .append([site, username, password]);

        let className;

        switch (entry.site) {
          case "Facebook":
            className = "fab fa-facebook-square fa-3x";
            break;
          case "Twitter":
            className = "fab fa-twitter fa-3x";
            break;
          case "Instagram":
            className = "fab fa-instagram fa-3x";
            break;
          case "LinkedIn":
            className = "fab fa-linkedin-in fa-3x";
            break;
          case "Email":
            className = "fas fa-envelope fa-3x";
            break;
          case "Snapchat":
            className = "fab fa-snapchat-square fa-3x";
            break;
          case "Youtube":
            className = "fab fa-youtube fa-3x";
            break;
          case "Github":
            className = "fab fa-github-square fa-3x";
            break;
          case "Other":
            className = "fas fa-key fa-3x";
            break;

          default:
            className = "fas fa-key fa-3x";
            break;
        }

        const icon = $("<i>")
          .attr({
            class: className
          });

        const leftDiv = $("<div>")
          .attr({
            class: "d-flex align-items-center p-2"
          })
          .append(icon);

        const cardBody = $("<div>")
          .attr({
            class: "card-body d-flex flex-row",
            "data-id": entry.id
          })
          .append([leftDiv, centerDiv, rightDiv]);

        const card = $("<div>")
          .attr({
            class: "card my-2 lightDark hvr-reveal",
          })
          .append(cardBody);

        const col = $("<div>")
          .attr({
            class: "col-12"
          })
          .append(card);

        const row = $("<div>")
          .attr({
            class: "row w-100"
          })
          .append(col);

        return row;
      });
      cardRow.empty();
      if (cards.length === 0) {
        const defaultText = $("<p>")
          .attr({
            class: ""
          })
          .text("No passwords to display!");
        cardRow.append(defaultText);
      }
      cards.forEach(card => {
        cardRow.prepend(card);
      });
    }
  } catch (error) {
    console.error(error);
  }
};

var handleFormSubmit = async (event) => {
  event.preventDefault();

  const siteText = site.val().trim();
  const passText = password.val().trim();
  const userText = username.val().trim();

  if (userText == "" || passText == "") {
    alert("Please fill out all input fields");
    return;
  }

  const encrypted = CryptoJS.AES.encrypt(passText, `${siteText}${userText}`);

  const data = new entry(siteText, userText, encrypted.toString());

  await API.saveExample(data);
  await refreshExamples();


  password.val("");
  username.val("");
};

var handleDeleteBtnClick = async (e) => {
  const idToDelete = parseInt($(e.target).parent().parent()[0].dataset.id);

  await API.deleteExample(idToDelete);
  refreshExamples();

};

const clickCopy = () => {
  $("#generated").select();
  document.execCommand("copy");
  $("#copy-btn").text("Copied!")
};