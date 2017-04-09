var towerInfo = `
<h2 class="capitalize">{{title}}</h2>
<div class="row">
    <div id="info-box-1" class="col s6">
    	<div>Tower Damage: {{towerDmg}}</div>
    	<div>Tower Travel Time:{{towerTravel}}</div>
    	<div>Tower Cost: {{towerCost}}</div>
    </div>
    <div id="info-box-2" class="col s6">
    	<div>Tower Attack Speed: {{towerSpeed}}</div>
    	<div>Tower Range: {{towerRange}}</div>
    	<div>Tower Targets: {{towerTargets}}</div>
    </div>
</div>
`
module.exports = towerInfo;
