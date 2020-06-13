$("#generateBtn").on("click", async () => {
    const response = await $.ajax({
        url: "/api/generator",
        method: "GET"
    })
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









