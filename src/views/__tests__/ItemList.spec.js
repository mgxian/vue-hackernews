import sinon from 'sinon'
import { expect } from 'chai'
import Vuex from 'vuex'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import Item from '@/components/Item.vue'
import ItemList from '../ItemList.vue'
import * as api from '@/api/api'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('ItemList.vue', () => {
  let storeOptions
  let store
  const displayItemsStub = sinon.stub()
  const fetchListDataStub = sinon.stub()

  beforeEach(() => {
    storeOptions = {
      getters: {
        displayItems: displayItemsStub
      },
      actions: {
        fetchListData: fetchListDataStub
      }
    }
    store = new Vuex.Store(storeOptions)
  })

  it('renders an Item with data for each item in displayItems', async () => {
    const items = [{ id: 1 }, { id: 2 }, { id: 3 }]
    const $bar = {
      start: () => {},
      finish: () => {}
    }
    displayItemsStub.returns(items)
    const wrapper = shallowMount(ItemList, { mocks: { $bar }, localVue, store })
    await flushPromises()
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
    shallowMount(ItemList, { mocks: { $bar }, localVue, store })
    expect($bar.start.called).to.equal(true)
  })

  it('calls $bar finish when load is successful', async () => {
    const $bar = {
      start: () => {},
      finish: sinon.spy()
    }
    const fetchListData = sinon.stub(api, 'fetchListData')
    fetchListData.resolves([])
    shallowMount(ItemList, { mocks: { $bar }, localVue, store })
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

    storeOptions.actions.fetchListData.rejects()
    shallowMount(ItemList, { mocks: { $bar }, localVue, store })
    await flushPromises()

    expect($bar.fail.called).to.equal(true)
    expect($bar.finish.called).to.equal(false)
  })

  it('dispatches fetchListData with top', async () => {
    const $bar = {
      start: () => {},
      finish: () => {}
    }
    store.dispatch = sinon.stub()
    store.dispatch.resolves({})
    shallowMount(ItemList, { mocks: { $bar }, localVue, store })

    expect(store.dispatch.calledWith('fetchListData', { type: 'top' })).to.equal(true)
  })
})
