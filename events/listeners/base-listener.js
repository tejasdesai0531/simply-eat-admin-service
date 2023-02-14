class Listner {

    constructor(client) {
        this.client = client
    }

    getSubject() {
        throw new Error("Method 'getSubject()' must be implemented.");
    }

    onMessage() {
        throw new Error("Method 'onMessage()' must be implemented.");
    }

    listen() {
        const opts = this.client.subscriptionOptions()
                                .setManualAckMode(true)
                                .setAckWait(5000)
        const subcription = this.client.subscribe(
            this.getSubject(),
            opts
        )

        subcription.on('message', (msg) => {
            console.log('Message Recived : ', msg.getSubject())

            const parsedData = this.parseMessage(msg)
            this.onMessage(parsedData, msg)
        })
    }

    parseMessage(msg) {
        const data = msg.getData();
        try {
            return typeof data === 'string'
                ? JSON.parse(data)
                : JSON.parse(data.toString('utf8'))
        } catch (err) {
            return data
        }
    }
}

module.exports = Listner