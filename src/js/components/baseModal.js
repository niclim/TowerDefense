var baseModal = `
<h3 id="mainModalTitle" class="modal-title">{{title}}</h3>

<div id="mainModalContent" class="modal-information">
    <div>
        {{content}}
    </div>
    <div class="modal-actions">
        {{actions}}
    </div>
</div>
`

module.exports = baseModal;
