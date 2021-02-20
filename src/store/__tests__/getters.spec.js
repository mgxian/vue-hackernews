import { expect } from 'chai'
import getters from '../getters'

describe('getters', () => {
  it('displayItems returns the first 20 items from state.items', () => {
    const items = Array(21).fill(0).map((v, i) => i)
    const state = {
      items
    }
    const got = getters.displayItems(state)
    const want = items.slice(0, 20)
    expect(got).to.deep.equal(want)
  })

  it('maxPage returns a rounded number using the current items', () => {
    const items = Array(49).fill(0).map((v, i) => i)
    const state = {
      items
    }
    const got = getters.maxPage(state)
    expect(got).to.equal(3)
  })
})
