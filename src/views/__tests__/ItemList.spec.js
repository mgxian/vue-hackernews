import sinon from 'sinon'
import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import Item from '@/components/Item.vue'
import ItemList from '../ItemList.vue'
import * as api from '@/api/api'

describe('ItemList.vue', () => {
  it('renders an Item with data for each item in window.items', async () => {
    const items = [{ id: 1 }, { id: 2 }, { id: 3 }]
    const $bar = {
      start: () => {},
      finish: () => {}
    }
    const fetchListData = sinon.stub(api, 'fetchListData').resolves(items)
    const wrapper = shallowMount(ItemList, { mocks: { $bar } })
    await flushPromises()
    const Items = wrapper.findAllComponents(Item)
    expect(Items.length).to.equal(items.length)
    Items.wrappers.forEach((wrapper, i) => {
      expect(wrapper.vm.item).to.equal(items[i])
    })
    fetchListData.restore()
  })

  it('calls $bar start on load', () => {
    const $bar = {
      start: sinon.spy(),
      finish: () => {}
    }
    shallowMount(ItemList, { mocks: { $bar } })
    expect($bar.start.called).to.equal(true)
  })

  it('calls $bar finish when load is successful', async () => {
    const $bar = {
      start: () => {},
      finish: sinon.spy()
    }
    const fetchListData = sinon.stub(api, 'fetchListData').resolves([])
    shallowMount(ItemList, { mocks: { $bar } })
    await flushPromises()
    expect($bar.finish.called).to.equal(true)
    fetchListData.restore()
  })

  it('calls $bar fail when load is failed', async () => {
    const $bar = {
      start: () => {},
      finish: sinon.spy(),
      fail: sinon.spy()
    }

    const fetchListData = sinon.stub(api, 'fetchListData').rejects()
    shallowMount(ItemList, { mocks: { $bar } })
    await flushPromises()
    expect($bar.fail.called).to.equal(true)
    expect($bar.finish.called).to.equal(false)
    fetchListData.restore()
  })
})
