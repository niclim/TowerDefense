var upgradePanel = `
<div class="col {{spacing}}">
    <div class="card">
        <div class="card-content">
            <h5 class="card-title capitalize">{{title}}</h5>
            <img src="{{imageSrc}}" class="thumbnail-image">
            {{content}}
        </div>
        <div class="card-action">
            {{actions}}
        </div>
    </div>
</div>

`;

module.exports = upgradePanel;
