// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");

// The API object contains methods for each kind of request we'll make




// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = () => {
  API.getExamples().then(data => {
    var $examples = data.map( entry => {
      // var $a = $("<a>")
      //   .text(example.text)
      //   .attr("href", "/example/" + example.id);
      const row = $("<div>")
        .attr({
          class: "row"
        })
      const col = $("<col-12>")
        .attr({
          class: "card"
        })
        .append(row)
      const card = $("<div>")
        .attr({
          class: "card"
        })
        .append(col)
      const cardBody = $("<div>")
        .attr({
          class: "card-body"
        })
        .append(card)
      const username = $("<p>")
      .text()
        
      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": entry.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function () {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function () {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);