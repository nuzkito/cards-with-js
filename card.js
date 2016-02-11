function Card(text) {
    var domNode;

    function template(text) {
        var card = document.createElement('div');
        card.classList.add('Cards-card');
        card.dataset.card = '';

        var cardText = document.createElement('p');
        cardText.classList.add('Cards-cardText');
        cardText.dataset.cardText = '';
        cardText.textContent = text;

        var cardTextInput = document.createElement('input');
        cardTextInput.classList.add('Cards-cardTextInput');
        cardTextInput.classList.add('is-hidden');
        cardTextInput.dataset.cardTextInput = '';
        cardTextInput.value = text;
        cardTextInput.addEventListener('keydown', inputTextCardListener);

        card.appendChild(cardText);
        card.appendChild(cardTextInput);
        card.addEventListener('dblclick', editTextCardListener);

        return card;
    }

    function editTextCardListener(event) {
        domNode.querySelector('[data-card-text]').classList.add('is-hidden');
        var cardTextInput = domNode.querySelector('[data-card-text-input]');
        cardTextInput.classList.remove('is-hidden');
        cardTextInput.select();
    }

    function inputTextCardListener(event) {
        var cardTextInput = domNode.querySelector('[data-card-text-input]');
        var cardText = domNode.querySelector('[data-card-text]');

        if (event.which == 13 || event.which == 27) {
            cardTextInput.blur();
            cardText.classList.remove('is-hidden');
            cardTextInput.classList.add('is-hidden');
        }

        if (event.which == 13) {
            text = cardTextInput.value;
            cardText.textContent = text;
            db().sync();
        }

        if (event.which == 27) {
            cardTextInput.value = text;
        }
    }

    function getDomNode() {
        if (!domNode) {
            domNode = template(text);
        }

        return domNode;
    }

    var self = {
        getDomNode: getDomNode,
        toJSON: function () {
            return {
                text: text,
            };
        },
    };

    return self;
}
