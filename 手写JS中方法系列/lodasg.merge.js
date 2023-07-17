const getRawType = val => {
    return Object.prototype.toString.call(val).slice(8, -1)
}
const isPlainObject = val => {
    return getRawType(val) === 'Object'
}

const isPlainObjectOrArray = val => {
    return isPlainObject(val) || Array.isArray(val)
}

const merge = (object, ...sources) => {
    for (const source of sources) {
        for (const key in source) {
            if (source[key] === undefined && key in object) {
                continue
            }
            if (isPlainObjectOrArray(source[key])) {
                if (
                    isPlainObjectOrArray(object[key]) &&
                    getRawType(object[key]) === getRawType(source[key])
                ) {
                    if (isPlainObject(object[key])) {
                        merge(object[key], source[key])
                    } else {
                        object[key] = object[key].concat(source[key])
                    }
                } else {
                    object[key] = source[key]
                }
            } else {
                object[key] = source[key]
            }
        }
    }
}
