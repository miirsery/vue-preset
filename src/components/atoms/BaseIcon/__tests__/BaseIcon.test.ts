import { describe, expect, test } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'

import BaseIcon from '@/components/atoms/BaseIcon/BaseIcon.vue'
import { nextTick } from 'vue'

// TODO: Добавить нормальную типизацию

const _mount = (options?: Record<string, unknown>): VueWrapper => {
  return mount(BaseIcon, {
    props: {
      name: 'close',
    },
    ...options,
  })
}

describe('Testing BaseIcon.vue', () => {
  test('Should render base icon', async () => {
    const wrapper = _mount()

    expect(wrapper.exists()).toBeTruthy()

    expect(wrapper.find('svg').exists()).toBeTruthy()
  })

  test('Should have snapshot', async () => {
    const wrapper = _mount()

    expect(wrapper.element).toMatchSnapshot()
  })

  test('Should have needed class', async () => {
    expect.arrayContaining(['base-icon', 'base-icon--close'])
  })

  test('Should change icon size', async () => {
    const wrapper = _mount()

    expect(wrapper.attributes().width).toContain('23px')

    expect(wrapper.attributes().height).toContain('24px')

    await wrapper.setProps({
      width: 48,
      height: 48,
    })

    await nextTick()

    expect(wrapper.attributes().width).toContain('48')

    expect(wrapper.attributes().height).toContain('48')

    await wrapper.setProps({
      width: '52px',
      height: '52px',
    })

    expect(wrapper.attributes().width).toContain('52px')

    expect(wrapper.attributes().height).toContain('52px')
  })

  test('Should be reversed', async () => {
    const wrapper = _mount()

    await wrapper.setProps({
      reverse: true,
    })

    await nextTick()

    expect(wrapper.classes()).toEqual(['base-icon', 'reversed-icon', 'base-icon--close'])
  })
})
