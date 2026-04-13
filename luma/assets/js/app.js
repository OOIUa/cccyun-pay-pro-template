;(function ($, window, document) {
  'use strict'

  function openDrawer() {
    $('.mobile-drawer').addClass('mobile-drawer--show')
    $('.hamburger').addClass('hamburger--active')
    $('body').addClass('no-scrolling')
  }

  function closeDrawer() {
    $('.mobile-drawer').removeClass('mobile-drawer--show')
    $('.hamburger').removeClass('hamburger--active')
    $('body').removeClass('no-scrolling')
  }

  function toggleDrawer(event) {
    if (event) {
      event.preventDefault()
      event.stopPropagation()
    }
    if ($('.mobile-drawer').hasClass('mobile-drawer--show')) {
      closeDrawer()
    } else {
      openDrawer()
    }
    return false
  }

  function initMobileNav() {
    var $toggle = $('.hamburger')
    if (!$toggle.length) return

    $toggle.off('touchstart click').on('touchstart click', toggleDrawer)
    $('.mobile-drawer__mask').off('touchstart click').on('touchstart click', closeDrawer)
    $('.mobile-nav a').on('click', closeDrawer)

    $(window).on('resize', function () {
      if ($(window).width() > 720) closeDrawer()
    })
  }

  function initFooterAccordion() {
    $('.accordion__title').on('click', function () {
      $(this).siblings('.accordion__content').toggleClass('expand')
    })
  }

  function initSmoothAnchor() {
    $('a[data-scroll]').on('click', function (e) {
      var id = $(this).attr('href')
      if (!id || id.charAt(0) !== '#') return

      var $target = $(id)
      if (!$target.length) return

      e.preventDefault()
      var top = $target.offset().top - 72
      $('html, body').stop(true).animate({ scrollTop: top }, 260)
      closeDrawer()
    })
  }

  function initQRCode() {
    var qrItems = document.querySelectorAll('.contact-qr-wrap')
    for (var i = 0; i < qrItems.length; i++) {
      var item = qrItems[i]
      var link = item.getAttribute('data-qr-link')
      var qrContainer = item.querySelector('.contact-qr-canvas')
      if (!link || !qrContainer || typeof QRCode === 'undefined') continue

      qrContainer.innerHTML = ''
      new QRCode(qrContainer, { text: link, width: 112, height: 112 })
    }
  }

  $(function () {
    initMobileNav()
    initFooterAccordion()
    initSmoothAnchor()
    initQRCode()
  })
})(window.jQuery, window, document)

