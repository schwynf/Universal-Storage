$(document).ready(()=>{

    $("#generateBtn").on("click", function(){
        console.log("works")
        $.ajax({
                url:"/api/generator",
                method:"GET"
            })
            .then(function(response){
                console.log(response);
                $("#passwordResult")
                .attr({
                    class: "pt-5 text-center",
                    id: "generated"
                }).text(response);
            
            })
    })

}


)








// var API = {
//     getAPI: function(){
//         return $.ajax({
//             url: generatorURL,
//             type: "GET"
//         });
//     }
// };

// var newPassword = function(){
//     API.getAPI().then(function(data){
//         console.log(data);
//         $("#passwordResult").text(data.char[0]);
//     })
// };

// $("#generateBtn").on("click", function(){
//     newPassword();
// });

// 



// $("#generateBtn").on("click", function(){
//         newPassword();

// });



