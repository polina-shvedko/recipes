let formErrors = [];
const WEIBLICH_GESCHLECHT = 'weiblich';
const MAENLICH_GESCHLECHT = 'maennlich';

const ERGEBNIS_ZUNEHMEN = 1;
const ERGEBNIS_ABNEHMEN = 2;
const ERGEBNIS_BLEIBEN = 3;

const AKTIVITAT_MANGEL = '1';
const AKTIVITAT_MASSIGE = '2';
const AKTIVITAT_MITTLERE = '3';
const AKTIVITAT_SEHR_AKTIVE = '4';
const AKTIVITAT_SPORTLER = '5';

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

getAktivitaet = function (aktivitaet) {

    switch (aktivitaet) {
        case AKTIVITAT_MANGEL:
            return 1.2;
        case AKTIVITAT_MASSIGE:
            return 1.375;
        case AKTIVITAT_MITTLERE:
                return 1.55;
        case AKTIVITAT_SEHR_AKTIVE:
            return 1.725;
        case AKTIVITAT_SPORTLER:
            return 1.9;
    }
};

/**
 * Calculation of calories
 * @param formData
 * @returns {number}
 */
calculateCalories = function (formData) {
    let res = 0,
        bmr = 0,
        a, b, c, d, amr;
    let geschlecht = formData['geschlecht'] || null;
    let gewicht = formData['gewicht'] || 0;
    let alter = formData['alter'] || 0;
    let grosse = formData['grosse'] || 0;
    let aktivitaet = formData['aktivitaet'] || 0;

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

        bmr = a + b * gewicht + c * grosse - d * alter;
        amr = getAktivitaet(aktivitaet);

        res = Math.round(bmr * amr);
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
                if(formElements[i].hasAttribute('type') && formElements[i].getAttribute('type') === 'radio'
                    && formElements[i].hasAttribute('checked') && formElements[i].getAttribute('checked') === 'checked'){
                    dataName = formElements[i].getAttribute('name');
                    dataValue = formElements[i].value;
                } else if(formElements[i].hasAttribute('type') && formElements[i].getAttribute('type') !== 'radio' && formElements[i].tagName !== 'select'){
                    dataName = formElements[i].getAttribute('name');
                    dataValue = formElements[i].value;
                } else if (formElements[i].tagName.toLocaleLowerCase() === 'select'){
                    dataValue = formElements[i].options[formElements[i].selectedIndex].value;
                    dataName = formElements[i].getAttribute('name');
                }
                data[dataName] = dataValue;
            }
        }
    }

    return data;
};
