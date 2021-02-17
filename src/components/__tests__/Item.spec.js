import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import Item from '../Item.vue'

describe('Item.vue', () => {
  it('renders item.url', () => {
    const item = {
      url: 10
    }
    const wrapper = shallowMount(Item, {
      propsData: { item }
    })
    expect(wrapper.text()).to.include(item.url)
  })

  it('renders item.score', () => {
    const item = {
      score: 80
    }
    const wrapper = shallowMount(Item, {
      propsData: { item }
    })
    expect(wrapper.text()).to.include(item.score)
  })

  it('renders item.by', () => {
    const item = {
      by: 'somebody'
    }
    const wrapper = shallowMount(Item, {
      propsData: { item }
    })
    expect(wrapper.text()).to.include(item.by)
  })

  it('renders a link to the item.url with item.title as text', () => {
    const item = {
      url: 'http://some-url.com',
      title: 'some title'
    }
    const wrapper = shallowMount(Item, {
      propsData: { item }
    })

    const a = wrapper.find('a')
    expect(a.text()).to.equal(item.title)
    expect(a.attributes().href).to.equal(item.url)
  })
})
