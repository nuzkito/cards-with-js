function Group(title) {
    var domNode;
    var cards = [];

    function template(title) {
        var group = document.createElement('div');
        group.classList.add('Cards-group');
        group.dataset.group = true;

        var cardsHeader = document.createElement('div');
        cardsHeader.classList.add('Cards-header');
        cardsHeader.addEventListener('dblclick', editTitleListener);

        var cardsTitle = document.createElement('h2');
        cardsTitle.classList.add('Cards-title');
        cardsTitle.dataset.cardsTitle = '';
        cardsTitle.textContent = title;

        var cardsTitleInput = document.createElement('input');
        cardsTitleInput.classList.add('is-hidden');
        cardsTitleInput.dataset.cardsTitleInput = '';
        cardsTitleInput.value = title;
        cardsTitleInput.addEventListener('keydown', inputTitleListener);

        cardsHeader.appendChild(cardsTitle);
        cardsHeader.appendChild(cardsTitleInput);

        var cardsList = document.createElement('div');
        cardsList.classList.add('Cards-list');
        cardsList.dataset.cardsList = '';

        var addCardButton = document.createElement('div');
        addCardButton.classList.add('Cards-addCardButton');
        addCardButton.dataset.addCardButton = '';
        addCardButton.addEventListener('click', addCardListener);

        group.appendChild(cardsHeader);
        group.appendChild(cardsList);
        group.appendChild(addCardButton);

        return group;
    }

    function addCardListener(event) {
        addCard(Card('New Card'));
    }

    function editTitleListener(event) {
        domNode.querySelector('[data-cards-title]').classList.add('is-hidden');
        domNode.querySelector('[data-cards-title-input]').classList.remove('is-hidden');
        domNode.querySelector('[data-cards-title-input]').select();
    }

    function inputTitleListener(event) {
        var cardsTitleInput = domNode.querySelector('[data-cards-title-input]');
        var cardsTitle = domNode.querySelector('[data-cards-title]');

        if (event.which == 13 || event.which == 27) {
            cardsTitleInput.blur();
            cardsTitle.classList.remove('is-hidden');
            cardsTitleInput.classList.add('is-hidden');
        }

        if (event.which == 13) {
            title = cardsTitleInput.value;
            cardsTitle.textContent = title;
            db().sync();
        }

        if (event.which == 27) {
            cardsTitleInput.value = title;
        }
    }

    function addCard(card) {
        cards.push(card);
        getDomNode().querySelector('[data-cards-list]').appendChild(card.getDomNode());
        db().sync();

        return self;
    }

    function getDomNode() {
        if (!domNode) {
            domNode = template(title);
        }

        return domNode;
    }

    var self = {
        getDomNode: getDomNode,
        addCard: addCard,
        toJSON: function () {
            return {
                title: title,
                cards: cards,
            };
        },
    };

    return self;
}
