let formErrors = [];
const WEIBLICH_GESCHLECHT = 'weiblich';
const MAENLICH_GESCHLECHT = 'maennlich';

if (formElement) {
    formElement.addEventListener('submit', function (event) {
        event.preventDefault();
        event.stopPropagation();
        let formValid = validateForm(formElement);
        let formData = prepareFormData(event.target.elements);
        let kalories = 0;

        if (formValid) {
            kalories = calculateCalories(formData);
        }

        let ergebnissKalorien = document.querySelector('.modal-body') || null;

        if (ergebnissKalorien !== null) {
            if (kalories < 1200) {
                ergebnissKalorien.innerHTML = 'Sie sollen mindestens 1200 Kalorien pro Tag essen! Aber villeicht haben Sie etwas falsch eingegeben.'
            } else {
                ergebnissKalorien.innerHTML = 'Sie sollen maximal ' + kalories + ' Kalorien pro Tag essen!'
            }

            openModal();
            showLightbox();

        }

        return false;
    });
}

/**
 * Form validation method
 * @param form - form javascript object
 * @returns {boolean}
 */
validateForm = function (form) {
    let res = true;

    return res;
};

/**
 * Calculation of calories
 * @param formData
 * @returns {number}
 */
calculateCalories = function (formData) {
    let res = 0,
        bmr = 0,
        a, b, c, d;
    let geschlecht = formData['geschlecht'] || null;
    let gewicht = formData['gewicht'] || 0;
    let alter = formData['alter'] || 0;
    let grosse = formData['grosse'] || 0;


    if(geschlecht !== null){
        if(geschlecht === WEIBLICH_GESCHLECHT){
            a = 447.593;
            b = 9.247;
            c = 3.098;
            d = 4.33;
        } else {
            a = 88.362;
            b = 13.397;
            c = 4.799;
            d = 5.677;
        }

        res = Math.round(a + b * gewicht + c * grosse - d * alter);
    }

    return res;
};

/**
 * Preparing data drom form
 * @param formElements
 * @returns {Array}
 */
prepareFormData = function (formElements) {
    let data = [];

    if (formElements) {
        let dataName, dataValue;

        for (let i = 0; i < formElements.length; i++) {
            if(formElements[i].hasAttribute('name')){
                dataName = formElements[i].getAttribute('name');
                dataValue = formElements[i].value;
                data[dataName] = dataValue;
            }
        }
    }

    return data;
};