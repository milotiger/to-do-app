let helper = {};

helper.CheckProperties = function (obj, properties_array) {
    obj  = JSON.parse(JSON.stringify(obj));
    for (let i = 0; i < properties_array.length; ++i) {
        if (!obj.hasOwnProperty(properties_array[i] || !obj[properties_array[i]]))
            return false;
    }
    return true;
}

module.exports = helper;