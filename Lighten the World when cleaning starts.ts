if (GoogleTasks.taskCompleted.Title === "My robot started a job!") {
    GoogleTasks.addTaskToTasklist.skip()
    Hue.turnOnAllHue.skip()
} {
    var lightsArray = Hue.getLights
    var triggerAction = false

    for (let i = 0; i < lightsArray.length; i++) {
        if (lightsArray[i].Status === "off") {
            triggerAction = true
            break
        }
    }

    var note = new String()
    if (triggerAction) {
        lightsArray.forEach((light) => {
            note = note + light.Id + ";" + light.Name + ";" + light.Status + "\n"
        })

        GoogleTasks.addTaskToTasklist.setTaskNotes(note.toString())
    } else {
        GoogleTasks.addTaskToTasklist.setTaskNotes("No trigger")
    }
}