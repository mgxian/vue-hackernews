import sinon from 'sinon'
import { expect } from 'chai'
import Vuex from 'vuex'
import { createLocalVue } from '@vue/test-utils'
import cloneDeep from 'lodash.clonedeep'
import flushPromises from 'flush-promises'
import storeConfig from '../store-config'
import * as api from '@/api/api'

const localVue = createLocalVue()
localVue.use(Vuex)

function createItems () {
  return new Array(22).fill(0).map((item, i) => ({ id: `a${i}`, name: 'item' }))
}

describe('store-config', () => {
  it('calling fetchListData with the type returns top 20 displayItems from displayItems getter', async () => {
    const fetchListData = sinon.stub(api, 'fetchListData')
    const items = createItems()
    fetchListData.resolves(items)
    const clonedStoreConfig = cloneDeep(storeConfig)
    const store = new Vuex.Store(clonedStoreConfig)
    const type = 'top'

    await store.dispatch('fetchListData', { type })
    await flushPromises()

    fetchListData.restore()
    expect(store.getters.displayItems).to.deep.equal(items.slice(0, 20))
  })
})
