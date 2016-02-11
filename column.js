function Column() {
    var domNode;
    var groups = [];

    function template () {
        var column = document.createElement('div');
        column.classList.add('Cards-column');
        column.dataset.column = '';

        var groups = document.createElement('div');
        groups.dataset.groups = '';

        var addGroupButton = document.createElement('div');
        addGroupButton.classList.add('Cards-addGroupButton');
        addGroupButton.dataset.addGroupButton = '';
        addGroupButton.addEventListener('click', addGroupListener);

        column.appendChild(groups);
        column.appendChild(addGroupButton);

        return column;
    }

    function addGroupListener(event) {
        addGroup(Group('New Group'));
    }

    function addGroup(group) {
        groups.push(group);
        getDomNode().querySelector('[data-groups]').appendChild(group.getDomNode());
        db().sync();

        return self;
    }

    function getDomNode() {
        if (!domNode) {
            domNode = template();
        }

        return domNode;
    }

    var self = {
        addGroup: addGroup,
        getDomNode: getDomNode,
        toJSON: function () {
            return {
                groups: groups,
            };
        },
    };

    return self;
}
