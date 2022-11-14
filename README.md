# image_animation

## Remodalの実装
  ### HTML<br>
  ```html
  <div class="bl_coverSlide is_hoverDarken is_inview">
    <img class="bl_imgZoom" src="" alt="">
  </div>
  ```
  ### CSS<br>
  mixin
  ```scss
  @mixin animation(
    $name,
    $duration: 1s,
    $timing-function: ease,
    $delay: 0s,
    $iteration-count: 1,
    $direction: normal,
    $fill-mode: forwards
  ) {
    animation: {
      name: $name;
      duration: $duration;
      timing-function: $timing-function;
      delay: $delay;
      iteration-count: $iteration-count;
      direction: $direction;
      fill-mode: $fill-mode;
    }
  }
  ```
  block
  ```scss
  .bl_coverSlide {
    position: relative;
    overflow: hidden;

    &::after {
      content: "";
      position: absolute;
      z-index: 2;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #eaebe6;
      opacity: 0;
    }
    &.is_inview {
      &::after {
        opacity: 1;

        @include mix.animation(
          $name: kf-bl_coverSlide,
          $duration: 1.6s,
          $timing-function: ease-in-out
        );
      }
    }
  }

  @keyframes kf-bl_coverSlide {
    0% {
      transform-origin: left;
      transform: scaleX(0);
    }
    50% {
      transform-origin: left;
      transform: scaleX(1);
    }
    50.1% {
      transform-origin: right;
      transform: scaleX(1);
    }
    100% {
      transform-origin: right;
      transform: scaleX(0);
    }
  }

  .bl_imgZoom {
    opacity: 0;

    .is_inview & {
      opacity: 1;
      transition: transform 0.3s ease;
      @include mix.animation(
        $name: kf-img-show,
        $duration: 1.6s,
        $timing-function: ease-in-out,
        $fill-mode: none
      );

      &:hover {
        transform: scale(1.05);
      }
    }
  }

  @keyframes kf-img-show {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 0;
    }
    50.1% {
      opacity: 1;
      transform: scale(1.5);
    }
    100% {
      opacity: 1;
    }
  }

  .is_hoverDarken {
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      transition: background-color 0.3s ease;
      pointer-events: none;
      @include mix.animation(
        $name: kf-img-show,
        $duration: 1.6s,
        $timing-function: ease-in-out,
        $fill-mode: none
      );
    }
    &:hover::before {
      background-color: rgba(0, 0, 0, 0.4);
    }
  }

  .bg-bl_imgZoom {
    background-image: url(images/image-1.jpg);
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    width: 100%;
    @extend .bl_imgZoom;
  }

  .img-bg50 {
    position: relative;
    
    &::before {
      display: block;
      content: '';
      padding-top: 50%;
    }
  }
  ```
