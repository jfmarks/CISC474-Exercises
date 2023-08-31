$(document).ready(function(){
  $("form").submit(function(){
    var firstName = $( "#fname" ).val();
    var lastName = $( "#lname" ).val();
    $("#jumbotron").text(firstName + " " + lastName);
    alert("Submitted");
    return false;
  });
});