/*global refreshExamples, submitBtn, cardRow, deleteButtons,handleFormSubmit, handleDeleteBtnClick, handleDeleteBtnClick*/
/*eslint no-undef: "error"*/
$(document).ready(() => {
  /*global CryptoJS, API*/
  /*eslint no-undef: "error"*/
  $("#otherDiv").hide()
  $("#site").change(function () {
    if ($("#site option:selected").val() == "Other") {
      $("#otherDiv").show();
    }
  });

  refreshPasswords();
  submitBtn.on("click", handleFormSubmit);
  cardRow.on("click", ".del-btn", handleDeleteBtnClick);
  cardRow.on("click", ".view-btn", viewPassword);
  $("#passwordBox").on("click", "#copy-btn", clickCopy);
  pwnedPassBtn.on("click", pwnedAPI.submitPass);
  password.on("click", () => {
    password.val("");
    password.removeClass("invalid");
  })
  ifOther.on("click", () => {
    ifOther.val("");
    ifOther.removeClass("invalid");
  })
  username.on("click", () => {
    username.val("");
    username.removeClass("invalid");
  })
  pwnedPassword.on("click", () => {
    pwnedPassword.val("");
    pwnedPassword.removeClass("invalid");
  });
  pwnedEmailBtn.on("click", pwnedAPI.submitEmail);
  pwnedEmail.on("click", () => {
    pwnedEmail.val("");
    pwnedEmail.removeClass("invalid");
  });
});
