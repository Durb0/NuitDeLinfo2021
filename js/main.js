document.addEventListener('DOMContentLoaded', ()=>{
    // axios.get("http://2.7.236.41:15670/get/sauvetage/15")
    // .then(function (response){
    //     console.log(response);
    // })

    function request(url, id) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            document.getElementById(id).innerText = this.responseText;
         }
        };
        xmlhttp.open("GET", url);
        xmlhttp.send();
       }
       function simpleRequest(url, action){
         var xhr = new XMLHttpRequest(),
           method = "GET",
           url = url;
           xhr.open(method, url, true);
           xhr.onreadystatechange = function () {
             if(xhr.readyState === 4 && xhr.status === 200) {
               action(xhr.responseText);
             }
           };
           xhr.send();
       }
       function getNbPersonneCocheTest(){
         function action(response){
           createPie('1pie', ["Coché", "Non coché"], getMatch(response, /[0-9]+/g), 'Nombre de personne qui ont coché test')
         }
         simpleRequest('http://mongo.learninglab.eu/%27+login+%27/nombrePersonnesTests/', action);
       
       }

       request("http://2.7.236.41:15670/get/sauvetage/15", 1)
})