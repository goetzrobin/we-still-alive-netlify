const React = require("react")
const Provider = require("react-redux").Provider
const store = require("./src/state/store").default

export const wrapRootElement = ({ element }) => {
  return <Provider store={store}>{element}</Provider>
}
