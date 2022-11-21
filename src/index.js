function activate() {
  return {
    extendMarkdownIt(md) {
      md.core.ruler.before('block', 'block_replace', function block(state) {
        state.src = state.src
          // .replace(/$\n/gm, '&ensp;\n')
          .replace(/\/\*.+\*\/|\/\/.+\n/g, '')
        // .replace(/---&ensp;/g, '---')
        console.log(state.src)
      })
      md.core.ruler.after('block', 'replace_spaces', function replace(state) {
        for (let i = state.tokens.length - 1; i >= 0; i--) {
          if (state.tokens[i].type === 'inline') {
            state.tokens[i].content = state.tokens[i].content.replace(
              /  /g,
              '&ensp;'
            )
          }
        }
      })
      md.disable(['code'])
      return md
    }
  }
}

module.exports = {
  activate
}
