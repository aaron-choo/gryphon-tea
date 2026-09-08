document.addEventListener('DOMContentLoaded', function () {

  const spirit = document.getElementById('gryphon-tea-spirit');
  const caughtMessage = document.getElementById('gryphon-tea-spirit-caught');

  if (!spirit) return;


  /* ======================================================
     TEST SETTINGS

     Currently:
     appears after 2–4 seconds
     flies for 4 seconds

     Later:
     change delay to 10–20 seconds
  ====================================================== */

  const MIN_DELAY = 2000;
  const MAX_DELAY = 4000;

  const FLIGHT_DURATION = 4000;


  let activeAnimation = null;
  let caught = false;


  function randomBetween(min, max) {
    return Math.random() * (max - min) + min;
  }


  function showSpirit() {

    if (caught) return;


    const spiritWidth = spirit.offsetWidth || 110;
    const spiritHeight = spirit.offsetHeight || 135;


    /*
      Keep spirit away from extreme top/bottom
      so it doesn't collide heavily with header/cart UI.
    */

    const minY = window.innerHeight * 0.18;

    const maxY =
      window.innerHeight -
      spiritHeight -
      window.innerHeight * 0.15;


    const startY = randomBetween(
      minY,
      Math.max(minY + 20, maxY)
    );


    const endY = startY + randomBetween(-80, 80);


    /*
      Randomly fly either:
      left → right
      OR
      right → left
    */

    const leftToRight = Math.random() > 0.5;


    let startX;
    let endX;


    if (leftToRight) {

      startX = -spiritWidth - 40;

      endX =
        window.innerWidth +
        spiritWidth +
        40;

    } else {

      startX =
        window.innerWidth +
        spiritWidth +
        40;

      endX =
        -spiritWidth -
        40;

    }


    spirit.hidden = false;

    spirit.style.opacity = '1';


    activeAnimation = spirit.animate(

      [
        {
          transform:
            `translate3d(${startX}px, ${startY}px, 0) rotate(-4deg)`
        },

        {
          offset: 0.35,

          transform:
            `translate3d(
              ${startX + (endX - startX) * 0.35}px,
              ${startY - 25}px,
              0
            )
            rotate(2deg)`
        },

        {
          offset: 0.7,

          transform:
            `translate3d(
              ${startX + (endX - startX) * 0.7}px,
              ${endY + 20}px,
              0
            )
            rotate(-2deg)`
        },

        {
          transform:
            `translate3d(${endX}px, ${endY}px, 0) rotate(4deg)`
        }
      ],

      {
        duration: FLIGHT_DURATION,
        easing: 'cubic-bezier(.25,.55,.45,1)',
        fill: 'forwards'
      }

    );


    activeAnimation.onfinish = function () {

      if (!caught) {

        spirit.hidden = true;

      }

    };

  }



  function catchSpirit() {

    if (caught) return;

    caught = true;


    if (activeAnimation) {

      activeAnimation.cancel();

    }


    spirit.style.transition =
      'opacity 180ms ease, filter 180ms ease, transform 180ms ease';

    spirit.style.opacity = '0';

    spirit.style.filter = 'blur(8px)';


    setTimeout(function () {

      spirit.hidden = true;

    }, 200);


    if (caughtMessage) {

      caughtMessage.hidden = false;

      caughtMessage.classList.add('is-visible');


      setTimeout(function () {

        caughtMessage.hidden = true;

        caughtMessage.classList.remove('is-visible');

      }, 1500);

    }

  }



  spirit.addEventListener('click', catchSpirit);


  spirit.addEventListener('keydown', function (event) {

    if (
      event.key === 'Enter' ||
      event.key === ' '
    ) {

      event.preventDefault();

      catchSpirit();

    }

  });



  const delay =
    randomBetween(
      MIN_DELAY,
      MAX_DELAY
    );


  window.setTimeout(
    showSpirit,
    delay
  );

});