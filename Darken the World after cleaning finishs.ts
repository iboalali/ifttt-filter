if (GoogleTasks.listAllTasks[0].Title !== "My robot started a job!") {
    Hue.turnOffAllHue.skip()
}

var triggerAction = true

let note = GoogleTasks.listAllTasks[0].Notes
let noTrigger = note.match("^No trigger")
if (noTrigger != null && noTrigger.length > 0) {
    triggerAction = false
} else {
    let lightLines = note.split("\n")

    // if at least one office light was on, we do not trigger the action
    for (let i = 0; i < lightLines.length; i++) {
        let splittedLight = lightLines[i].split(";")

        if (splittedLight.length !== 3) {
            continue
        }

        let lightName = splittedLight[1]
        let lightStatus = splittedLight[2]
        let match = lightName.match("Office|^lightstrip")

        if (match != null && match.length > 0 && lightStatus === "on") {
            triggerAction = false
            break
        }
    }
}

if (!triggerAction) {
    Hue.turnOffAllHue.skip()
}