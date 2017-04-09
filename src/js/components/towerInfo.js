var towerInfo = `
<h2 class="capitalize">{{title}}</h2>
<div class="row">
    <div class="col s6 info-box">
    	<div class="capitalize">Tower Damage: {{towerDmg}}</div>
    	<div class="capitalize">Tower Travel Time: {{towerTravel}}</div>
    	<div class="capitalize">Tower Cost: {{towerCost}}</div>
        <div class="capitalize">Tower Effect: {{towerEffect}}</div>
    </div>
    <div class="col s6 info-box">
    	<div class="capitalize">Tower Attack Speed: {{towerSpeed}}</div>
    	<div class="capitalize">Tower Range: {{towerRange}}</div>
    	<div class="capitalize">Tower Targets: {{towerTargets}}</div>
        <div class="capitalize">Tower Type: {{towerType}}</div>
    </div>
</div>
`
module.exports = towerInfo;
