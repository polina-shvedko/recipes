/**
 *
 * @param photoId
 * @returns {HTMLElement}
 */
window.createImg = function(photoId) {
    let image = document.createElement('img');
    image.setAttribute('src', './img/image' + photoId + '.jpg');
    image.classList.add('img-fluid');
    return image;
};

/**
 *
 * @returns {HTMLElement}
 * @param text
 */
window.createHeadline = function(text) {
    let headline = document.createElement('h4');
    headline.innerHTML = text;
    return headline;
};

/**
 *
 * @returns {HTMLElement}
 * @param text
 */
window.createText = function(text) {
    let textTag = document.createElement('p');
    textTag.innerHTML = text;
    return textTag;
};

/**
 *
 * @param object
 * @returns {HTMLElement}
 */
window.createBeschreibung = function(object) {
    let popover = document.createElement('div');
    let popoverHeader = document.createElement('h3');
    let popoverBody = document.createElement('div');
    let ingredientElement = document.createElement('div');
    let ingredients = object.ingredients;
    let ingredientsHtml = '';
    let image = createImg(object.photoId);

    popover.classList.add("popover");
    popover.classList.add("fade");
    popover.classList.add("bs-popover-left");

    popoverHeader.classList.add('popover-header');

    popoverBody.classList.add('popover-body');

    popover.appendChild(popoverHeader);
    popover.appendChild(popoverBody);

    popoverHeader.innerText = object.name;

    ingredientElement.classList.add('mt-3');
    ingredientElement.classList.add('mb-3');
    ingredientElement.classList.add('ingredients');
    ingredientElement.classList.add('text-right');

    let zutatenElement = createText("Zutaten");
    zutatenElement.classList.add('popover-headline');

    ingredientsHtml += zutatenElement.outerHTML;

    if(ingredients.length > 0){
        for(let i = 0; i < ingredients.length; i++){
            let measure = '';
            if(ingredients[i].measure !== 'n/a'){
                measure = ingredients[i].measure;
            }

            let quantity = '';
            if(ingredients[i].quantity !== 'n/a'){
                quantity = ingredients[i].quantity;
            }
            ingredientsHtml += createText(quantity + " " + measure + " " + ingredients[i].name).outerHTML;
        }
    }

    ingredientElement.innerHTML = ingredientsHtml;

    let zubereitungElement = createText("Zubereitung");
    zubereitungElement.classList.add('popover-headline');

    popoverBody.innerHTML = image.outerHTML + ingredientElement.outerHTML + zubereitungElement.outerHTML + object.process;

    return popover;
};

/**
 *
 * @param menuObject
 * @returns {HTMLElement}
 */
