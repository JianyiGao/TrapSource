var app = angular.module('quizApp', []);
  app.directive('quiz', function(quizFactory) {
    return {
    restrict: 'AE',
    scope: {},
    templateUrl: 'modules/novice-tree/client/views/template.html',
    link: function(scope, elem, attrs) {
        scope.start = function() {
            scope.id = 0;
            scope.score = 0;
            scope.question = [];
            scope.quizOver = false;
            scope.inProgress = true;
            scope.getQuestion();
        };
        scope.reset = function() {
            scope.inProgress = false;
            scope.score = 0;
        };
        scope.getQuestion = function() {
            var q = quizFactory.getQuestion(scope.id);
            console.log("passed Question is:"+q);
            if (q) {
                scope.object = {
                    'question': q.question,
                    'options': q.options,
                    'answer': q.answer,
                    'trueQId': q.trueQId,
                    'falseQid': q.falseQid,
                    'answerMode': true,
                    'answers': q.answers
                };

                scope.question.push(scope.object);
                console.log(scope.question);
            } else {
                scope.quizOver = true;
            }
        };

        scope.checkAnswer = function(question) {
            console.log(question);
            var ans;
            var options = question.options;
            for (var i = 0; i < options.length; i++) {
                if (options[i].selectedRadio) {
                    ans = options[i].selectedRadio;
                }
            }
            console.log(question.options[question.answer]);
            if (question.options[question.answer].name === ans) {
                console.log(scope.id);
                scope.score++;
                scope.question[scope.id].answerMode = false;
                scope.answerMode = false;
                scope.id++;
                scope.getQuestion();
            }else{
                scope.question=scope.question.slice(0,question.trueQId);
                console.log(scope.question);
                scope.id=question.falseQid-1;
                scope.getQuestion();
            }
          };
        }
       };
      });

  app.factory('quizFactory', function() {
  var questions = [{
    question: "Which is the largest country in the world by population?",
    options: [{
        name: "India",
        selected: false
    }, {
        name: "USA",
        selected: false
    }, {
        name: "China",
        selected: false
    }, {
        name: "Russia",
        selected: false
    }],
    answer: 2,
    trueQId: 1,
    falseQid: 3,
    answers: ""
}, {
    question: "When did the second world war end?",
    options: [{
        name: "1945",
        selected: false
    }, {
        name: "1934",
        selected: false
    }, {
        name: "1993",
        selected: false
    }, {
        name: "2002",
        selected: false
    }],
    answer: 0,
    trueQId: 2,
    falseQid: 3
}, {
    question: "Which was the first country to issue paper currency?",
    options: [{
        name: "USA",
        selected: false
    }, {
        name: "France",
        selected: false
    }, {
        name: "Italy",
        selected: false
    }, {
        name: "China",
        selected: false
    }],
    answer: 3,
    trueQId: 3,
    falseQid: 4
},{
    question: "Which city hosted the 1996 Summer Olympics?",
    options: [{
      name :"Atlanta", 
      selected: false
    },{
      name :"Sydney",
      selected:false
    },{
      name : "Athens",
      selected :false 
    },{
      name: "Beijing",
      selected:false
    }],
    answer: 0,
    trueQId:4,
    falseQid:4
},{   
    question: "Who invented telephone?",
    options: [{
      name : "Albert Einstein",
      selected:false
    },{
      name:"Alexander Graham Bell",
      selected:false
    },{
      name:"Isaac Newton",
      selected:false
    },{
      name:"Marie Curie",
      selected:false
    }],
    answer: 1,
    
}
];
return {
    getQuestion: function(id) {
        console.log(questions);
        console.log(questions.length);
        if (id < questions.length) {
            return questions[id];
        } else {
            return false;
        }
       },
      updateQuestion: function(id, ans) {
      console.log("inside update question and answer is :"+ans);
        questions[id].answers = ans;
     }
     };
   });