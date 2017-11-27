$(document).ready(function() {
  // var database = firebase.database();
  var user;
  var index = 0;

  var container = $('#container');
  var title = $('#Title');
  var description = $('#Description');

  function render(tree) {
    $('.rm-li').each(function() {
      $(this).unbind();
    });
    console.log('render');
    var resourceAnswers = [];
    var question = tree[index];
    container.html('');
    container.append(
      '<div class=\'row\'><div class=\'col-md-12 form-group\'><label for=\'Title\'> Title </label><input value="' +
        question.questionTitle +
        '"type=\'text\' class=\'form-control frm-submit\' id=\'Title\' placeholder=\'Title\' required/><div class=\'invalid-feedback\'>Please provide a valid Title.</div>      </div>    </div>    <div class=\'row\'>      <div class=\'col-md-12 form-group\'>        <label for=\'Description\'> Description </label>        <textarea class=\'form-control frm-submit\' rows=3 id=\'Description\' placeholder=\'Description\' required>' +
        question.questionParagraph +
        '</textarea>        <div class=\'invalid-feedback\'>          Please provide a valid Description.        </div>      </div>    </div>'
    );
    for (var i = 0; i < question.answers.length; i++) {
      var answer = question.answers[i];
      if (!answer.nextBool) {
        container.append(
          '<div class="row"><div class=\'col-sm-11 col-xs-10 form-group\'> <label for=\'Answer\'> Answer </label> <input value="' +
            answer.answerTitle +
            '" type=\'text\' class=\'form-control frm-submit\' id=\'Answer\' placeholder=\'Answer\' required/> <div class=\'invalid-feedback\'> Please provide a valid Answer. </div> </div> <div class=\'col-sm-1 col-xs-2 form-group\'> <label for \'check\' class=\'text-right\'> Path </label> <input checked type=\'checkbox\' class=\'form-control frm-check\' id=\'check\' /> </div></div>'
        );
      } else {
        var resources = '';
        resourceAnswers.push(i);
        for (var j = 0; j < answer.resourceLinks.length; j++) {
          resources +=
            '<label class=\'col-md-11 col-md-offset-1\' for=\'Resources\'> Resource Link Name </label>  <div class=\'col-md-1\'></div>			  <div class=\'col-md-11\'>				<input value=\'' +
            answer.resourceLinks[j].linkName +
            '\' class=\'form-control frm-submit resource\' rows=3 id=\'Resource-Name\' placeholder=\'Resource\' required></input>				<div  style=\'margin-bottom:0.5rem\' class=\'invalid-feedback\'>Please provide a valid Resource.</div>			  </div>	<label class=\'col-md-11 col-md-offset-1\' for=\'Resources\'> Resource Link </label>  <div class=\'col-md-1\'></div>			  <div class=\'col-md-11\'>				<input value=\'' +
            answer.resourceLinks[j].url +
            '\' class=\'form-control frm-submit resource\' rows=3 id=\'Resource-URL\' placeholder=\'Resource\' required></input>				<div git class=\'invalid-feedback\'>Please provide a valid Resource.</div><div class="div-line"></div></div>';
        }
        container.append(
          ' <div class=\'row\'>		  <div class=\'col-sm-11 col-xs-10 form-group\'>			<label for=\'Answer\'> Answer </label>			<input value="' +
            answer.answerTitle +
            '" type=\'text\' class=\'form-control frm-submit\' id=\'Answer\' placeholder=\'to\' required/>			<div class=\'invalid-feedback\'>			  Please provide a valid Answer.			</div>		  </div>		  <div class=\'col-sm-1 col-xs-2 form-group\'>			<label for \'check\' class=\'text-right\'> Path </label>			<input type=\'checkbox\' class=\'form-control frm-check\' id=\'check\' />		  </div>		</div>		<div class=\'row\'>		  <div class=\'col-md-12 form-group\'>						<div class=\'row\'>		<label class=\'col-md-11 col-md-offset-1\' for=\'Resources\'> Resource Box Title </label>  <div class=\'col-md-1\'></div>			  <div class=\'col-md-11\'>				<input value=\'' +
            answer.resourceTitle +
            '\' class=\'form-control frm-submit resource\' rows=3 id=\'Resource-Title\' placeholder=\'Resource\' required></input>				<div  style=\'margin-bottom:0.5rem\' class=\'invalid-feedback\'>Please provide a valid Resource.</div>			  </div> <label class=\'col-md-11 col-md-offset-1\' for=\'Resources\'> Resource Box Description </label>  <div class=\'col-md-1\'></div>			  <div class=\'col-md-11\'>				<textarea  class=\'form-control frm-submit resource\' rows=3 id=\'Resource-Paragraph\' placeholder=\'Resource\' required>' +
            answer.resourceParagraph +
            '</textarea>				<div  style=\'margin-bottom:0.5rem\' class=\'invalid-feedback\'>Please provide a valid Resource.</div>	<div class="div-line"></div>		  <b style=" font-weight: bold; margin-bottom: 0.5rem; display: block">Links</b></div>' +
            resources +
            '			  </div>			  <div class=\'col-md-1\'></div>			  <div class=\'col-md-10 input-group-button\'>				<button class=\'btn btn-primary btn-lg frm-btn\'>				  <span  style="color: #ffffff !important;" style=\'font-size:1.5em;\' class=\'glyphicon glyphicon-plus\'></span> Add Resource</button>			  </div>			</div>		  </div>		</div>'
        );
      }
    }
    container.append(
      '<div class=\'div-line\'></div>            <div class=\'col-md-10 input-group-button\'>              <button id=\'add-question\' class=\'btn btn-primary btn-lg\'>                <span style=\'color: #ffffff !important;\' class=\'glyphicon glyphicon-plus\'></span> Add Answer</button>            </div>'
    );

    function checkEmpty(inputs) {
      $.each(inputs, function(key, input) {
        $input = $(input);
        if ($input.val() === '') {
          console.log('empty input', input);
          console.log($input.prev());
          return false;
        }
      });
      return true;
    }

    function save() {
      var answerCount = 0;
      var resourceCount = 0;
      var inputs = $('.frm-submit');
      if (checkEmpty(inputs)) {
        $.each(inputs, function(key, input) {
          $input = $(input);
          if (key === 0) {
            tree[index].questionTitle = $input.val();
          } else if (key === 1) {
            tree[index].questionParagraph = $input.val();
          } else if ($input.attr('id') === 'Answer') {
            if ($(inputs.get(key + 1)).attr('id') === 'Answer') {
              tree[index].answers[answerCount].answerTitle = $input.val();
              answerCount++;
            } else {
              tree[index].answers[answerCount].answerTitle = $input.val();
            }
          } else if ($input.attr('id') === 'Resource-Title') {
            tree[index].answers[answerCount].resourceTitle = $input.val();
          } else if ($input.attr('id') === 'Resource-Paragraph') {
            tree[index].answers[answerCount].resourceParagraph = $input.val();
          } else if ($input.attr('id') === 'Resource-Name') {
            tree[index].answers[answerCount].resourceLinks[
              resourceCount
            ].linkName = $input.val();
          } else if ($input.attr('id') === 'Resource-URL') {
            if ($(inputs.get(key + 1)).attr('id') !== 'Resource-Name') {
              tree[index].answers[answerCount].resourceLinks[
                resourceCount
              ].url = $input.val();
              answerCount++;
              resourceCount = 0;
            } else {
              tree[index].answers[answerCount].resourceLinks[
                resourceCount
              ].url = $input.val();
              resourceCount++;
            }
          }
        });
      }
    }

    $('#frm-save').on('click', function(e) {
      e.preventDefault();
      save();
    });
    var buttons = $('.frm-btn');
    $.each(buttons, function(key, button) {
      $button = $(button);
      $button.on('click', function(e) {
        e.preventDefault();
        tree[index].answers[resourceAnswers[key]].resourceLinks.push({
          linkName: '',
          url: ''
        });

        render(tree);
      });
    });
    var checkboxs = $('.frm-check');
    $.each(checkboxs, function(key, check) {
      $check = $(check);
      $check.change(function() {
        if ($(this).is(':checked')) {
          tree[index].answers[key].nextBool = undefined;
          tree[index].answers[key].resourceLinks = undefined;
          tree[index].answers[key].resourceParagraph = undefined;
          tree[index].answers[key].resourceTitle = undefined;
        } else {
          tree[index].answers[key].nextBool = true;
          tree[index].answers[key].resourceLinks = [
            {
              linkName: '',
              url: ''
            }
          ];
          tree[index].answers[key].resourceParagraph = '';
          tree[index].answers[key].resourceTitle = '';
        }

        render(tree);
      });
    });
    $('#add-question').on('click', function(e) {
      e.preventDefault();
      tree[index].answers.push({ answerTitle: '' });

      render(tree);
    });
    var sidepanel = $('#sidepanel');
    sidepanel.empty();
    for (var ind = 0; ind < tree.length; ind++) {
      sidepanel.append(
        '<li class=\'active text-center frm-question\'><a data-toggle=\'pill\' href=\'#needs-validatoin\'>' +
          tree[ind].questionTitle +
          '</a></li>'
      );
    }
    sidepanel.append(
      '<li id=\'addForm\'><button class=\'btn btn-primary btn-block\' id=\'addFormBtn\'>Add Question</button></li>'
    );
    var questions = $('.frm-question');
    $(questions.get(index)).addClass('current-question');
    $.each(questions, function(key, question) {
      $(question).on('click', function() {
        index = key;

        render(tree);
      });
    });

    $('#addForm').on('click', function() {
      tree.push({
        questionParagraph: '',
        questionTitle: 'New Question',
        answers: [
          {
            answerTitle: ''
          }
        ]
      });

      render(tree);
    });

    $('#up-arrow').on('click', function() {
      if (index !== 0) {
        var temp = tree[index - 1];
        tree[index - 1] = tree[index];
        tree[index] = temp;
        index--;
        render(tree);
      }
    });

    $('#down-arrow').on('click', function() {
      if (index !== tree.length - 1) {
        var temp = tree[index + 1];
        tree[index + 1] = tree[index];
        tree[index] = temp;
        index++;
        render(tree);
      }
    });
  }
  // database.ref('tree').on('value', function(snapshot) {
  //   render(snapshot.val());
  // });
  var json = [
    {
      questionParagraph: 'Do you know what type of business you want to start?',
      questionTitle: 'Start a Business',
      answers: [
        {
          answerTitle: 'yes'
        },
        {
          answerTitle: 'no',
          nextBool: 'true',
          resourceTitle: 'Market research and competitive analysis',
          resourceParagraph:
            'Market research helps you find customers for your business. Competitive analysis helps you make your business unique. Combine them to find a competitive advantage for your small business. These resources from the SBA will help you to: Use market research to find customers, Use competitive analysis to find a market advantage, Free small business data and trends.',
          resourceLinks: [
            {
              url:
                'https://www.sba.gov/business-guide/plan/market-research-competitive-analysis',
              linkName: 'sba research and competitive analysis'
            },
            {
              url:
                'https://www.sba.gov/tools/local-assistance?from_mobile=true',
              linkName: 'sba local assistance'
            },
            {
              url: 'https://www.sba.gov/tools/sizeup?from_mobile=true',
              linkName: 'sba analyze your business '
            }
          ]
        },
        {
          answerTitle: 'unsure',
          nextBool: 'true',
          resourceTitle: 'Market research and competitive analysis',
          resourceParagraph:
            'Market research helps you find customers for your business. Competitive analysis helps you make your business unique. Combine them to find a competitive advantage for your small business. These resources from the SBA will help you to: Use market research to find customers, Use competitive analysis to find a market advantage, Free small business data and trends.',
          resourceLinks: [
            {
              url:
                'https://www.sba.gov/business-guide/plan/market-research-competitive-analysis',
              linkName: 'sba research and competitive analysis'
            },
            {
              url:
                'https://www.sba.gov/tools/local-assistance?from_mobile=true',
              linkName: 'sba local assistance'
            },
            {
              url: 'https://www.sba.gov/tools/sizeup?from_mobile=true',
              linkName: 'sba analyze your business '
            }
          ]
        }
      ]
    },

    {
      questionTitle: 'Market and Competition',
      questionParagraph:
        'Do you know the market and competition for your business?',
      answers: [
        {
          answerTitle: 'yes'
        },
        {
          answerTitle: 'no',
          nextBool: 'true',
          resourceTitle: 'Market research and competitive analysis',
          resourceParagraph:
            'Market research helps you find customers for your business. Competitive analysis helps you make your business unique. Combine them to find a competitive advantage for your small business. These resources from the SBA will help you to: Use market research to find customers, Use competitive analysis to find a market advantage, Free small business data and trends.',
          resourceLinks: [
            {
              url:
                'https://www.sba.gov/business-guide/plan/market-research-competitive-analysis',
              linkName: 'sba research and competitive analysis'
            },
            {
              url:
                'https://www.sba.gov/tools/local-assistance?from_mobile=true',
              linkName: 'sba local assistance'
            },
            {
              url: 'https://www.sba.gov/tools/sizeup?from_mobile=true',
              linkName: 'sba analyze your business '
            }
          ]
        },
        {
          answerTitle: 'unsure',
          nextBool: 'true',
          resourceTitle: 'Market research and competitive analysis',
          resourceParagraph:
            'Market research helps you find customers for your business. Competitive analysis helps you make your business unique. Combine them to find a competitive advantage for your small business. These resources from the SBA will help you to: Use market research to find customers, Use competitive analysis to find a market advantage, Free small business data and trends.',
          resourceLinks: [
            {
              url:
                'https://www.sba.gov/business-guide/plan/market-research-competitive-analysis',
              linkName: 'sba research and competitive analysis'
            },
            {
              url:
                'https://www.sba.gov/tools/local-assistance?from_mobile=true',
              linkName: 'sba local assistance'
            },
            {
              url: 'https://www.sba.gov/tools/sizeup?from_mobile=true',
              linkName: 'sba analyze your business '
            }
          ]
        }
      ]
    },
    {
      questionTitle: 'Business Plan',
      questionParagraph: ' Do you have a business plan?',
      answers: [
        { answerTitle: 'yes' },
        {
          answerTitle: 'no',
          nextBool: 'true',
          resourceTitle: 'Create a business plan',
          resourceParagraph:
            'Your business plan is the foundation of your business. Learn how to write a business plan quickly and efficiently with a business plan template. These resources from the SBA will help you learn how: Business plans help you run your business, Pick a business plan format that works for you. ',
          resourceLinks: [
            {
              url:
                '"https://www.sba.gov/business-guide/plan/write-your-business-plan-template',
              linkName: 'sba business plan guide'
            },
            {
              url: 'https://strategyzer.com/canvas/business-model-canvas',
              linkName: 'sba business plan build '
            },
            {
              url: 'https://www.sba.gov/tools/business-plan/1?from_mobile=true',
              linkName: 'strategyzer'
            },
            {
              url:
                'https://www.sba.gov/sites/default/files/2017-09/Sample%20Business%20Plan%20-%20We%20Can%20Do%20It%20Consulting.doc',

              linkName: 'sba consulting'
            },
            {
              url:
                'https://www.sba.gov/sites/default/files/2017-09/Sample%20Business%20Plan%20-%20Wooden%20Grain%20Toy%20Company.doc',
              linkName: 'sba company'
            }
          ]
        },
        {
          answerTitle: 'unsure',
          nextBool: 'true',
          resourceTitle: 'Create a business plan',
          resourceParagraph:
            'Your business plan is the foundation of your business. Learn how to write a business plan quickly and efficiently with a business plan template. These resources from the SBA will help you learn how: Business plans help you run your business, Pick a business plan format that works for you. ',
          resourceLinks: [
            {
              url:
                '"https://www.sba.gov/business-guide/plan/write-your-business-plan-template',
              linkName: 'sba business plan guide'
            },
            {
              url: 'https://strategyzer.com/canvas/business-model-canvas',
              linkName: 'sba business plan build '
            },
            {
              url: 'https://www.sba.gov/tools/business-plan/1?from_mobile=true',
              linkName: 'strategyzer'
            },
            {
              url:
                'https://www.sba.gov/sites/default/files/2017-09/Sample%20Business%20Plan%20-%20We%20Can%20Do%20It%20Consulting.doc',

              linkName: 'sba consulting'
            },
            {
              url:
                'https://www.sba.gov/sites/default/files/2017-09/Sample%20Business%20Plan%20-%20Wooden%20Grain%20Toy%20Company.doc',
              linkName: 'sba company'
            }
          ]
        }
      ]
    },
    {
      questionTitle: 'Startup Costs',
      questionParagraph: 'Do you know your startup costs?',
      answers: [
        { answerTitle: 'yes' },
        {
          answerTitle: 'no',
          nextBool: 'true',
          resourceTitle: 'Calculate Startup costs',
          resourceParagraph:
            'How much money will it take to start your small business? Calculate the startup costs for your small business so you can request funding, attract investors, and estimate when you�ll turn a profit. These resources from the SBA will help:',
          resourceLinks: [
            {
              url:
                'https://www.sba.gov/business-guide/plan/calculate-startup-costs-small-business',
              linkName: 'sba startup costs'
            }
          ]
        },
        {
          answerTitle: 'unsure',
          nextBool: 'true',
          resourceTitle: 'Calculate Startup costs',
          resourceParagraph:
            'How much money will it take to start your small business? Calculate the startup costs for your small business so you can request funding, attract investors, and estimate when you�ll turn a profit. These resources from the SBA will help:',
          resourceLinks: [
            {
              url:
                'https://www.sba.gov/business-guide/plan/calculate-startup-costs-small-business',
              linkName: 'sba startup costs'
            }
          ]
        }
      ]
    },
    {
      questionTitle: 'Business Funding',
      questionParagraph: 'Do you know how you will fund your business?',
      answers: [
        { answerTitle: 'yes' },
        {
          answerTitle: 'no',
          nextBool: 'true',
          resourceTitle: 'Fund your business',
          resourceParagraph:
            'It costs money to start a business. Funding your business is one of the first � and most important � financial choices most business owners make. How you choose to fund your business could affect how you structure and run your business. These resources from the SBA will help: ',
          resourceLinks: [
            {
              url: 'https://www.sba.gov/business-guide/plan/fund-your-business',
              linkName: 'sba fund your business'
            }
          ]
        },
        {
          answerTitle: 'unsure',
          nextBool: 'true',
          resourceTitle: 'Fund your business',
          resourceParagraph:
            'It costs money to start a business. Funding your business is one of the first � and most important � financial choices most business owners make. How you choose to fund your business could affect how you structure and run your business. These resources from the SBA will help: ',
          resourceLinks: [
            {
              url: 'https://www.sba.gov/business-guide/plan/fund-your-business',
              linkName: 'sba fund your business'
            }
          ]
        }
      ]
    },
    {
      questionTitle: 'Buy business or franchise',
      questionParagraph:
        'If you don\'t want to start a business from scratch do you want to buy an existing business or franchise?',
      answers: [
        {
          answerTitle: 'yes',
          nextBool: 'true',
          resourceTitle: 'Buy an existing business or franchise',
          resourceParagraph:
            'It can be hard to start a business from scratch. Starting a business from scratch can be challenging. The good news? You don�t have to start from scratch to have your own business. Consider franchising or buying an existing business. This resource from the SBA will help you learn about buying an existing business or franchise. ',
          resourceLinks: [
            {
              url:
                'https://www.sba.gov/business-guide/plan/buy-existing-business-franchise',
              linkName: 'sba buy existing franchise or business'
            }
          ]
        },
        { answerTitle: 'no' },
        {
          answerTitle: 'unsure',
          nextBool: 'true',
          resourceTitle: 'Buy an existing business or franchise',
          resourceParagraph:
            'It can be hard to start a business from scratch. Starting a business from scratch can be challenging. The good news? You don�t have to start from scratch to have your own business. Consider franchising or buying an existing business. This resource from the SBA will help you learn about buying an existing business or franchise. ',
          resourceLinks: [
            {
              url:
                'https://www.sba.gov/business-guide/plan/buy-existing-business-franchise',
              linkName: 'sba buy existing franchise or business'
            }
          ]
        }
      ]
    },
    {
      questionTitle: 'Business location',
      questionParagraph: 'Do you know where will your business be located?',
      answers: [
        { answerTitle: 'yes' },
        {
          answerTitle: 'no',
          nextBool: 'true',
          resourceTitle: 'Choose your business location',
          resourceParagraph:
            'Your business location determines the taxes, zoning laws, and regulations your business will be subject to. You\'ll need to make a strategic decision about which state, city, and neighborhood you choose to start your business in. This resource from the SBA will help: Research the best place to locate your business ',
          resourceLinks: [
            {
              url: '',
              linkName: 'sba pick location'
            }
          ]
        },
        {
          answerTitle: 'unsure',
          nextBool: 'true',
          resourceTitle: 'Choose your business location',
          resourceParagraph:
            'Your business location determines the taxes, zoning laws, and regulations your business will be subject to. You\'ll need to make a strategic decision about which state, city, and neighborhood you choose to start your business in. This resource from the SBA will help: Research the best place to locate your business ',
          resourceLinks: [
            {
              url: '',
              linkName: 'sba pick location'
            }
          ]
        }
      ]
    },
    {
      questionTitle: 'Business name',
      questionParagraph: 'Do you have a business name?',
      answers: [
        { answerTitle: 'yes' },
        {
          answerTitle: 'no',
          nextBool: 'true',
          resourceTitle: 'Choose your business name',
          resourceParagraph:
            'You can find the right business name with creativity and market research. Once you�ve picked your name, you should protect it by registering it with the right agencies. This resource from the SBA will help you: Register your business name to protect it',
          resourceLinks: [
            {
              url:
                'https://www.sba.gov/business-guide/launch/choose-your-business-name-register',
              linkName: 'sba pick name'
            }
          ]
        },
        {
          answerTitle: 'unsure',
          nextBool: 'true',
          resourceTitle: 'Choose your business name',
          resourceParagraph:
            'You can find the right business name with creativity and market research. Once you�ve picked your name, you should protect it by registering it with the right agencies. This resource from the SBA will help you: Register your business name to protect it',
          resourceLinks: [
            {
              url:
                'https://www.sba.gov/business-guide/launch/choose-your-business-name-register',
              linkName: 'sba pick name'
            }
          ]
        }
      ]
    },
    {
      questionTitle: 'Business Registration',
      questionParagraph: 'Have you registered your business?',
      answers: [
        { answerTitle: 'yes' },
        {
          answerTitle: 'no',
          nextBool: 'true',
          resourceTitle: 'Register your business',
          resourceParagraph:
            'Register your business to make it a distinct legal entity. How and where you need to register depends on your business structure and business location. This resource from the SBA will help you: ',
          resourceLinks: [
            {
              url:
                'https://www.sba.gov/business-guide/launch/register-your-business-federal-state-agency',
              linkName: 'sba register business'
            }
          ]
        },
        {
          answerTitle: 'unsure',
          nextBool: 'true',
          resourceTitle: 'Register your business',
          resourceParagraph:
            'Register your business to make it a distinct legal entity. How and where you need to register depends on your business structure and business location. This resource from the SBA will help you: ',
          resourceLinks: [
            {
              url:
                'https://www.sba.gov/business-guide/launch/register-your-business-federal-state-agency',
              linkName: 'sba register business'
            }
          ]
        }
      ]
    },
    {
      questionTitle: 'Federal and State tax ID\'s',
      questionParagraph: 'Do you have federal and state tax Id numbers?',
      answers: [
        { answerTitle: 'yes' },
        {
          answerTitle: 'no',
          nextBool: 'true',
          resourceTitle: 'Get Federal and State Tax Id numbers',
          resourceParagraph:
            'Your Employer Identification Number (EIN) is your federal tax ID. You need it to pay federal taxes, hire employees, open a bank account, and apply for business licenses and permits. It\'s free to apply for an EIN, and you should do it right after you register your business.',
          resourceLinks: [
            {
              url:
                'https://www.sba.gov/business-guide/launch/get-federal-state-tax-id-number-ein',
              linkName: 'sba tax info'
            }
          ]
        },
        {
          answerTitle: 'unsure',
          nextBool: 'true',
          resourceTitle: 'Get Federal and State Tax Id numbers',
          resourceParagraph:
            'Your Employer Identification Number (EIN) is your federal tax ID. You need it to pay federal taxes, hire employees, open a bank account, and apply for business licenses and permits. It\'s free to apply for an EIN, and you should do it right after you register your business.',
          resourceLinks: [
            {
              url:
                'https://www.sba.gov/business-guide/launch/get-federal-state-tax-id-number-ein',
              linkName: 'sba tax info'
            }
          ]
        }
      ]
    },
    {
      questionTitle: 'Licenses and Permits',
      questionParagraph: 'Have you applied for licenses and permits?',
      answers: [
        {
          answerTitle: 'yes'
        },
        {
          answerTitle: 'no',
          nextBool: 'true',
          resourceTitle: 'Apply for licenses and permits',
          resourceParagraph:
            'Most small businesses need a combination of licenses and permits from both federal and state agencies. The requirements � and fees � vary based on your business activities, location, and government rules.',
          resourceLinks: [
            {
              url:
                'https://www.sba.gov/business-guide/launch/apply-for-licenses-permits-federal-state',
              linkName: 'sba licenses and permits'
            }
          ]
        },
        {
          answerTitle: 'unsure',
          nextBool: 'true',
          resourceTitle: 'Apply for licenses and permits',
          resourceParagraph:
            'Most small businesses need a combination of licenses and permits from both federal and state agencies. The requirements � and fees � vary based on your business activities, location, and government rules.',
          resourceLinks: [
            {
              url:
                'https://www.sba.gov/business-guide/launch/apply-for-licenses-permits-federal-state',
              linkName: 'sba licenses and permits'
            }
          ]
        }
      ]
    },
    {
      questionTitle: 'Bank Account',
      questionParagraph: 'Do you have a business bank account?',
      answers: [
        { answerTitle: 'yes' },
        {
          answerTitle: 'no',
          nextBool: 'true',
          resourceTitle: 'Open a business bank account',
          resourceParagraph:
            'Open a business account when you\'re ready to start accepting or spending money as your business. A business bank account helps you stay legally compliant and protected. It also provides benefits to your customers and employees.',
          resourceLinks: [
            {
              url:
                'https://www.sba.gov/business-guide/launch/open-business-bank-account-fees-benefits',
              linkName: 'sba business bank account'
            }
          ]
        },
        {
          answerTitle: 'unsure',
          nextBool: 'true',
          resourceTitle: 'Open a business bank account',
          resourceParagraph:
            'Open a business account when you\'re ready to start accepting or spending money as your business. A business bank account helps you stay legally compliant and protected. It also provides benefits to your customers and employees.',
          resourceLinks: [
            {
              url:
                'https://www.sba.gov/business-guide/launch/open-business-bank-account-fees-benefits',
              linkName: 'sba business bank account'
            }
          ]
        }
      ]
    },
    {
      questionTitle: 'Business Insurance',
      questionParagraph: 'Do you have business insurance?',
      answers: [
        { answerTitle: 'yes' },
        {
          answerTitle: 'no',
          nextBool: 'true',
          resourceTitle: 'Get Business Insurance',
          resourceParagraph:
            'Business insurance protects you from the unexpected costs of running a business. Accidents, natural disasters, and lawsuits could run you out of business if you�re not protected with the right insurance.',
          resourceLinks: [
            {
              url:
                'https://www.sba.gov/business-guide/launch/get-business-insurance-assets-liability',
              linkName: 'sba business insurance'
            }
          ]
        },
        {
          answerTitle: 'unsure',
          nextBool: 'true',
          resourceTitle: 'Get Business Insurance',
          resourceParagraph:
            'Business insurance protects you from the unexpected costs of running a business. Accidents, natural disasters, and lawsuits could run you out of business if you�re not protected with the right insurance.',
          resourceLinks: [
            {
              url:
                'https://www.sba.gov/business-guide/launch/get-business-insurance-assets-liability',
              linkName: 'sba business insurance'
            }
          ]
        }
      ]
    }
  ];

  render(json);
});
