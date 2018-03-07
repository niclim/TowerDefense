const towerInfo = `
<h2 class="capitalize">{{title}}</h2>
<div class="row">
    <div class="col s6 info-box">
    	<div class="capitalize"><strong>Tower Damage:</strong><br> {{towerDmg}}</div>
    	<div class="capitalize"><strong>Tower Travel Time:</strong><br> {{towerTravel}}</div>
    	<div class="capitalize"><strong>Tower Cost:</strong><br> {{towerCost}}</div>
        <div class="capitalize"><strong>Tower Effect:</strong><br> {{towerEffect}}</div>
    </div>
    <div class="col s6 info-box">
    	<div class="capitalize"><strong>Tower Attack Speed:</strong><br> {{towerSpeed}}</div>
    	<div class="capitalize"><strong>Tower Range:</strong><br> {{towerRange}}</div>
    	<div class="capitalize"><strong>Tower Targets:</strong><br> {{towerTargets}}</div>
        <div class="capitalize"><strong>Tower Type:</strong><br> {{towerType}}</div>
    </div>
</div>
`
module.exports = towerInfo
