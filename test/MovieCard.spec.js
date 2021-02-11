import { mount } from '@vue/test-utils';
import MovieCard from '@/components/MovieCard.vue';

describe('MovieCard', () => {
  test('this is a vue instance', () => {
    const wrapper = mount(MovieCard, {
      propsData: {
        imageSrc: 'testImage.jpg',
        title: 'Test Title',
      },
    });
    expect(wrapper.vm).toBeTruthy();
  });

  test('renders properly', () => {
    const wrapper = mount(MovieCard, {
      propsData: {
        imageSrc: 'testImage.jpg',
        title: 'Test Title',
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
