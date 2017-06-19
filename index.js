const roles = require('./roles')

function ElementScope(path) {
  this.path = path || []
}

Object.defineProperty(ElementScope.prototype, 'selector', {
  get: function() {
    return this.path.join(', ')
  }
})

Object.keys(roles).forEach(role => {
  const selectors = roles[role].concat([`[role="${role}"]`])
  Object.defineProperty(ElementScope.prototype, role, {
    get: function() {
      return this.childScope(selectors)
    }
  })
})

ElementScope.prototype.childScope = function(selectors) {
  const childPath = []

  selectors.forEach(selector => {
    if (this.path.length == 0) {
      childPath.push(selector)
    }
    this.path.forEach(pathlet => {
      childPath.push(pathlet + ' ' + selector)
    })
  })
  return new ElementScope(childPath)
}

module.exports = new ElementScope()
