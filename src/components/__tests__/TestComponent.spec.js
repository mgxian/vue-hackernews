import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import TestComponent from '@/components/TestComponent'
import TestChildComponent from '@/components/TestChildComponent'
import sinon from 'sinon'

describe('TestComponent.vue', () => {
  it('test event', () => {
    const wrapper = shallowMount(TestComponent)
    wrapper.find('button').trigger('click')
    expect(wrapper.emitted('buttonClicked').length).to.equal(1)
  })

  it('test input', () => {
    const wrapper = shallowMount(TestComponent)
    const input = wrapper.find('input[type=text]')
    input.setValue('hello')
    expect(wrapper.vm.$data.message).to.equal('hello')
  })

  it('test radio button', async () => {
    const wrapper = shallowMount(TestComponent)
    const radio = wrapper.find('input[value=no]')
    await radio.setChecked(true)
    expect(wrapper.vm.$data.checked).to.equal('no')
  })

  it('test responds to event', async () => {
    const handleChildEvent = sinon.spy()
    const wrapper = shallowMount(TestComponent, { methods: { handleChildEvent } })
    const child = wrapper.findComponent(TestChildComponent)
    await child.vm.$emit('childEvent')
    expect(handleChildEvent.called).to.equal(true)
  })
})
