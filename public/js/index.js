/*global refreshExamples, submitBtn, cardRow, deleteButtons,handleFormSubmit, handleDeleteBtnClick, handleDeleteBtnClick*/
/*eslint no-undef: "error"*/
$(document).ready(() => {
  /*global CryptoJS, API*/
  /*eslint no-undef: "error"*/

  refreshExamples();
  submitBtn.on("click", handleFormSubmit);
  cardRow.on("click", ".del-btn", handleDeleteBtnClick);
  cardRow.on("click", ".view-btn", viewPassword);
  $("#passwordBox").on("click", "#copy-btn", clickCopy);
  pwnedPassBtn.on("click", pwnedAPI.submitPass);
  pwnedPassword.on("click", () => {
    pwnedCard.removeClass("danger")
    pwnedPassword.val("");
    pwnedPassword.removeClass("invalid");
  })
  pwnedEmailBtn.on("click", pwnedAPI.submitEmail);
  pwnedEmail.on("click", () => {
    pwnedCard.removeClass("danger")
    pwnedEmail.val("");
    pwnedEmail.removeClass("invalid");
  });
})
