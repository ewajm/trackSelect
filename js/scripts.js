var android=0;
var net=0;
var design=0;
var rails=0;

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



$(document).ready(function(){
  $("form").submit(function(event){
    event.preventDefault();
    var name= $("#name").val();
    var question1 = parseInt($("input:radio[name=question1]:checked").val());
    var question2 = parseInt($("input:radio[name=question2]:checked").val());
    var question3 = parseInt($("input:radio[name=question3]:checked").val());
    var question4 = parseInt($("input:radio[name=question4]:checked").val());
    var question5 = parseInt($("input:radio[name=question5]:checked").val());
    console.log(question1 + " " + question2 + " " + question3 + " " + question4 + " " + question5);
    if(!name || !question1 || !question2 || !question3 || !question4 || !question5){
      alert("Please answer all questions!")
    } else {
      q1Check(question1);
      q2Check(question2);
      q3Check(question3);
      q4Check(question4);
      q5Check(question5);
      console.log(design + " " + net + " " + rails + " " + android);
    }
  });
});
