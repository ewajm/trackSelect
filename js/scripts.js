var android, rails, net, design;
function q1Check(value){
  if(value === 1){
    rails++;
  } else if(value === 2){
    android++;
    net++;
  } else if(value=== 3){
    net++;
  }
}

function q2Check(value){
  if(value === 1){
    design++;
  } else if(value === 2){
    android++;
    net++;
  } else {
    rails++;
  }
}

function q3Check(value){
  if(value === 1){
    android++;
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
  var trackArray = ["CSS/Design", "Java/Android", "Ruby/Rails", "C#/.Net"];
  var valueArray = [design, android, rails, net];
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


$(document).ready(function(){
  $("form").submit(function(event){
    event.preventDefault();
    android=0;
    ruby=0;
    net=0;
    design=0;
    var name= $("#name").val();
    var question1 = parseInt($("input:radio[name=question1]:checked").val());
    var question2 = parseInt($("input:radio[name=question2]:checked").val());
    var question3 = parseInt($("input:radio[name=question3]:checked").val());
    var question4 = parseInt($("input:radio[name=question4]:checked").val());
    var question5 = parseInt($("input:radio[name=question5]:checked").val());
    //console.log(question1 + " " + question2 + " " + question3 + " " + question4 + " " + question5);
    if(!name || !question1 || !question2 || !question3 || !question4 || !question5){
      alert("Please answer all questions!")
    } else {
      q1Check(question1);
      q2Check(question2);
      q3Check(question3);
      q4Check(question4);
      q5Check(question5);
      console.log("design: " + design + " net: " + net + " rails: " + rails + " android: " + android);
    }
    var track = getTrack(question5);
    console.log(track);
  });
});
