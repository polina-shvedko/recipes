let formElement = document.getElementById('form');

if(formElement){
    formElement.addEventListener('submit', function (event) {
        event.preventDefault();
        event.stopPropagation();
        let formValid = validateForm(formElement);
        let formData = prepareFormData(event.target.elements);
        let kalories = 0;

        if(formValid){
            kalories = calculateCalories(formData);
        }

        let ergebnissKalorien = document.getElementById('ergebniss-kalorien') || null;

        if(ergebnissKalorien !== null){
            if(kalories < 1200){
                ergebnissKalorien.innerHTML = 'Sie sollen mindestens 1200 per ein Tag essen! Aber villeicht haben Sie etwas falsch eingegeben.'
            } else {
                ergebnissKalorien.innerHTML = 'Sie sollen maximal ' + kalories + ' per ein Tag essen!'
            }

        }

        return false;
    });
}
