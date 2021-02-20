import sinon from 'sinon'
import { expect } from 'chai'
import flushPromises from 'flush-promises'
import * as api from '@/api/api'
import actions from '../actions'

describe('actions', () => {
  it('fetchListData calls commit with the result of fetchListData', async () => {
    const items = [{}, {}]
    const type = 'top'
    const fetchListData = sinon.stub(api, 'fetchListData')
    fetchListData.resolves(items)
    const context = {
      commit: sinon.spy()
    }
    await actions.fetchListData(context, { type })
    await flushPromises()
    fetchListData.restore()
    expect(context.commit.calledWith('setItems', { items })).to.equal(true)
  })
})
