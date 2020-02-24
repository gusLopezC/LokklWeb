import { NgxGalleryAnimation } from '@kolkov/ngx-gallery';


export const galleryConfiguration = [
    {
        width: '100%',
        height: '600px',
        imageAnimation: NgxGalleryAnimation.Slide
    },
    // max-width 800
    {
        thumbnails: false,
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 75,
        previewZoom: false,
        previewRotate: true,
        previewFullscreen: true,
        previewKeyboardNavigation: true,
        previewCloseOnClick: true,
        previewCloseOnEsc: true,
        imageInfinityMove: true,
        imageArrowsAutoHide: true,
    },
    // max-width 400
    {
        breakpoint: 400,
        preview: true
    }
];