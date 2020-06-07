class StorageItem {
  key
  value

  constructor(data) {
    this.key = data.key
    this.value = data.value
  }
}

export const STORAGE = {}

class LocalStorage {
  storage

  constructor() {
    this.storage = window.localStorage || {}
  }

  /**
   * Add value to storage
   *
   * @param key
   * @param item
   */
  add(key, item) {
    this.storage.setItem(key, item)
  }

  /**
   * Get all values from storage
   */
  getAllItems() {
    const list = []

    for (let i = 0; i < this.storage.length; i++) {
      const key = this.storage.key(i)
      const value = this.storage.getItem(key)

      list.push(
        new StorageItem({
          key,
          value,
        })
      )
    }

    return list
  }

  /**
   * Get only all values from localStorage
   */
  getAllValues() {
    const list = new Array()

    for (let i = 0; i < this.storage.length; i++) {
      const key = this.storage.key(i)
      const value = this.storage.getItem(key)

      list.push(value)
    }

    return list
  }

  /**
   * Get one item by key from storage
   *
   * @param key
   */
  get(key) {
    const item = this.storage.getItem(key)

    return item
  }

  /**
   * Remove value from storage
   *
   * @param key
   */
  remove(key) {
    this.storage.removeItem(key)
  }

  /**
   * Clear storage
   */
  clear() {
    this.storage.clear()
  }
}

export default LocalStorage
