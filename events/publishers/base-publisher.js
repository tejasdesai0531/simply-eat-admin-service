class Publisher {

    constructor(client) {
        this.client = client
    }
    
    getSubject() {
        throw new Error("Method 'getSubject()' must be implemented.");
    }

    publish(data) {
        return new Promise((resolve, reject) => {
            this.client.publish(this.getSubject(), JSON.stringify(data), (err) => {
              if (err) {
                return reject(err);
              }
              console.log('Event published to subject', this.getSubject());
              resolve();
            });
        });
    }
}

module.exports = Publisher