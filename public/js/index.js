/*global refreshExamples, submitBtn, cardRow, deleteButtons,handleFormSubmit, handleDeleteBtnClick, handleDeleteBtnClick*/
/*eslint no-undef: "error"*/
$(document).ready(() => {
  const passForm = $("#pass-form");
  
  /*global CryptoJS, API*/
  /*eslint no-undef: "error"*/
  
  refreshExamples();
  submitBtn.on("click", handleFormSubmit);
  cardRow.on("click", ".del-btn", handleDeleteBtnClick);
  deleteButtons.on("click", handleDeleteBtnClick);
});

