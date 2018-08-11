class Form {
    constructor(data) {
        this.form = data;
        this.error = {};

        for (let curr in this.form) {
            this.error[curr] = ''
        }

        this.submitForm = this.submitForm.bind(this)
        this.updateValue = this.updateValue.bind(this)
        this.fetch = this.fetch.bind(this)
        this.fetchError = this.fetchError.bind(this)
        this.updateError = this.updateError.bind(this)
    }

    // TODO: change to send a validate
    updateError(key, value) {
        this.error[key] = value
    }

    submitForm(callback) {
        callback(this.form)
        this.form = {}
    }

    fetch(key) {
        return this.form[key]
    }

    updateValue(key, newValue) {
        this.form[key] = newValue
        this.error[key] = ''   
    }

    fetchError(key) {
        return this.error[key]
    }
}

export default Form;