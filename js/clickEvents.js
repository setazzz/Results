/**
 * Created by Matas on 2017.08.08.
 */

// result button click event
// marks the selected result with a className 'Y'
// TODO !!! Bonus does not work. next/previous should be changed
$('ol').click(function (e) {
    console.log(e.target.tagName);
    if (e.target.tagName === 'BUTTON') {
        const button = e.target;
        const li = button.parentNode;
        const ul = li.parentNode;
        const action = button.textContent;
        const nameActions = {
            Flash: function () {
                if (!button.classList.contains('y')) {
                    if (button.nextElementSibling.classList.contains('y')) {
                        button.nextElementSibling.classList.remove('y');
                        scoreTop--;
                    }
                    button.classList.add('y');
                    scoreTop++;
                    scoreFlash++;
                } else {
                    button.classList.remove('y');
                    scoreTop--;
                    scoreFlash--;
                }
            },
            Top: function () {
                if (!button.classList.contains('y')) {
                    if (button.previousElementSibling.classList.contains('y')) {
                        button.previousElementSibling.classList.remove('y');
                        scoreFlash--;
                        scoreTop--;
                    }
                    button.classList.add('y');
                    scoreTop++;
                } else {
                    button.classList.remove('y');
                    scoreTop--;
                }
            },
            Bonus: function () {
            }
        }
        nameActions[action]();
        $('.score').html(scoreDisplay(scoreFlash, scoreTop));
    }
}); //end button click

// submit button click event
// creates a json string and saves it
$('.submit').click(function() {
    var output = {name: climberName, result: []};
    var listItems = this.parentNode.parentNode.childNodes[3].childNodes[0];
    var climberName = document.getElementById("userName").value;
    output.name = climberName;
    for (var i = 0; i < numberOfRoutes; i++) {
        var singleLi = listItems.childNodes[i];
        if (singleLi.childNodes[0].classList.contains('y')) {
            output.result.push(1);
        } else if (singleLi.childNodes[1].classList.contains('y')) {
            output.result.push(2);
        } else if (singleLi.childNodes[2]) {
            if (singleLi.childNodes[2].classList.contains('y')) {
                output.result.push(3);
            }
        } else {
            output.result.push(4);
        }
    }

    console.log('submit clicked');
    console.log(climberName);
    // Post results to saveResults.php
    $.ajax({
        type: 'POST',
        url: 'saveResults.php',
        data: {'output': output},
        success: function(msg) {
            alert(msg);
        },
        failure: function (errMsg) {
            alert(errMsg + 'lai');
        }
    });
}); //end submit click

// clear button click event
// clears everything
$('.clear').click(function() {
    var listItems = this.parentNode.parentNode.childNodes[3].childNodes[0];
    for (var i = 0; i < numberOfRoutes; i++) {
        var singleLi = listItems.childNodes[i];
        if (singleLi.childNodes[0].classList.contains('y')) {
            singleLi.childNodes[0].classList.remove('y');
        } else if (singleLi.childNodes[1].classList.contains('y')) {
            singleLi.childNodes[1].classList.remove('y');
        } else if (singleLi.childNodes[2]) {
            if (singleLi.childNodes[2].classList.contains('y')) {
                singleLi.childNodes[2].classList.remove('y');
            }
        }
    }
    $('.score').html(scoreDisplay(scoreFlash = 0, scoreTop = 0));
}); //end clear click