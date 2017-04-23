const baseModal = `
<h3 id="mainModalTitle" class="modal-title">{{title}}</h3>

<div id="mainModalContent" class="modal-information">
    <div class='row'>
        {{content}}
    </div>
    <div class="modal-actions">
        {{actions}}
    </div>
</div>
<div id="mainModalFooter" class="modal-footer">
    {{footerActions}}
</div>
`
module.exports = baseModal;
