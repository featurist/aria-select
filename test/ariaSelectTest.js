const select = require('..')
const roles = require('../roles')

process.exit = function(code) {}

function findIn(html, scope) {
  const div = document.createElement('div')
  document.body.appendChild(div)
  div.innerHTML = html
  div.style.display = 'none'
  return div.querySelectorAll(scope.selector)
}

function tagNamesIn(html, scope) {
  return [].slice.apply(findIn(html, scope)).map(element => element.tagName)
}

module.exports = describe => {

  describe(
    () => select.contentinfo.selector,
    it => it.equals('footer, [role="contentinfo"]')
  )

  describe(
    () => select.region.contentinfo.selector,
    it => it.equals('div footer, frame footer, section footer, [role="region"] footer, div [role="contentinfo"], frame [role="contentinfo"], section [role="contentinfo"], [role="region"] [role="contentinfo"]')
  )

  Object.keys(roles).forEach(role => {

    describe(
      `tagNamesIn('<div role="${role}" /><span role="${role}" />', select.${role})`,
      () => tagNamesIn(`<div role="${role}" /><span role="${role}" />`, select[role]),
      it => it.deeplyEquals(['DIV', 'SPAN'])
    )

    const roleExamples = {
      'input[type="submit"]': { html: '<input type="submit" />', tagNames: ['input'] },
      'input[type="reset"]': { html: '<input type="reset" />', tagNames: ['input'] },
      'input[type="image"]': { html: '<input type="image" />', tagNames: ['input'] },
      'input[type="checkbox"]': { html: '<input type="checkbox" />', tagNames: ['input'] },
      'input[type="radio"]': { html: '<input type="radio" />', tagNames: ['input'] },
      'input[type="range"]': { html: '<input type="range" />', tagNames: ['input'] },
      'input[type="text"]': { html: '<input type="text" />', tagNames: ['input'] },
      'input[type="password"]': { html: '<input type="password" />', tagNames: ['input'] },
      'input[type="email"]': { html: '<input type="email" />', tagNames: ['input'] },
      'th[scope="col"]': { html: '<table><tr><th scope="col">col</th></tr></table>', tagNames: ['th'] },
      'a[href]': { html: '<a href />', tagNames: ['a'] },
      'menu[type="list"]': { html: '<menu type="list" />', tagNames: ['menu'] },
      'menu[type="toolbar"]': { html: '<menu type="toolbar" />', tagNames: ['menu'] },
      'tr': { html: '<table><tr><td>ok</td></tr></table>', tagNames: ['tr'] },
      'thead': { html: '<table><thead><tr><td>ok</td></tr></thead></table>', tagNames: ['thead'] },
      'tbody': { html: '<table><tbody><tr><td>ok</td></tr></tbody></table>', tagNames: ['tbody'] },
      'tfoot': { html: '<table><tfoot><tr><td>ok</td></tr></tfoot></table>', tagNames: ['tfoot'] },
      'th[scope="row"]': { html: '<table><tr><th scope="row">row</th></tr></table>', tagNames: ['th'] }
    }

    roles[role].forEach(alias => {
      if (['body', 'frame', 'td'].indexOf(alias) > -1) { return }
      roleExamples[alias] = roleExamples[alias] || { html: `<${alias} />`, tagNames: [alias] }

      const html = roleExamples[alias].html
      const expectedTagNames = roleExamples[alias].tagNames.map(t => t.toUpperCase())

      describe(
        `tagNamesIn('${html}', select.${role}) finds ${JSON.stringify(expectedTagNames)}`,
        () => tagNamesIn(html, select[role]),
        it => it.deeplyEquals(expectedTagNames)
      )
    })
  })

}
