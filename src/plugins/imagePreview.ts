import PhotoSwipe, {DataSourceArray, PreparedPhotoSwipeOptions} from 'photoswipe';

export const imagePreview = (dataSource: DataSourceArray, src?: string) => {
  const index = dataSource.findIndex(item => item.src === src);
  const options: Partial<PreparedPhotoSwipeOptions> = {
    dataSource,
    index: index < 0 ? 0 : index,
    bgOpacity: window.innerWidth < 768 ? 1 : 0.6,
    loop: false,
    pinchToClose: false,
    padding: {top: window.innerWidth < 768 ? 0 : 60, bottom: 0, left: 0, right: 0},
    clickToCloseNonZoomable: true,
    showHideAnimationType: 'none',
    arrowPrev: window.innerWidth >= 768,
    arrowNext: window.innerWidth >= 768,
    zoom: window.innerWidth >= 768,
    close: window.innerWidth >= 768,
    counter: window.innerWidth >= 768,
    tapAction: window.innerWidth < 768 ? 'close' : false,
  }
  const pswp = new PhotoSwipe(options);
  history.pushState({}, '', location.pathname + '/preview')
  
  pswp.init();
  const onBack = () => {
    if (pswp.isOpen) {
      pswp.close()
    }
  }
  window.addEventListener('popstate', onBack)
  pswp.on('close', () => {
    window.removeEventListener('popstate', onBack)
    if (location.pathname.endsWith('/preview')) {
      history.back()
    }
  })
}
