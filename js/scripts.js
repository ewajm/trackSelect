var android, rails, net, design;
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

function getTrack(preferred){
  var track;
  var trackArray = [
    {name: "CSS/Design", description: "get a solid foundation in design principles and learn about the current industry-standard tools", link: "http://www.epicodus.com/design", colorScheme: "design"},
    {name:"Java/Android", description:"learn the fundamentals of Java and then move on to the Android framework, which is used in phones, tablets, and watches", link: "http://www.epicodus.com/android", colorScheme: "android"},
    {name: "Ruby/Rails", description: "get an introduction to the Rails framework for Ruby (after learning the fundamentals of Ruby, of course!)", link: "http://www.epicodus.com/rails", colorScheme: "rails"},
    {name: "C#/.Net", description: "get a solid foundation in a language and framework used by many large businesses and government agencies", link: "http://www.epicodus.com/net", colorScheme: "net"}];
  if(design > net && design > android && design > rails){
    track = trackArray[0];
  } else if (android > net && android > design && android > rails){
    track = trackArray[1];
  } else if (rails > design && rails > net && rails > android){
    track= trackArray[2];
  } else if (net > android && net > design && net > rails){
    track= trackArray[3];
  } else if(preferred !== 5){
    track=trackArray[preferred-1];
  } else {
    track = "unclear";
  }
  return track;
}

function resetValues(){
  android=0;
  rails=0;
  net=0;
  design=0;
}


$(document).ready(function(){
  var track;
  //on form submit
  $("form").submit(function(event){
    event.preventDefault();
    //0 out previous values
    resetValues();
    //get values
    var name= $("#name").val();
    var question1 = parseInt($("input:radio[name=question1]:checked").val());
    var question2 = parseInt($("input:radio[name=question2]:checked").val());
    var question3 = parseInt($("input:radio[name=question3]:checked").val());
    var question4 = parseInt($("input:radio[name=question4]:checked").val());
    var question5 = parseInt($("input:radio[name=question5]:checked").val());
    //check values
    if(!name || !question1 || !question2 || !question3 || !question4 || !question5){
      alert("Please answer all questions!")
    } else {
      q1Check(question1);
      q2Check(question2);
      q3Check(question3);
      q4Check(question4);
      q5Check(question5);
    }
    //get and display result
    track = getTrack(question5);
    $(".formDiv").hide();
    $(".nameOut").text(name);
    if(track === "unclear"){
      $(".unclear").toggle();
    } else {
      $(".trackName").text(track.name);
      $("#description").text(track.description);
      $("#trackLink").html("here".link(track.link));
      $(".success").addClass(track.colorScheme);
      $(".success").toggle();
    }
    $(".output").toggle();
  });

  //on 'try again' button click
  $("#again").click(function(){
    $(".output").hide();
    $(".unclear").hide();
    $(".success").hide();
    $(".formDiv").show();
    $("form")[0].reset();
    if(track){
      $(".success").removeClass(track.colorScheme);
    }
    resetValues();
  });

});
