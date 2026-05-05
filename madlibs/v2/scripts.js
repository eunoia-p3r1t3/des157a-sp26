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
    

    function showErrors(formData, emptyfields) {
        const errorId = formData[emptyfields[0]].id;
        const errorText = `Please fill out this field ${errorId}`;
        myMadlib.innerHTML = errorText;
        document.querySelector (`#${errorId}`).focus();   
    }

    function makeMadlib(words){
        const myTextOne = `<div id="madlib">
                                <div class="image2"><img class="alien" src="images/alien.png" alt="illustrated alien"></div>    
                                <section class="letter">
                                
                                <p>Hello there <span>${words[0]}</span> humans,</p>

                                <p>We come from the far away planet of <span>${words[1]}</span> and hope to <span>${words[2]}</span> become a part of your world, and pose as <span>${words[3]}</span> in order to learn more about your society. We really want to use this information in order to <span>${words[4]}</span> and make our home planet much more <span>${words[5]}</span>. Our reasoning for this is that <span>${words[6]}</span> years ago our planet was overrun by <span>${words[7]}</span> <span>${words[8]}</span> and made all of our <span>${words[9]}</span>, lose their <span>${words[10]}</span>. We really hope that you can understand and accept us during our visit.</p>
        
                                <p>Wishing you the best,</p>
                                <p>Your friendly galactic Alien</p>`;
        
        document.querySelector('#madlib-outputs').style.display ="block";
        document.querySelector('#madlib-questions').style.display ="none";
        
        myMadlib.innerHTML = myTextOne;
        
        for(const eachField of formData){
            eachField.value = '';
        }
        
    }

} )();