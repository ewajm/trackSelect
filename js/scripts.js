var android, rails, net, design;
var trackClassArray = ["design", "android", "rails", "net"];
var trackArray = [
  {name: "CSS/Design", description: "get a solid foundation in design principles and learn about the current industry-standard tools", link: "https://css-tricks.com/", colorScheme: "designDisplay", count: 0},
  {name:"Java/Android", description:"learn the fundamentals of Java and then move on to the Android framework, which is used in phones, tablets, and watches", link: "https://developer.android.com/index.html", colorScheme: "androidDisplay", count: 0},
  {name: "Ruby/Rails", description: "get an introduction to the Rails framework for Ruby (after learning the fundamentals of Ruby, of course!)", link: "http://rubyonrails.org/", colorScheme: "railsDisplay", count:0},
  {name: "C#/.Net", description: "get a solid foundation in a language and framework used by many large businesses and government agencies", link: "https://www.microsoft.com/net", colorScheme: "netDisplay", count:0}
];

function q1Check(value){
  if(value === 1){
    rails++;
  } else if(value === 2){
    android++;
    net++;
  } else if(value=== 3){
    net+=2;
  }
}

function q2Check(value){
  if(value === 1){
    design+=2;
  } else if(value === 2){
    android++;
    net++;
  } else {
    rails+=2;
  }
}

function q3Check(value){
  if(value === 1){
    android+=2;
  } else if (value === 2){
    design++;
  }
}

function q4Check(value){
  if(value === 1){
    rails++;
    design++;
  } else if(value === 2){
    net++;
    design++;
  } else if(value=== 3){
    android++;
    net++;
  }
}

function q5Check(value){
  if(value === 1){
    design++;
  } else if(value === 2){
    android++;
  } else if(value=== 3){
    rails++;
  } else if(value=== 4){
    net++;
  }
}

function q5Check(value){
  if(value === 1){
    design++;
  } else if(value === 2){
    android++;
  } else if(value=== 3){
    rails++;
  } else if(value=== 4){
    net++;
  }
}

function checkClassArray(questionClassArray){
  for(var j = 0; j < questionClassArray.length; j++){
    for(var i = 0; i < trackClassArray.length; i++){
      if(questionClassArray[j].includes(trackClassArray[i])){
        trackArray[i].count++;
        console.log(trackArray[i].name + " " + trackArray[i].count);
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
    track.push(trackClassArray[i]);
    i++;
  } while (i < trackClassArray.length-1 && trackClassArray[i].count === trackClassArray[i+1].count)
  if(track.length > 2){
    if(preferred !== 5){
      track.push(trackClassArray[preferred-1]);
    } else {
      track.push("unclear");
    }
  }
  // if(design > net && design > android && design > rails){
  //   track = trackArray[0];
  // } else if (android > net && android > design && android > rails){
  //   track = trackArray[1];
  // } else if (rails > design && rails > net && rails > android){
  //   track= trackArray[2];
  // } else if (net > android && net > design && net > rails){
  //   track= trackArray[3];
  // } else if(preferred !== 5){
  //   track=trackArray[preferred-1];
  // } else {
  //   track = "unclear";
  // }
  return track;
}

function resetValues(){
  android=0;
  rails=0;
  net=0;
  design=0;
  for(var i = 0; i < trackArray.length; i++){
    trackArray[i].count = 0;
  }
}

$(document).ready(function(){
  var track;
  //on form submit
  $("form").submit(function(event){
    event.preventDefault();
    $("div").removeClass("has-error");
    //get values
    var name= $("#name").val();
    var questionClassArray=[];
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
      for (var i = 1; i < 6; i++){
        var curQuestion = "input:radio[name=question"+i+"]:checked";
        var classString = $(curQuestion).attr("class");
        if(classString){
        questionClassArray.push(classString.split(" "));
        }
      }
      checkClassArray(questionClassArray);
      //get and display result
      $(".formDiv").fadeOut();
      track = getTrack(question5);
      $(".nameOut").text(name);
      if(track === "unclear"){
        $(".unclear").show();
      } else {
        var i = 0;
        do {
          $(".trackName").append(track[i].name);
          $("#description").append(track[i].description);
          $("#trackLink").append("here".link(track[i].link));
          i++;
          if(i != track.length){
            $(".trackName").append(" or ");
            $("#description").append("while in the " + track[i].name + " track you can ");
            $("#trackLink").append(" or " + "here".link(track[i].link));
          }
        } while (i < track.length)
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
    $(".success").children().text("");
    $("form")[0].reset();
    $(".formDiv").fadeIn("slow");
    if(track){
      $(".success").removeClass(track.colorScheme);
    }
    resetValues();
  });
});
