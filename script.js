document.addEventListener("DOMContentLoaded", function () {
  // Добавляем обработчики для кнопок "Подробнее" на карточках городов
  const cityButtons = document.querySelectorAll(".city-btn");
  cityButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const cityCard = this.closest(".city-card");
      if (cityCard) {
        const cityKey = cityCard.getAttribute("data-city");
        openCityModal(cityKey);
      }
    });
  });

  // Закрытие модальных окон при клике на крестик
  document.querySelectorAll(".close").forEach((closeBtn) => {
    closeBtn.addEventListener("click", closeModals);
  });

  // Закрытие модальных окон при клике вне их
  window.addEventListener("click", function (event) {
    if (event.target.classList.contains("modal")) {
      closeModals();
    }
  });

  // Плавная прокрутка для навигационных ссылок
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // Обработчик для формы вопроса
  const questionForm = document.getElementById("question-form");
  if (questionForm) {
    questionForm.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Ваш вопрос отправлен! Мы свяжемся с вами в ближайшее время.");
      this.reset();
    });
  }

  // Модальное окно бронирования
  const bookingModal = document.getElementById("bookingModal");
  const bookingForm = document.getElementById("bookingForm");
  const bookingSuccess = document.getElementById("bookingSuccess");

  if (bookingModal) {
    bookingModal.style.display = "none";
  }

  // Обработчики для кнопок бронирования туров - ОДИН обработчик
  const courseButtons = document.querySelectorAll(".course-btn");
  courseButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      if (bookingModal) {
        bookingModal.style.display = "flex";
        document.body.style.overflow = "hidden";
      }
    });
  });

  // Обработка отправки формы бронирования
  if (bookingForm) {
    bookingForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const phone = document.getElementById("phone").value.trim();

      if (!name || !email || !phone) {
        alert("Пожалуйста, заполните все поля");
        return;
      }

      if (!validateEmail(email)) {
        alert("Пожалуйста, введите корректный email");
        return;
      }

      // Показываем сообщение об успехе
      bookingForm.style.display = "none";
      bookingSuccess.style.display = "block";

      // Через 3 секунды закрываем модальное окно
      setTimeout(() => {
        if (bookingModal) {
          bookingModal.style.display = "none";
          document.body.style.overflow = "";
        }
        resetBookingForm();
      }, 3000);
    });
  }

  // Маска для телефона
  const phoneInput = document.getElementById("phone");
  if (phoneInput) {
    phoneInput.addEventListener("input", function (e) {
      let x = e.target.value
        .replace(/\D/g, "")
        .match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
      e.target.value =
        "+7" +
        (x[2] ? " (" + x[2] : "") +
        (x[3] ? ") " + x[3] : "") +
        (x[4] ? "-" + x[4] : "") +
        (x[5] ? "-" + x[5] : "");
    });
  }

  // Анимация появления карточек при прокрутке
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll(
    ".city-card, .course-card, .reason-card"
  );
  animatedElements.forEach((element) => {
    element.style.opacity = 0;
    element.style.transform = "translateY(20px)";
    element.style.transition = "opacity 0.5s, transform 0.5s";
    observer.observe(element);
  });
});

// Функция закрытия всех модальных окон
function closeModals() {
  document.querySelectorAll(".modal").forEach((modal) => {
    modal.style.display = "none";
    document.body.style.overflow = "";
  });
  resetBookingForm();
}

// Функция сброса формы бронирования
function resetBookingForm() {
  const bookingForm = document.getElementById("bookingForm");
  const bookingSuccess = document.getElementById("bookingSuccess");

  if (bookingForm) {
    bookingForm.style.display = "block";
    bookingForm.reset();
  }
  if (bookingSuccess) {
    bookingSuccess.style.display = "none";
  }
}

// Функция открытия модального окна города
function openCityModal(cityKey) {
  console.log("Открыть модальное окно для города: " + cityKey);
}

// Функция валидации email
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}
