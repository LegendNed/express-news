const requiredKeys = ['status', 'message']
exports.isErrorObject = (object) => {
    let keys = Object.keys(object)

    return keys.every(key => requiredKeys.includes(key))
}