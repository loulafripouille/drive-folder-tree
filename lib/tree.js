// @author laudeon
// MIT licensed

'use strict'

const debug = require('debug')('drive-list-folder')

// Retrieve a folder by its id
//
// @param {Array} folders, the folders stack
// @param {String} id, the id of the expected folder
//
// @returns {Object} folder, the expected folder, or a default object otherwise.
const findById = (folders, id) => {
  let folder = folders.find(folder => folder.id === id)
  if (!folder) folder = { name: 'root', id: null }

  return folder
}

// Find all folders that have the given parent id
//
// @param {Array} folders, the folders stack
// @param {String} parentId, the parent id
//
// @returns {Array} folders, all the folders that matched
const findByParentId = (folders, parentId) =>
  folders.filter(folder => folder.parents[0] === parentId)

// Check if a folder is already in the given tree
//
// @param {Array} tree, the tree to search in
// @param {String} id, the folder id we are looking for in the tree
//
// @returns {Boolean} result
const existInTree = function (tree, id) {
  if (tree.find(folder => folder.id === id)) return true

  let result = false
  for (const folder in tree) {
    if (folder.hasOwnProperty('children') && folder.children.length) {
      result = existInTree(folder.children, id)
      if (result) return result
    }
  }

  return result
}

// Add recursively children folders to a given folder.
// I.e., create a branch of the tree.
//
// @param {Array} folders, the folders stack
// @param {Object} folder, the branch root.
//
// @returns void
const createBranch = (folders, folder) => {
  folder.children = findByParentId(folders, folder.id)

  if (folder.children.length > 0) {
    folder.children.forEach(child => {
      createBranch(folders, child)
    })
  }
}

// Create a tree from a Google drive folders list result.
// For each first level folder, create its full branch of dependencies.
//
// @param {Array} folders, the folder stack
//
// @returns {Array} tree
const makeTree = folders => {
  const tree = []

  folders.forEach(folder => {
    if (
      !existInTree(tree, folder.id) &&
      findById(folders, folder.parents[0]).name === 'root'
    ) {
      createBranch(folders, folder)
      tree.push(folder)
    }
  })

  return tree
}

// Creates the tree and shows result in console
// @see npm/debug
exports.consoleTree = folders => debug(makeTree(folders))
// Creates the tree and returns it
exports.getTree = folders => makeTree(folders)
