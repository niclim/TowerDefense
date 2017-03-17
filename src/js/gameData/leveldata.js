var exportData = [],
    currentLevel,
    monsterLookup = [
    {
        type: "basic",
        amount: 10
    },
    {
        type: "fire",
        amount: 10
    },
    {
        type: "ice",
        amount: 8
    },
    {
        type: "light",
        amount: 10
    },
    {
        type: "tank",
        amount: 12
    },
    {
        type: "fast",
        amount: 15
    }
];

for (var i = 0; i < 50; i++) {
    switch (i) {
        case 10:
            currentLevel = {
                type: "boss1",
                amount: 4
            };
            break;
        case 20:
            currentLevel = {
                type: "boss2",
                amount: 2
            };
            break;
        case 30:
            currentLevel = {
                type: "boss3",
                amount: 2
            };
            break;
        case 40:
            currentLevel = {
                type: "boss4",
                amount: 3
            };
            break;
        case 50:
            currentLevel = {
                type: "boss5",
                amount: 3
            };
            break;
        default:
        currentLevel = monsterLookup[i%6];
    }
    exportData.push(currentLevel)
}
module.exports = exportData;
