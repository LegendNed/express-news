const requiredKeys = ['status', 'message']
exports.isErrorObject = (object) => {
    let keys = Object.keys(object)

    return requiredKeys.every(key => keys.includes(key))
}