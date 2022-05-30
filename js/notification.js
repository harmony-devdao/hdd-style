var Notification = {
    Type: {
        INFO: "info",
        SUCCESS: "success",
        WARN: "warn",
        ERROR: "error",
    },
    notify(message, { type = this.Type.INFO, duration = 3000 }) {
        
        const notificationContainer = document.querySelector("#notifications")
        if(!notificationContainer) throw new Error("Notifiaction requires a container '#notifications'!")


        let notification = document.createElement("div")
        notification.className = "notification hidden"
        let p = document.createElement("p")
        p.className = "message"
        notification.appendChild(p)
        p.innerText = message
        switch (type) {
            case this.Type.INFO:
            case this.Type.SUCCESS:
            case this.Type.WARN:
            case this.Type.ERROR:
                notification.classList.add(type)
            default:
                console.warn(`Provided type '${type}' does not exist.`)
        }

        
        document.querySelector("#notifications").appendChild(notification)
        setTimeout(() => { notification.classList.remove("hidden") }, 10)
        setTimeout(() => { notification.classList.add("hidden") }, duration + 10)
        setTimeout(() => { notification.classList.add("removing") }, duration + 510)
        setTimeout(() => { notification.remove() }, duration + 1010)
    }
}