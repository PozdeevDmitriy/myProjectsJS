window.addEventListener('DOMContentLoaded', function() {
	let tab = document.getElementsByClassName('info-header-tab'),
		tabContent = document.getElementsByClassName('info-tabcontent')
		info = document.getElementsByClassName('info-header')[0];

	function hideTabContent(a) {
		for (let i = a; i < tabContent.length; i++) {
			tabContent[i].classList.remove('show');
			tabContent[i].classList.add('hide');
		}
	}
	hideTabContent(1);

	function showTabContent(b) {
		if (tabContent[b].classList.contains('hide')) {
			hideTabContent(0);
			tabContent[b].classList.add('hide');
			tabContent[b].classList.add('show');
		}
	}

	info.addEventListener('click', function(event){
		let target = event.target;
		if (target.className == 'info-header-tab') {
			for(let i = 0; i < tab.length; i++) {
				if(target == tab[i]) {
					showTabContent(i);
					break;

				}
			}
		};
	});

	let deadline = '2019-01-24';

	function getTimeRemaining(endtime){//Считаем сколько осталось времени до конца и 
		let t = Date.parse(endtime) - Date.parse(new Date()),//возвращаем объект
		seconds = Math.floor( (t/1000) % 60 ) + '',
		minutes = Math.floor( (t/1000/60) % 60) + '',
		hours = Math.floor( (t/(1000*60*60)) ) + '';

        if (seconds.length < 2) {
			seconds = '0' + seconds;
		};
		if (minutes.length < 2) {
			minutes = '0' + minutes;
		};
		if (hours.length < 2) {
			hours = '0' + hours;
		}

		return {
			'total': t,
			'hours': hours,
			'minutes': minutes,
			'seconds': seconds//возвращает объект 
		};
	};

	function setClock(id, endtime) {//устанавливаем таймер 
		let timer = document.getElementById(id),//получаем родителя и кладем в перем.
			hours = timer.querySelector('.hours'),//ищем в родителе все эл. и клад в пер.
			minutes = timer.querySelector('.minutes'),//ЗДЕСЬ  В ОБЩЕМ ПОЛУЧАЕМ ЭЛЕМЕНТЫ ТАЙМЕРА
			seconds = timer.querySelector('.seconds'),
			timeInterval = setInterval(updateClock,1000);//КАЖДУЮ СЕКУНДУ  ОБНОВЛЯЕМ ТАЙМЕР
			function updateClock() {//обновление таймера  ЗАПИСЫВАЕМ В ПОЛУЧЕННЫЕ ЭЛЕМЕНТЫ ЗНАЧЕНИЯ ПЕРЕМЕННЫХ, ПОЛУЧЕННЫХ В Ф-ЦИИ
				let t = getTimeRemaining(endtime);//t - оставшееся время {}
				if (t.total <= 0) {//если таймер истек, записываем нули и очищаем setInterval
					hours.innerHTML = '00',
				    minutes.innerHTML = '00',
				    seconds.innerHTML = '00';
					clearInterval(timeInterval);		
				} else{
				hours.innerHTML =  t.hours,//записываем на страницу часы
				minutes.innerHTML = t.minutes,//минуты
				seconds.innerHTML = t.seconds;
				}//секунды
			};

			updateClock();//записываем на страницу 
			
	};

	setClock('timer', deadline);//вызов функции deadline в формате год-месяц-число
	//Modal
	let more = document.querySelector('.more'),
	    description = document.querySelectorAll('.description-btn'),
		overlay = document.querySelector('.overlay'),
		close = document.querySelector('.popup-close'),
		popup = document.querySelector('.popup');

	function animation() {
		let pos = 90,
		interval = setInterval(frame, 10);

		function frame() {
			if (pos > 0) {
				pos = pos - 2;
				popup.style.marginLeft = pos + 'px';
			} else {clearInterval(interval);}
		}
		
	}

    for (let i = 0; i < description.length; i++){
		description[i].addEventListener('click', function() {
			this.classList.add('more-splash');
			overlay.style.display = 'block';
			document.body.style.overflow = 'hidden';
			if (!/Edge|IE/i.test(navigator.userAgent)) {
				animation();	
			} else if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
              popup.classList.add('fly');
			} 
			
		   });
		  ;
	} 
    
	more.addEventListener('click', function() {
	 this.classList.add('more-splash');
	 overlay.style.display = 'block';
	 document.body.style.overflow = 'hidden';
	});
	close.addEventListener('click', function() {
	overlay.style.display = 'none';
	more.classList.remove('more-splash');
	document.body.style.overflow = '';
	});

	//form
	let message = new Object();//Объект для оповещения пользователя о взаимодействии с сервером
	message.loading = 'Загрузка...';
	message.success = 'Спасибо! Мы скоро с вами свяжемся';
	message.failure = 'Что то пошло не так...';
    
    function sendRequest(formId) {
		let form = document.getElementById(formId),//получаем форму в popup
		input = form.getElementsByTagName('input'),//поля ввода 
		statusMessage = document.createElement('div');//создаем div для вывода статуса отправки
		statusMessage.classList.add('status');//добавление стилей для div 

		form.addEventListener('submit', function(event) {//обработчик отправки формы
			event.preventDefault();//отмена стандартного действия браузера перехода  action="#"
			form.appendChild(statusMessage);//добавление div в конец формы

			//AJAX
			let request = new XMLHttpRequest();//создаем новый запрос
			request.open("POST", 'server.php')//настраиваем запрос (отправляем данные на 'cервер')

			request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");//работа с заголовком HTTP пишем правильную кодировку для правильной передачи данных
			let formData = new FormData(form);//создаем новый объект через конструктор объект берет все данные с формы (form) данные не в формате json
			request.send(formData);//отправляем эти данные на сервер

			request.onreadystatechange = function() {// onreadystatechange - событие отслеживает статус готовности нашего запрса на данный момент      
				if (request.readyState < 4) {//если запрос еще не готов.Метод readyState отслеживает то, на каком этапе находится наш запрос и возвращает число от 0 до 4, 4-операция выполнена
					statusMessage.innerHTML = message.loading;//кладем в новосозданный div сообщение о загрузке
				} else if (request.readyState === 4) {//зпрос полностью выполнен
					if (request.status == 200 && request.status < 300) {//если все хорошо
						statusMessage.innerHTML = message.success;//сообщение пользователю
					}

				else {
					statusMessage.innerHTML = message.failure;//если сервер не принял наши данные
				}
			}
				}
				for (let i = 0; i < input.length; i++) {
					input[i].value ='';//очищаем все поля ввода

				}
		});
	};
	sendRequest('form');
	sendRequest('main-form');

	//slider
	let slideIndex = 1,//номер слайда
		slides = document.getElementsByClassName('slider-item'),//сам слайд
		prev = document.querySelector('.prev'),//стрелка предыдущий
		next = document.querySelector('.next'),//стрелка следующий
		dotsWrap = document.querySelector('.slider-dots'),//обертка точек
		dots = document.getElementsByClassName('dot');//точки
		 
		showSlides(slideIndex);//показ 1  слайда

		function showSlides(n) {//ф-ция показа текущего слайда 
         if (n > slides.length) {//если нужно пролистать дальше последнего
			slideIndex = 1;//то возвращаемся к первому
		 };
		 if (n < 1) {//если убавили тщ
			 slideIndex = slides.length;//последний слайд
		 };

		 for ( let i = 0; i < slides.length; i++) {//скрываем все слайды
			 slides[i].style.display = 'none';//каждому слайду устанавливаем display none
		 }
		 for ( let i = 0; i < dots.length; i ++) {//у всех точек убираем класс активности
			 dots[i].classList.remove('dot-active');
		 };

		 slides[slideIndex - 1].style.display = 'block';//показываем активный слайд
		 dots[slideIndex - 1].classList.add('dot-active');//активной точке добавляем класс активности
		}

		function plusSlides (n) {//ф-ция добавления или отнимания n-слайдов
			showSlides(slideIndex += n);//вызов функции показа 
		}
		function currentSlide(n) {//получаем номер текущего слайда
			showSlides(slideIndex = n);
		}
		prev.addEventListener('click', function() {//клик на стрелке пред.слайда
			plusSlides(-1);
		});
		next.addEventListener('click', function() {//клик на стрелке след.слайда
			plusSlides(1);
		});

		dotsWrap.addEventListener('click', function(event) {  
          for (let i = 0; i < dots.length + 1; i++) {
			  if (event.target.classList.contains('dot') && event.target == dots[i-1]) {//проверяем содержит то, куда мы кликнули ли класс dot
				  currentSlide(i);
			  }
		  }
		});


		
		let form = document.getElementById('price'),
			input = form.querySelectorAll('INPUT'),
			place = form.querySelector('SELECT'),
			totalValue = form.querySelector('#total');
           
			input[0].value = 0;
			input[1].value = 0;
			totalValue.innerHTML = '0';

			form.addEventListener('change', calcTotal); 
			form.addEventListener('input', calcTotal); 
			input[0].addEventListener('input', setValidator(input[0], /\d/g));

			function setValidator(element, regex) {
				if (element) {
				  let lastValue = element.value;
				  if (!regex.test(lastValue))
					lastValue = '';
				  setInterval(function () {
					let value = element.value;
					if (value != lastValue) {
					  if (regex.test(value))
						lastValue = value;
					  else
						element.value = lastValue;
					}
				  }, 10);
				}
			  }

			function calcTotal(event) {	
					
					
				if (event.target.classList.contains('counter-block-input')) { //если то, что выбрали - это инпут, то проверяем
					if (input[0].value == '' || input[1].value == '' || input[0].value <= 0 || input[1].value <= 0) { //если не все заполнено или заполнено не правильно
						totalValue.innerHTML = '0'; //то выводим ноль
					} else { //если все поля заполнены и корректны то считаем тотал
						totalValue.innerHTML = (+input[0].value + +input[1].value) * 4000 * place.options[place.selectedIndex].value;
					};

				} else if (input[0].value != '' && input[1].value != '' && input[0].value > 0 && input[1].value > 0) {//если выбрали не инпут и все поля заполнены корректно, то считаем с выбранным коэфициентом
					totalValue.innerHTML = (+input[0].value + +input[1].value) * 4000 * event.target.value;
				};
			};		
	
});