window.generateHtmlForMenu = function (menuObject) {
    let block = document.createElement('div');
    if (menuObject.length > 0) {

        let blockCol = document.createElement('div');
        let table = document.createElement('table');

        block.classList.add('row');
        block.classList.add('table');

        blockCol.classList.add('col-12');

        table.classList.add('table');
        table.classList.add('w-100');

        block.appendChild(blockCol);
        blockCol.appendChild(table);

        let thead = document.createElement('thead');
        let tr = document.createElement('tr');

        thead.appendChild(tr);

        let theadCell1 = tr.insertCell(0);
        theadCell1.innerHTML = "";

        let theadCell2 = tr.insertCell(1);
        theadCell2.innerHTML = "Fruhstück";
        theadCell2.classList.add('font-weight-bold');
        theadCell2.classList.add('text-center');

        let theadCell3 = tr.insertCell(2);
        theadCell3.innerHTML = "Mittagessen";
        theadCell3.classList.add('font-weight-bold');
        theadCell3.classList.add('text-center');

        let theadCell4 = tr.insertCell(3);
        theadCell4.innerHTML = "Abensessen";
        theadCell4.classList.add('font-weight-bold');
        theadCell4.classList.add('text-center');

        table.appendChild(thead);

        let tbody = document.createElement('tbody');

        let trBody;
        for (let i = 0; i < menuObject.length; i++) {
            let tag = i+1;

            trBody = document.createElement('tr');

            let cell0 = trBody.insertCell(0);
            let cell1 = trBody.insertCell(1);
            let cell2 = trBody.insertCell(2);
            let cell3 = trBody.insertCell(3);

            let image1 = createImg(menuObject[i].fruestueck.photoId);
            let image2 = createImg(menuObject[i].mittag.photoId);
            let image3 = createImg(menuObject[i].abend.photoId);

            let headline1 = createHeadline(menuObject[i].fruestueck.name);
            let headline2 = createHeadline(menuObject[i].mittag.name);
            let headline3 = createHeadline(menuObject[i].abend.name);

            let weight1 = createText("<i class=\"fas fa-balance-scale\"></i> " + getGerichteWeight(menuObject[i].fruestueck, FRUESTUEK_NAME) + " g");
            let weight2 = createText("<i class=\"fas fa-balance-scale\"></i> " + getGerichteWeight(menuObject[i].mittag, FRUESTUEK_NAME) + " g");
            let weight3 = createText("<i class=\"fas fa-balance-scale\"></i> " + getGerichteWeight(menuObject[i].abend, FRUESTUEK_NAME) + " g");

            let kallorien1 = createText("<i class=\"fas fa-fire-alt\"></i> " + menuObject[i].fruestueck.relative_calories + " kcal pro 100 g");
            let kallorien2 = createText("<i class=\"fas fa-fire-alt\"></i> " + menuObject[i].mittag.relative_calories + " kcal pro 100 g");
            let kallorien3 = createText("<i class=\"fas fa-fire-alt\"></i> " + menuObject[i].abend.relative_calories + " kcal pro 100 g");

            let zeit1 = createText("<i class=\"fas fa-hourglass-start\"></i> " + menuObject[i].fruestueck.time + " min");
            let zeit2 = createText("<i class=\"fas fa-hourglass-start\"></i> " + menuObject[i].mittag.time + " min");
            let zeit3 = createText("<i class=\"fas fa-hourglass-start\"></i> " + menuObject[i].abend.time + " min");

            let process1 = createBeschreibung(menuObject[i].fruestueck);
            let process2 = createBeschreibung(menuObject[i].mittag);
            let process3 = createBeschreibung(menuObject[i].abend);

            cell0.innerHTML = "Tag " + (tag);
            cell0.classList.add('w-10');
            cell0.classList.add('font-weight-bold');
            cell0.classList.add('text-center');

            cell1.innerHTML = image1.outerHTML + headline1.outerHTML + weight1.outerHTML + kallorien1.outerHTML + zeit1.outerHTML + process1.outerHTML;
            cell1.classList.add('w-30');
            cell1.classList.add('menu-item');
            cell1.classList.add('fruestuek');

            cell2.innerHTML = image2.outerHTML + headline2.outerHTML + weight2.outerHTML + kallorien2.outerHTML + zeit2.outerHTML + process2.outerHTML;
            cell2.classList.add('w-30');
            cell2.classList.add('menu-item');
            cell2.classList.add('mittag');

            cell3.innerHTML = image3.outerHTML + headline3.outerHTML + weight3.outerHTML + kallorien3.outerHTML + zeit3.outerHTML + process3.outerHTML;
            cell3.classList.add('w-30');
            cell3.classList.add('menu-item');
            cell3.classList.add('abend');

            tbody.appendChild(trBody);
        }

        table.appendChild(tbody);

    }


    return block;
};

/**
 *
 * @param event
 */
window.showBeschreibung = function (event) {
    let element = event.currentTarget;

    let popover = element.querySelector('.popover');

    if(popover){
        popover.classList.add('show');
    }

    return true;
};

/**
 *
 * @param event
 */
window.hideBeschreibung = function (event) {
    let element = event.currentTarget;

    let popover = element.querySelector('.popover');

    if(popover){
        popover.classList.remove('show');
    }

    return true;
};

/**
 *
 */
window.addEventListenrsForMenus = function(){
    let menuItems = document.querySelectorAll('.menu-item');

    if(menuItems){
        menuItems.forEach(function (element) {
            element.addEventListener('mouseover', showBeschreibung);
            element.addEventListener('mouseleave', hideBeschreibung);
        })
    }
};
