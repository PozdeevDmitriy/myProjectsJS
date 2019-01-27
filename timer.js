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