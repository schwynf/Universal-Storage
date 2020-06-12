$(document).ready(()=>{

    $("#generateBtn").on("click", function(){
        console.log("works")
        $.ajax({
                url:"/api/generator",
                method:"GET"
            })
            .then(function(response){
                console.log(response);
                const pElement = $("<p>")
                .attr({
                    class: "pt-5 text-center",
                    id: "generated"
                })
                .text(response);
                $("#passwordBox").empty();
                $("#passwordBox").append(pElement);
            
            })
    })

})







