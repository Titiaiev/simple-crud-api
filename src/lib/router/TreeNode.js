class TreeNode {
  /**
   *
   * @param {String} key
   */
  constructor (key) {
    this.key = key
    this.controller = null
    this.children = {}
  }

  /**
   *
   * @param {import('../controller/index.js').Controller} controller
   * @returns {Boolean}
   */
  setHandler (controller) {
    if (controller) {
      this.controller = controller
      return true
    } else {
      return false
    }
  }
}

module.exports = {
  TreeNode
}
