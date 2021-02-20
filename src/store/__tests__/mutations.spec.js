import { expect } from 'chai'
import mutations from '../mutations'

describe('mutations', () => {
  it('setItems sets state.items to items', () => {
    const items = [{ id: 1 }, { id: 2 }]
    const state = {
      items: []
    }
    mutations.setItems(state, { items })
    expect(state.items).to.equal(items)
  })
})
