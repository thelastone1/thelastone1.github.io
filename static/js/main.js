/**
* Template Name: Day - v4.7.0
* Template URL: https://bootstrapmade.com/day-multipurpose-html-template-for-free/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 16
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Header fixed top on scroll
   */
  // let selectHeader = select('#header')
  // if (selectHeader) {
  //   let headerOffset = selectHeader.offsetTop
  //   let nextElement = selectHeader.nextElementSibling
  //   const headerFixed = () => {
  //     if ((headerOffset - window.scrollY) < 0) {
  //       selectHeader.classList.add('fixed-top')
  //       nextElement.classList.add('scrolled-offset')
  //     } else {
  //       selectHeader.classList.remove('fixed-top')
  //       nextElement.classList.remove('scrolled-offset')
  //     }
  //   }
  //   window.addEventListener('load', headerFixed)
  //   onscroll(document, headerFixed)
  // }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Porfolio isotope and filter
   */
  // window.addEventListener('load', () => {
  //   let portfolioContainer = select('.portfolio-container');
  //   if (portfolioContainer) {
  //     let portfolioIsotope = new Isotope(portfolioContainer, {
  //       itemSelector: '.portfolio-item'
  //     });

  //     let portfolioFilters = select('#portfolio-flters li', true);

  //     on('click', '#portfolio-flters li', function(e) {
  //       e.preventDefault();
  //       portfolioFilters.forEach(function(el) {
  //         el.classList.remove('filter-active');
  //       });
  //       this.classList.add('filter-active');

  //       portfolioIsotope.arrange({
  //         filter: this.getAttribute('data-filter')
  //       });
  //       portfolioIsotope.on('arrangeComplete', function() {
  //         AOS.refresh()
  //       });
  //     }, true);
  //   }
  // });

  /**
   * Initiate portfolio lightbox 
   */
  // const portfolioLightbox = GLightbox({
  //   selector: '.portfolio-lightbox'
  // });

  /**
   * Portfolio details slider
   */
  // new Swiper('.portfolio-details-slider', {
  //   speed: 400,
  //   loop: true,
  //   autoplay: {
  //     delay: 5000,
  //     disableOnInteraction: false
  //   },
  //   pagination: {
  //     el: '.swiper-pagination',
  //     type: 'bullets',
  //     clickable: true
  //   }
  // });

  /**
   * Animation on scroll
   */
  // window.addEventListener('load', () => {
  //   AOS.init({
  //     duration: 1000,
  //     easing: 'ease-in-out',
  //     once: true,
  //     mirror: false
  //   })
  // });


  /**
   * Header fixed top on scroll
   */
  let selectPageTopbar = select('#pagetopbar')
  if (selectPageTopbar) {
        const handleScroll = () => {
            if (window.scrollY > 70) {
                selectPageTopbar.classList.add('fixed');
            } else {
                selectPageTopbar.classList.remove('fixed');
            }
        };
        
        // 초기 실행
        handleScroll();
        
        // 스크롤 이벤트
        window.addEventListener('scroll', handleScroll, { passive: true });
    }

  /**
   * 아티스트 페이지 디스코그래피 Filter
   */  
    window.addEventListener('load', () => {
    let portfolioContainer = select('.albumlist');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.contents-item'
      });

      let portfolioFilters = select('#album-filters li', true);

      on('click', '#album-filters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        // portfolioIsotope.on('arrangeComplete', function() {
        //   AOS.refresh()
        // });
      }, true);
    }
  });

  /**
   * 검색
   */ 
  // Django URL을 JavaScript 변수로 전달받음
  const SEARCH_API_URL = document.body.dataset.searchUrl;
  const ARTIST_DETAIL_URL_TEMPLATE = document.body.dataset.artistUrl;
  const ALBUM_DETAIL_URL_TEMPLATE = document.body.dataset.albumUrl;
  const SONG_DETAIL_URL_TEMPLATE = document.body.dataset.songUrl;

  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');
  let searchTimeout;

  let isComposing = false; // 한글 입력 중 상태 플래스

  // 한글 조합 시작
  searchInput?.addEventListener('compositionstart', function() {
    isComposing = true;
  });

  // 한글 조합 완료
  searchInput?.addEventListener('compositionend', function() {
      isComposing = false;
  });

  // 검색 입력 이벤트
  searchInput?.addEventListener('input', function(e) {
      const query = e.target.value.trim();
      
      clearTimeout(searchTimeout);

      if (query.length < 1) {
        searchResults.style.display = 'none';
        return;
      }
      
      searchTimeout = setTimeout(() => {
          performSearch(query);
      }, 300);
  });

  // 검색 실행
  async function performSearch(query) {
      try {
          const response = await fetch(`${SEARCH_API_URL}?q=${encodeURIComponent(query)}`);
          const data = await response.json();
          
          displayResults(data, query);
      } catch (error) {
          // console.error('검색 오류:', error);
          // searchResults.innerHTML = '<div class="error-message">검색 중 오류가 발생했습니다</div>';
          // searchResults.innerHTML = '<div class="error-message">검색어가 짧습니다.</div>';
          // searchResults.style.display = 'block';          
          // searchResults.style.display = 'none';
      }
  }

  // 검색 결과 표시
  function displayResults(data, query) {
    const { artists, albums, songs } = data;
    const totalResults = artists.length + albums.length + songs.length;
    
    if (totalResults === 0) {
        searchResults.innerHTML = `
            <div class="no-results">
                <div class="no-results-icon">🔍</div>
                <div class="no-results-text">"${escapeHtml(query)}"에 대한 검색 결과가 없습니다</div>
            </div>
        `;
        searchResults.style.display = 'block';
        return;
    }
    
    let html = '';
    
    // 아티스트 결과
    if (artists.length > 0) {
        html += '<div class="result-section">';
        html += '<div class="result-section-title">👤 아티스트</div>';
        artists.forEach(artist => {
            const artistUrl = ARTIST_DETAIL_URL_TEMPLATE.replace('0', artist.uuid);
            if (artist.kname === null) {artist.kname = '' } // kname이 없는 경우 표시안함.
            html += `
                <a href="${artistUrl}" class="result-item">
                    <div class="result-icon">👤</div>
                    <div class="result-content">
                        <div class="result-title">${highlightText(artist.name, query)}</div>
                        <div class="result-meta">${artist.kname}</div>
                    </div>
                </a>
            `;
        });
        html += '</div>';
    }
    
    // 앨범 결과
    if (albums.length > 0) {
        html += '<div class="result-section">';
        html += '<div class="result-section-title">💿 앨범</div>';
        albums.forEach(album => {
            const albumUrl = ALBUM_DETAIL_URL_TEMPLATE.replace('0', album.uuid);
            html += `
                <a href="${albumUrl}" class="result-item">
                    <div class="result-icon">💿</div>
                    <div class="result-content">
                        <div class="result-title">${highlightText(album.title, query)}</div>
                        <div class="result-meta">${album.artist}</div>
                    </div>
                </a>
            `;
        });
        html += '</div>';
    }
    
    // 곡 결과
    if (songs.length > 0) {
        html += '<div class="result-section">';
        html += '<div class="result-section-title">🎵 곡</div>';
        songs.forEach(song => {
            const songUrl = SONG_DETAIL_URL_TEMPLATE.replace('0', song.uuid);
            html += `
                <a href="${songUrl}" class="result-item">
                    <div class="result-icon">🎵</div>
                    <div class="result-content">
                        <div class="result-title">${highlightText(song.title, query)}</div>
                        <div class="result-meta">${song.artist} - ${song.album}</div>
                    </div>
                </a>
            `;
        });
        html += '</div>';
    }
    
    searchResults.innerHTML = html;
    searchResults.style.display = 'block';
  }

  // 검색어 하이라이트
  function highlightText(text, query) {
      const regex = new RegExp(`(${escapeRegex(query)})`, 'gi');
      return escapeHtml(text).replace(regex, '<mark>$1</mark>');
  }

  // HTML 이스케이프
  function escapeHtml(text) {
      const div = document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
  }

  // 정규식 이스케이프
  function escapeRegex(text) {
      return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  // 검색창 외부 클릭 시 결과 숨김
  document.addEventListener('click', function(e) {
      if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
          searchResults.style.display = 'none';
      }
  });

  // 검색창 클릭 시 결과 다시 표시
  searchInput.addEventListener('focus', function() {
      // if (searchResults.innerHTML && searchInput.value.length >= 2) {
      if (searchResults.innerHTML) {
          searchResults.style.display = 'block';
      }
  });

  // ESC 키로 결과 닫기
  searchInput.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
          searchResults.style.display = 'none';
          searchInput.blur();
      }
  });

  // 키보드 네비게이션
  searchInput.addEventListener('keydown', function(e) {

    const items = Array.from(searchResults.querySelectorAll('.result-item'));
    
    if (items.length === 0) return;
    
    const activeItem = searchResults.querySelector('.result-item.active');
    let currentIndex = activeItem ? items.indexOf(activeItem) : -1;
    
    if (e.key === 'ArrowDown') {
        e.preventDefault();
        
        // 다음 아이템으로 이동
        const nextIndex = currentIndex + 1;
        
        if (nextIndex < items.length) {
            // 현재 active 제거
            if (activeItem) {
                activeItem.classList.remove('active');
            }
            
            // 다음 아이템에 active 추가
            items[nextIndex].classList.add('active');
            items[nextIndex].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        } else {
            // 마지막 아이템이면 처음으로
            if (activeItem) {
                activeItem.classList.remove('active');
            }
            items[0].classList.add('active');
            items[0].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }
        
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        
        // 이전 아이템으로 이동
        const prevIndex = currentIndex - 1;
        
        if (currentIndex === -1) {
            // active가 없으면 마지막 아이템 선택
            items[items.length - 1].classList.add('active');
            items[items.length - 1].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        } else if (prevIndex >= 0) {
            // 이전 아이템에 active 추가
            activeItem.classList.remove('active');
            items[prevIndex].classList.add('active');
            items[prevIndex].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        } else {
            // 첫 번째 아이템이면 마지막으로
            activeItem.classList.remove('active');
            items[items.length - 1].classList.add('active');
            items[items.length - 1].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }
        
    } else if (e.key === 'Enter') {
        e.preventDefault();
        if (activeItem) {
            activeItem.click();
        }
    }
});

  // 마우스 호버 시 active 클래스 관리
  searchResults.addEventListener('mouseover', function(e) {
    const item = e.target.closest('.result-item');
    if (item) {
      searchResults.querySelectorAll('.result-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    }
  });

  /**
   * 샘플 시간 클릭 시 유튜브 재생시간 변경
   */ 
  let sampling, original;

  // 1️⃣ 유튜브 API가 로드되면 자동으로 호출됨
  window.onYouTubeIframeAPIReady = function() {
    sampling = new YT.Player('sampling', {
        events: {
            'onReady': onPlayerReady
        }
    });
    
    original = new YT.Player('original', {
        events: {
            'onReady': onPlayerReady
        }
    });
};

  function onPlayerReady(event) {
    console.log('Player ready');
  }

  function timestampToSeconds(timestamp) {
    // 시간 초로 변환
    const parts = timestamp.split(':').map(Number);
    
    if (parts.length === 2) {
        // mm:ss 형식
        return parts[0] * 60 + parts[1];
    } else if (parts.length === 3) {
        // hh:mm:ss 형식
        return parts[0] * 3600 + parts[1] * 60 + parts[2];
    }
    
    return 0;
  }
  
  
  // DOMContentLoaded 이벤트로 안전하게 초기화
  document.addEventListener('DOMContentLoaded', function() {
      // 모든 time-highlight 클래스를 가진 요소에 클릭 이벤트 추가
      const timeHighlights = document.querySelectorAll('.time-highlight');
      
      timeHighlights.forEach(function(element) {
          element.addEventListener('click', function() {
              const playerId = this.getAttribute('data-player');
              const timestamp = this.getAttribute('data-timestamp');
              const seconds = timestampToSeconds(timestamp);
              const player = playerId === 'sampling' ? sampling : original;
              
              if (player && player.seekTo) {
                  player.seekTo(seconds, true);
                  player.playVideo();
              } else {
                  console.error('Player not ready');
              }
          });
      });
      // timeHighlights.forEach(el => {
      //   el.addEventListener('click', () => {
      //     let target = document.getElementsByClassName('data-player')
      //     console.log(target[0])
      //     const playerId = this.getAttribute('data-player');
      //     const timestamp = this.getAttribute('data-timestamp');
      //     const seconds = timestampToSeconds(timestamp);

      //     const player = playerId === 'sampling' ? sampling : original;
    
      //     if (player && player.seekTo) {
      //         player.seekTo(seconds, true);
      //         player.playVideo();
      //     } else {
      //         console.error('Player not ready');
      //     }
      //   })
      // })
  });

})()