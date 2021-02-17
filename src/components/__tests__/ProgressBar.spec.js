import sinon from 'sinon'
import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import ProgressBar from '../ProgressBar.vue'

describe('ProgressBar.vue', () => {
  let clock
  beforeEach(() => {
    clock = sinon.useFakeTimers()
  })

  afterEach(() => {
    clock.restore()
  })

  it('initializes with 0% width', () => {
    const wrapper = shallowMount(ProgressBar)
    expect(wrapper.element.style.width).to.equal('0%')
  })

  it('display the bar when start is called', async () => {
    const wrapper = shallowMount(ProgressBar)
    expect(wrapper.classes()).to.include('hidden')
    await wrapper.vm.start()
    expect(wrapper.classes()).not.to.equal('hidden')
  })

  it('sets the bar to 100% width when finish is called', async () => {
    const wrapper = shallowMount(ProgressBar)
    wrapper.vm.start()
    await wrapper.vm.finish()
    expect(wrapper.element.style.width).to.equal('100%')
  })

  it('hides the bar when finish is called', async () => {
    const wrapper = shallowMount(ProgressBar)
    wrapper.vm.start()
    await wrapper.vm.finish()
    expect(wrapper.classes()).to.include('hidden')
  })

  it('sets the bar to 100% width when fail is called', async () => {
    const wrapper = shallowMount(ProgressBar)
    await wrapper.vm.fail()
    expect(wrapper.element.style.width).to.equal('100%')
  })

  it('adds error class when fail is called', async () => {
    const wrapper = shallowMount(ProgressBar)
    await wrapper.vm.fail()
    expect(wrapper.classes()).to.include('error')
  })

  it('removes error class when start is called', async () => {
    const wrapper = shallowMount(ProgressBar)
    wrapper.vm.fail()
    await wrapper.vm.start()
    expect(wrapper.classes()).not.to.equal('error')
  })

  it('resets to 0% width when start is called', async () => {
    const wrapper = shallowMount(ProgressBar)
    wrapper.vm.finish()
    await wrapper.vm.start()
    expect(wrapper.element.style.width).to.equal('0%')
  })

  it('increases width by 1% every 100ms after start call', async () => {
    const wrapper = shallowMount(ProgressBar)
    wrapper.vm.start()

    await clock.tick(100)
    expect(wrapper.element.style.width).to.equal('1%')

    await clock.tick(900)
    expect(wrapper.element.style.width).to.equal('10%')

    await clock.tick(4000)
    expect(wrapper.element.style.width).to.equal('50%')
  })

  it('clears timer when finish is called', async () => {
    sinon.stub(global, 'setInterval').returns(123)
    const spy = sinon.spy(global, 'clearInterval')
    const wrapper = shallowMount(ProgressBar)
    wrapper.vm.start()
    await wrapper.vm.finish()
    expect(spy.calledWith(123)).to.equal(true)
  })
})
