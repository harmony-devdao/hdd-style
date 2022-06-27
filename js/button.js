var Button = {
    startWaiting(button) {
        button.classList.add("waiting")
    },
    stopWaiting(button) {
        button.classList.remove("waiting")
    },
    waitForPromise(button, promise) {
        this.startWaiting(button)
        promise.finally(() => {
            this.stopWaiting(button)
        })
    }
}

Window.Button = Button