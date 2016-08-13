var trackClassArray = ["design", "android", "rails", "net"];
var trackArray = [
  {name: "CSS/Design", description: "get a solid foundation in design principles and learn about the current industry-standard tools", link: "https://css-tricks.com/", colorScheme: "designDisplay", count: 0, order: 1},
  {name:"Java/Android", description:"learn the fundamentals of Java and then move on to the Android framework, which is used in phones, tablets, and watches", link: "https://developer.android.com/index.html", colorScheme: "androidDisplay", count: 0, order: 2},
  {name: "Ruby/Rails", description: "get an introduction to the Rails framework for Ruby (after learning the fundamentals of Ruby, of course!)", link: "http://rubyonrails.org/", colorScheme: "railsDisplay", count:0, order: 3},
  {name: "C#/.Net", description: "get a solid foundation in a language and framework used by many large businesses and government agencies", link: "https://www.microsoft.com/net", colorScheme: "netDisplay", count:0, order: 4}
];

function checkClassArray(questionClassArray){
  for(var j = 0; j < questionClassArray.length; j++){
    for(var i = 0; i < trackClassArray.length; i++){
      if(questionClassArray[j].includes(trackClassArray[i])){
        trackArray[i].count++;
      }
    }
  }
  trackArray.sort(function(a, b){
    return b.count-a.count;
  });
}

function getTrack(preferred){
  var track = [];
  var i = 0;
  do {
    track.push(trackArray[i]);
    i++;
  } while (i < trackArray.length-1 && trackArray[i-1].count === trackArray[i].count)
  if(track.length > 2){
    track = [];
    if(preferred !== 5){
      track.push(trackArray[preferred-1]);
    } else {
      track.push("unclear");
    }
  }
  return track;
}

function resetValues(){
  for(var i = 0; i < trackArray.length; i++){
    trackArray[i].count = 0;
  }
  trackArray.sort(function(a, b){
    return a.order-b.order;
  });
  console.log(trackArray);
}

$(document).ready(function(){
  var track;
  //on form submit
  $("form").submit(function(event){
    event.preventDefault();
    $("div").removeClass("has-error");
    //get values
    var name= $("#name").val();
    var question1 = parseInt($("input:radio[name=question1]:checked").val());
    var question2 = parseInt($("input:radio[name=question2]:checked").val());
    var question3 = parseInt($("input:radio[name=question3]:checked").val());
    var question4 = parseInt($("input:radio[name=question4]:checked").val());
    var question5 = parseInt($("input:radio[name=question5]:checked").val());

    //check if survey is filled out
    if(!name || !question1 || !question2 || !question3 || !question4 || !question5){
      if(!name){
        $("#name").parent().addClass("has-error");
      }
      if(!question1){
        $('input[name=question1]').parents(".form-group").addClass("has-error");
      }
      if(!question2){
        $('input[name=question2]').parents(".form-group").addClass("has-error");
      }
      if(!question3){
        $('input[name=question3]').parents(".form-group").addClass("has-error");
      }
      if(!question4){
        $('input[name=question4]').parents(".form-group").addClass("has-error");
      }
      if(!question5){
        $('input[name=question5]').parents(".form-group").addClass("has-error");
      }
    } else {
      //0 out previous values
      resetValues();
      //get values
      var questionClassArray=[];
      for (var i = 1; i < 6; i++){
        var curQuestion = "input:radio[name=question"+i+"]:checked";
        var classString = $(curQuestion).attr("class");
        if(classString){
        var curArray = classString.split(" ");
        questionClassArray.push(curArray);
        }
      }
      checkClassArray(questionClassArray);
      //get and display result
      $(".formDiv").fadeOut();
      track = getTrack(question5);
      console.log(track);
      $(".nameOut").text(name);
      if(track === "unclear"){
        $(".unclear").show();
      } else {
        var i = 0;
        do{
          $(".trackName").append(track[i].name);
          $("#description").append(track[i].description);
          $("#trackLink").append("here".link(track[i].link));
          if(i <track.length-1){
            $(".trackName").append(" or ");
            $("#description").append("; alternately, in the " + track[i+1].name + " track, you can ");
            $("#trackLink").append(" and ");
          }
          i++;
        } while (i < track.length);
        $(".success").addClass(track[0].colorScheme);
        $(".success").show();
      }
      $(".output").fadeIn("slow");
    }
  });
  //on 'try again' button click
  $("#again").click(function(){
    $(".output").fadeOut();
    $(".unclear").hide();
    $(".success").hide();
    $("span").empty();
    $("form")[0].reset();
    $(".formDiv").fadeIn("slow");
    if(track){
      $(".success").removeClass(track[0].colorScheme);
    }
    resetValues();
  });
});
