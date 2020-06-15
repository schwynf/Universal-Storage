$("#generateBtn").on("click", async () => {

    const eleI = $("<div>")
      .attr({
        class: "spinner-border text-light m-3"
      })
    const spanEl = $("<span>")
      .attr({
        class: "sr-only"
      })
    eleI.append(spanEl);
    $("#passwordBox").append(eleI);

    const response = await $.ajax({
        url: "/api/generator",
        method: "GET"
    })

    eleI.remove();
    const generatedEl = $("<input>")
        .attr({
            class: "text-center form-control-plaintext my-3 veryDark ",
            id: "generated"
        })
        .val(response);

    const copyButton = $("<button>").attr({
        class: "btn btn-outline-light float-right",
        id: "copy-btn",
        "data-toggle": "tooltip",
        "data-placement": "top",
        title: "Copied!"
    })
    .text("Copy")
    $("#passwordBox").empty();
    $("#passwordBox").append([generatedEl, copyButton]);
});









