# aria-select

Selects DOM elements using [aria roles](https://www.w3.org/TR/wai-aria/roles)

## Usage

```js
const select = require('aria-select')

assert.equal(
  select.main.navigation,
  '[role="main"] nav, [role="main"] [role="navigation"]'
)
```
