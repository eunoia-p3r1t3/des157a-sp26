( function(){
    'use strict';
    console.log('Reading JS');

    const myForm = document.querySelector('#myform');
    const myMadlib = document.querySelector('#madlib');
    const formData = document.querySelectorAll('input[type=text]');

    myForm.addEventListener('submit', function (event) {
        event.preventDefault();
        processFormData(formData);
    });
    
    function processFormData(formData){
        const words = [];
        const emptyfields = [];
        let counter = 0;

        for(const eachWord of formData){
            if(eachWord.value){
                words.push(eachWord.value);
            }
            else{
                emptyfields.push(counter);
            }
            counter++;
        }
        if(emptyfields.length > 0){
            showErrors(formData, emptyfields);
        }
        else{
            makeMadlib(words);
        }
    }
    const errorId ='';
    const errorText = `Please fill out this field ${errorId}`;

    function showErrors(formData, emptyfields) {
        const errorId = formData[emptyfields[0]].id;
        myMadlib.innerHTML = errorText;
        document.querySelector (`#$errorId`).focus();   
    }

    function makeMadlib(words){
        const myTextOne = `<p>Hello there ${words[0]} Humans,</p>

        <p>We come from the far away planet of ${words[1]}. We aliens have come ${words[2]} to your ${words[3]} planet and hope to ${words[4]} become a part of your world, and pose as ${words[5]} in order to learn more about your society. We really want to use this information in order to ${words[6]} and make our home planet much more ${words[7]}. Our reasoning for this is that ${words[8]} years ago our planet was overrun by ${words[9]} ${words[10]}, and made all of our ${words[11]}, lose their ${words[12]}. We really hope that you can understand and accept us during our visit.</p>
        
        <p>Wishing you the best,</p>
        <p>Your friendly galactic Alien</p>`;
        myMadlib.innerHTML = myTextOne;
        for(const eachField of formData){
            eachField.value = '';
        }
    }
} )();