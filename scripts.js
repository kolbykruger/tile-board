document.addEventListener('DOMContentLoaded', function() {

    //get url params
    let url = window.location.href;
    let urlObj = new URL(url);
    let letters = urlObj.searchParams.get('letters');
    let extras = urlObj.searchParams.get('extras');
    let glued = urlObj.searchParams.get('glued');
    let vowels = urlObj.searchParams.get('vowels');

    //filter arrays based on nodelist values
    function filterLists(arr, list) {
        list.forEach(function(i) {
            if (arr.indexOf(i.textContent) >= 0) {
                i.parentNode.remove()
            }
        })
    }

    if (letters || extras || glued || vowels) {

        //filter sections based on URL parameters
        if (letters) {
            let arr = letters.split(',');
            let list = document.querySelectorAll('.letters.letters-default .draggable');
            filterLists(arr, list)
            console.log('Hide letters: '+letters)
        }
        if (extras) {
            let arr = extras.split(',');
            let list = document.querySelectorAll('.letters.letters-extras .draggable');
            filterLists(arr, list)
            console.log('Hide extras: '+extras)
        }
        if (glued) {
            let arr = glued.split(',');
            let list = document.querySelectorAll('.letters.letters-extras-green .draggable');
            filterLists(arr, list)
            console.log('Hide glued: '+glued)
        }
        if (vowels) {
            let arr = vowels.split(',');
            let list = document.querySelectorAll('.letters.letters-extras-pink .draggable');
            filterLists(arr, list)
            console.log('Hide vowels: '+vowels)
        }

        //hide options
        document.querySelector('.game-options').remove();
        console.log('Hide options: true');

        //Start Drag/Drop
        initializeDragDrop()
        initializeReset()

    } else {
        //No URL parameters specified, resume as normal
        console.log('No board options provided')
        console.log('Continuing with default settings')
        initializeDragDrop()
        initializeReset()

        //checkbox functionality
        let checkboxSelectAllButtons = document.querySelectorAll('.checkAll');
        checkboxSelectAllButtons.forEach(function(btn) {
            btn.addEventListener('click', function() {
                let ultimateParent = btn.parentNode.parentNode;
                let childInputs = ultimateParent.querySelectorAll('input[type="checkbox"]');
                console.log(childInputs[0])
                if (childInputs[0].checked) {
                    //unckeck all
                    console.log('unckeck all')
                    childInputs.forEach(function(item) {
                        item.checked = false;
                    })
                } else {
                    //check all
                    console.log('check all')
                    childInputs.forEach(function(item) {
                        item.checked = true
                    })
                }
            })
        })

        //Make a game functionality
        var generateGameButton = document.querySelector('#generateGame');
        generateGameButton.addEventListener('click', function() {

            //for default letters
            let optLettersArr = [];
            let optLetters = document.querySelectorAll('.fields.fields-letters input');
            optLetters.forEach(function(item) {
                if (!item.checked) {
                    optLettersArr.push(item.value);
                }
            })

            //for extras
            let optExtrasArr = [];
            let optExtras = document.querySelectorAll('.fields.fields-extras input');
            optExtras.forEach(function(item) {
                if (!item.checked) {
                    optExtrasArr.push(item.value);
                }
            })

            //for glued
            let optGluedArr = [];
            let optGlued = document.querySelectorAll('.fields.fields-extras-glued input');
            optGlued.forEach(function(item) {
                if (!item.checked) {
                    optGluedArr.push(item.value);
                }
            })

            //for vowels
            let optVowelsArr = [];
            let optVowels = document.querySelectorAll('.fields.fields-extras-vowels input');
            optVowels.forEach(function(item) {
                if (!item.checked) {
                    optVowelsArr.push(item.value);
                }
            })

            //generate new URL with parameters
            console.log(window.location.href+'?&letters='+optLettersArr+'&extras='+optExtrasArr+'&glued='+optGluedArr+'&vowels='+optVowelsArr)
            let outputURL = document.getElementById('generatedURL');
            outputURL.value = window.location.href+'?&letters='+optLettersArr+'&extras='+optExtrasArr+'&glued='+optGluedArr+'&vowels='+optVowelsArr;
            outputURL.addEventListener('click', function() {
                this.select();
                document.execCommand('copy');
            })



        })
    }

})


function initializeDragDrop() {
    const containers = document.querySelectorAll('section')

    const droppable = new Draggable.Droppable(containers, {
      draggable: '.draggable',
      droppable: '.droppable',
      mirror: {
          contrainDimensions: true
      }
    });

    console.log('Program initialized successfully!')
}

function initializeReset() {
    var resetButton = document.querySelector('#resetGame');
    resetButton.addEventListener('click', function() {
        location.reload();
    })
}
