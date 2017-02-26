module.exports = function (context) {
    return `\
<!doctype html><script>opener.postMessage(${context.state.__flash}, location.origin);close()</script>\
`}


