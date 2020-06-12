/*global refreshExamples, submitBtn, cardRow, deleteButtons,handleFormSubmit, handleDeleteBtnClick, handleDeleteBtnClick*/
/*eslint no-undef: "error"*/
$(document).ready(() => {
  refreshExamples();
  submitBtn.on("click", handleFormSubmit);
  cardRow.on("click", ".del-btn", handleDeleteBtnClick);
  deleteButtons.on("click", handleDeleteBtnClick);
});

