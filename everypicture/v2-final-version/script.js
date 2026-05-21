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
        const air =document.querySelector('#pods');

        myDiv.addEventListener('click', function(){
            myDiv.innerHTML= '<img id="pods" src="images/airpods.png" alt="whats in my bag"><img id="rockout" src="images/letsrock.png" alt="whats in my bag">';
        });
        air.addEventListener('click',function(){
            air.innerHTML= '<img id="pods" src="images/airpods.png" alt="whats in my bag"><img ';
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
})();