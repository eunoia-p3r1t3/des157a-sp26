(function(){
    'use strict'
    console.log('reading js')

    const myBag= document.querySelector('#mainpage');
    
        myBag.addEventListener('click', function(){
            const lookInside = document.querySelector('#bag');

        document.querySelector('#mainpage').style.display ="none";
        
        document.querySelector('#inner').style.display ="block";
        });

        const myDiv = document.querySelector('#new');
        const appear = document.querySelector('#rockout');
        const beGone = document.querySelector('#pods');

        myDiv.addEventListener('mouseover', function(event){
            event.preventDefault();
            appear.className = 'showing';
        });
        beGone.addEventListener('mouseout', function(event){
            event.preventDefault();
            appear.className= 'hidden';
        });
        
        document.querySelector('#emer').addEventListener('click', function(event) {
            event.preventDefault();
            document.querySelector('#overlay').className = 'showing';
        });
        document.querySelector('.close').addEventListener('click', function(event) {
            event.preventDefault();
            document.querySelector('#overlay').className = 'hidden';
        });

        document.addEventListener('keydown', function(event){
            if( event.key === "Escape"){
            document.querySelector('#overlay').className = 'hidden';
            }
        });
        const outline = document.querySelector('#outline')
        outline.addEventListener('mouseover',function(){
            outline.style.opacity = '100%';
        });
        outline.addEventListener('mouseout',function(){
            outline.style.opacity = '0';
        });
         document.querySelector('#outline').addEventListener('click', function(event) {
            event.preventDefault();
            document.querySelector('#overlay2').className = 'showing';
        });
        document.querySelector('.close2').addEventListener('click', function(event) {
            event.preventDefault();
            document.querySelector('#overlay2').className = 'hidden';
        });
})();