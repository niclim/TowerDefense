const informationPanel = `
<h2>Information</h2>
<div class="row">
    <h5 id="info-name" class="capitalize">{{title}}</h5>
</div>
<div class="row">
    <img id="info-icon" src="{{imagePath}}" alt="">
</div>
{{content}}
`;

module.exports = informationPanel;
