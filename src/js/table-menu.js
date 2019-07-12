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

        table.classList.add('table-hover');
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

        let theadCell3 = tr.insertCell(2);
        theadCell3.innerHTML = "Mittagessen";

        let theadCell4 = tr.insertCell(3);
        theadCell4.innerHTML = "Abensessen";

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

            let image1 = document.createElement('img');
            let image2 = document.createElement('img');
            let image3 = document.createElement('img');

            image1.setAttribute('src', '/img/image' + menuObject[i].fruestueck.photoId + '.jpg');
            image1.classList.add('img-fluid');
            image2.setAttribute('src', '/img/image' + menuObject[i].mittag.photoId + '.jpg');
            image2.classList.add('img-fluid');
            image3.setAttribute('src','/img/image' + menuObject[i].abend.photoId + '.jpg');
            image3.classList.add('img-fluid');

            cell0.innerHTML = "Tag " + (tag);
            cell0.classList.add('w-10');

            cell1.innerHTML = image1.outerHTML + menuObject[i].fruestueck.name;
            cell1.classList.add('w-30');

            cell2.innerHTML = image2.outerHTML + menuObject[i].mittag.name;
            cell2.classList.add('w-30');

            cell3.innerHTML = image3.outerHTML + menuObject[i].abend.name;
            cell3.classList.add('w-30');

            tbody.appendChild(trBody);
        }

        table.appendChild(tbody);

    }


    return block;
};
