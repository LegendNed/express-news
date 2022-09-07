const requiredKeys = ['status', 'message']
exports.isErrorObject = (object) => {
    let keys = Object.keys(object)

    return requiredKeys.every(key => keys.includes(key))
}

exports.POSTIVE_INT_REGEX = /^\+?(0|[1-9]\d*)$/
