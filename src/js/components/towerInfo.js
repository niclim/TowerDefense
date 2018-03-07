const towerInfo = `
<h2 class="capitalize">{{title}}</h2>
<div class="row">
    <div class="col s6 info-box">
    	<div class="capitalize"><strong>Damage:</strong><br> {{towerDmg}}</div>
    	<div class="capitalize"><strong>Travel Time:</strong><br> {{towerTravel}}</div>
    	<div class="capitalize"><strong>Cost:</strong><br> {{towerCost}}</div>
        <div class="capitalize"><strong>Effect:</strong><br> {{towerEffect}}</div>
    </div>
    <div class="col s6 info-box">
    	<div class="capitalize"><strong>Attack Speed:</strong><br> {{towerSpeed}}</div>
    	<div class="capitalize"><strong>Range:</strong><br> {{towerRange}}</div>
    	<div class="capitalize"><strong>Targets:</strong><br> {{towerTargets}}</div>
        <div class="capitalize"><strong>Type:</strong><br> {{towerType}}</div>
    </div>
</div>
`
module.exports = towerInfo
