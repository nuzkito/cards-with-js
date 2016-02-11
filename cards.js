function Cards(rootNode) {
    var domNode;
    var columns = [];

    init(rootNode);

    function addColumnListener(event) {
        addColumn(Column().addGroup(Group('New Group')));
    }

    function addColumn(column) {
        columns.push(column);
        domNode.querySelector('[data-columns]').appendChild(column.getDomNode());
        db().sync();

        return self;
    }

    function init(rootNode) {
        var columns = document.createElement('div');
        columns.classList.add('Cards-columns');
        columns.dataset.columns = '';
        rootNode.appendChild(columns);

        var addColumnButton = document.createElement('div');
        addColumnButton.classList.add('Cards-addColumnButton');
        addColumnButton.dataset.addColumnButton = '';
        addColumnButton.addEventListener('click', addColumnListener);
        rootNode.appendChild(addColumnButton);

        domNode = rootNode;

        return self;
    }

    function setInitialData(data) {
        if (!data) {
            return;
        }

        data.columns.forEach(function (columnData) {
            var column = Column();
            addColumn(column);
            columnData.groups.forEach(function (groupData) {
                var group = Group(groupData.title);
                column.addGroup(group);
                groupData.cards.forEach(function (cardData) {
                    var card = Card(cardData.text);
                    group.addCard(card);
                });
            });
        });
    }

    var self = {
        addColumn: addColumn,
        setInitialData: setInitialData,
        toJSON: function () {
            return {
                columns: columns,
            };
        },
    };

    return self;
}
