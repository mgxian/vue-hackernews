import sinon from 'sinon'
import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import Item from '@/components/Item.vue'
import ItemList from '../ItemList.vue'
// import { fetchListData } from '@/api/api'

describe('ItemList.vue', () => {
  it('renders an Item with data for each item in window.items', () => {
    const items = [{ id: 1 }, { id: 2 }, { id: 3 }]
    const $bar = {
      start: () => {},
      finish: () => {}
    }
    const wrapper = shallowMount(ItemList, { mocks: { $bar } })
    const Items = wrapper.findAllComponents(Item)
    expect(Items.length).to.equal(items.length)
    Items.wrappers.forEach((wrapper, i) => {
      expect(wrapper.vm.item).to.equal(items[i])
    })
  })

  it('calls $bar start on load', () => {
    const $bar = {
      start: sinon.spy(),
      finish: () => {}
    }
    shallowMount(ItemList, { mocks: { $bar } })
    expect($bar.start.called).to.equal(true)
  })
})
