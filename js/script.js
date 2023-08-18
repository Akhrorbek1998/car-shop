   window.addEventListener("DOMContentLoaded", ()=> {

  // ====== LOADER ======
  const loader = document.querySelector(".loader");
  setTimeout(() => {
    loader.style.opacity = 0;
    setTimeout(() => {
      loader.style.display = "none"
    }, 1500);
  }, 2000);


  // ======= TABS =======
  const tabs = document.querySelectorAll(".tabheader__item"),
    tabsContent = document.querySelectorAll(".tabcontent"),
    headerParents = document.querySelector(".tabheader__items");

  function hideTabContent() {
    tabsContent.forEach((item) => {
      item.style.display = "none";
    });

    tabs.forEach((item)=> {
      item.classList.remove("tabheader__item_active");
    
    });

  };
  
  function showTabContent(i = 0) {
    tabsContent[i].style.display = "block";
    tabs[i].classList.add("tabheader__item_active")
  };

  hideTabContent();
  showTabContent(); 

  headerParents.addEventListener('click', (event)=> {
    const target = event.target;
    if (target && target.classList.contains("tabheader__item")) {
      tabs.forEach((item, i)=> {
        if (target == item) {
          hideTabContent();
          showTabContent(i); 
          
        }
      })
    }
  });

  // ========= MODAL =========
  const allModalBtn = document.querySelectorAll(".btn"),
    modal = document.querySelector(".modal"),
    closeBtn = document.querySelector(".modal__close");

  function openModal() {
    modal.classList.add("show");
    modal.classList.remove("hide");
    document.body.style.overflow = "hidden";
  };

  function closeModal() {
    modal.classList.add("hide");
    modal.classList.remove("show");
    document.body.style.overflow = "";
    clearInterval(modalTimer);
  };

  allModalBtn.forEach((btn) => {
    btn.addEventListener("click", openModal)
  });

  closeBtn.addEventListener("click", closeModal);

  modal.addEventListener("click", (e)=> {
    if (e.target === modal) {
      closeModal();
    }
  });

  const modalTimer = setTimeout(openModal, 5000);

  function showMyModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      openModal()
    }
  };

  window.addEventListener("scroll", showMyModalByScroll());


  //============ DATA ================

  const deadline = "2023-09-17";

  function getTime(endTime) {
    const total = Date.parse(endTime) - Date.parse(new Date()),
      days = Math.floor((total/(1000 * 60 * 60 * 24))),
      seconds = Math.floor((total/1000) % 60),
      minutes = Math.floor((total/1000/60 ) % 60),
      hours = Math.floor((total/(1000 * 60 * 60)) % 24);

      return {
        total: total,
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
      }
  };

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return "0" + num; 
    } else {
      return num;
    }
  }

  function setClock(selector, endTime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timeInterval = setInterval(updateClock, 1000)

    updateClock();

    function updateClock() {
      const time = getTime(endTime);
      days.innerHTML = getZero(time.days);
      hours.innerHTML = getZero(time.hours);
      minutes.innerHTML = getZero(time.minutes);
      seconds.innerHTML = getZero(time.seconds);

      if (time.total <= 0) {
        clearInterval(timeInterval)
      }
    }  
  };

  setClock(".timer", deadline);

  // =============== SLIDES MEDIUM ===============

  const slides = document.querySelectorAll(".offer__slide"),
    prev = document.querySelector(".offer__slider-prev"),
    next = document.querySelector(".offer__slider-next"),
    current = document.querySelector("#current"),
    total = document.querySelector("#total"),
    slidesWrapper = document.querySelector(".offer__slider-wrapper"),
    width = window.getComputedStyle(slidesWrapper).width,
    slider = document.querySelector(".offer__slider"),
    slidesField = document.querySelector(".offer__slider-inner");
  
  let slidesIndex = 1,
    offset = 0;

  if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slidesIndex}`
  } else {
    total.textContent = slides.length;
    current.textContent = slidesIndex
  };


  slidesField.style.width = 100 * slides.length + "%";
  slidesField.style.display = "flex";
  slidesField.style.transition = "all 0.6s"
  slidesWrapper.style.overflow = "hidden";
  slides.forEach(slide => {
    slide.style.width = width;
  });

  slider.style.position = "relative";
  let indicator = document.createElement("ol");
  let dots = [];
  indicator.style.cssText = `
    position: absolute;
    right: 0;
    bottom: 0;
    left:0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style-type: none;
  `;

  slider.append(indicator);
  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement("li");
    dot.setAttribute("data-slide-to", i + 1)
    dot.style.cssText = `
      box-sizing: content-box;
      flex: 0 1 auto;
      width: 30px;
      height: 5px;
      margin: 0 3px;
      cursor: pointer;
      background-color: #fff;
      background-clip: padding-box;
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
      opacity: .3;
      transition: opacity 0.6s ease;
    `;

    if (i == 0) {
      dot.style.opacity = 1;
    };

    indicator.append(dot);
    dots.push(dot);
    
  }

  next.addEventListener("click", ()=> {
    if (offset == (+width.slice(0, width.length - 2)) * (slides.length - 1) ) {
      offset = 0
    } else {
      offset += +width.slice(0, width.length - 2) 
    };

    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slidesIndex == slides.length) {
      slidesIndex = 1
    } else {
      slidesIndex++
    };

    if (slides.length < 10) {
      current.textContent = `0${slidesIndex}`
    } else {
      current.textContent = slidesIndex
    };

    dots.forEach(dot => {
      dot.style.opacity = "0.5"
    });

    dots[slidesIndex - 1].style.opacity = "1";

  });
  
  prev.addEventListener("click", ()=> {
    if (offset == 0) {
      offset = +width.slice(0, width.length - 2) * (slides.length - 1)
    } else {
      offset -= +width.slice(0, width.length - 2) 
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slidesIndex == 1) {
      slidesIndex = slides.length;
    } else {
      slidesIndex--
    };

    if (slides.length < 10) {
      current.textContent = `0${slidesIndex}`
    } else {
      current.textContent = slidesIndex
    };

    dots.forEach(dot => {
      dot.style.opacity = "0.5"
    });
  
    dots[slidesIndex - 1].style.opacity = "1";
  
  });

  dots.forEach(dot => {
    dot.addEventListener("click", (e)=> {
      const slideTo = e.target.getAttribute("data-slide-to");

      slidesIndex = slideTo;
      offset = +width.slice(0, width.length - 2) * (slideTo - 1);
      slidesField.style.transform = `translateX(-${offset}px)`;
      if (slides.length < 10) {
        current.textContent = `0${slidesIndex}`
      } else {
        current.textContent = slidesIndex
      };
  
      dots.forEach(dot => {
        dot.style.opacity = "0.5"
      });
  
      dots[slidesIndex - 1].style.opacity = "1";
    })
  });

  // =========== ACCORDION ============
  const accordion = document.querySelectorAll(".accordion");

  accordion.forEach(acc => {
    acc.addEventListener("click", ()=> {
      const panel = acc.nextElementSibling
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    })
  });

  // ========== FORM OYNASIDA SERVERGA MA'LUMOT YUBORISH ===========
  
  const forms = document.querySelectorAll(".form");

  const massage = {
    loading: "Loading",
    success: "murojaatingiz qabul qilindi",
    failure: "Error"
  };

  forms.forEach(item => {
    postData(item)
  });

  function postData(form) {
    form.addEventListener("submit", (e)=> {
      e.preventDefault();

      const statusMassage = document.createElement("div");
      statusMassage.textContent = massage.loading;
      form.append(statusMassage)

      const request = new XMLHttpRequest();
      request.open("POST", "server.php");

      const formData = new FormData(form);
      request.send(formData);

      request.addEventListener('load', ()=> {
        if (request.status === 200) {
          console.log(request.response);
          statusMassage.textContent = massage.success
        } else {
          statusMassage.textContent = massage.failure
        }
      })

    })
  }

})
