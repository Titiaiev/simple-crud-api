const { TreeNode } = require('./TreeNode.js')
const { Controller } = require('../controller/index.js')

class Tree {
  constructor () {
    /**
     * @private
     * @type {TreeNode}
    */
    this.root = new TreeNode('*')
    /**
     * @private
     * @type {TreeNode}
    */
    this.pointer = this.root
  }

  /**
 *
 * @param {[String]} routes
 * @param {Controller} controller
 * @returns {Boolean}
 */
  add (routes = [''], controller) {
    if (!controller && !(controller instanceof Controller)) return false
    this.pointer = this.root
    for (let i = 0; i < routes.length; i++) {
      const r = routes[i]
      const isDynamic = r.startsWith(':')
      const routeName = isDynamic ? '$' : r
      const key = isDynamic ? r.slice(1) : r

      if (!this.pointer.children[routeName]) { this.pointer.children[routeName] = new TreeNode(key) }
      this.pointer = this.pointer.children[routeName]
    }

    return this.pointer.setHandler(controller)
  }

  /**
   *
   * @param {[String]} routes
   * @returns {[TreeNode|null, {}]}
   */
  search (routes = ['']) {
    this.pointer = this.root
    const params = {}
    for (let i = 0; i < routes.length; i++) {
      const current = routes[i]
      if (this.pointer.children[current]) {
        this.pointer = this.pointer.children[current]
      } else if (this.pointer.children.$) {
        this.pointer = this.pointer.children.$
        params[this.pointer.key] = current
      } else {
        return [null, {}]
      }
    }
    return [this.pointer, params]
  }
}

module.exports = {
  Tree
}
