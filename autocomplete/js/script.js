let countries = ["Австралия", "Австрия", "Азербайджан", "Албания", "Алжир", "Ангола", "Андорра", "Антигуа и Барбуда", "Антильские острова", "Аргентина", "Армения", "Афганистан", "Багамские острова", "Бангладеш", "Барбадос", "Бахрейн", "Белиз", "Белоруссия", "Бельгия", "Бенин", "Болгария", "Боливия", "Босния и Герцеговина", "Ботсвана", "Бразилия", "Буркина-Фасо", "Бурунди", "Бутан", "Вануату", "Ватикан", "Великобритания", "Венгрия", "Венесуэла", "Вьетнам", "Габон", "Гаити", "Гайана", "Гамбия", "Гана", "Гватемала", "Гвинея", "Гвинея-Бисау", "Германия", "Голландия", "Гондурас", "Гонконг", "Гренада", "Гренландия", "Греция", "Грузия", "Гуам", "Дания", "Демократическая Республика Конго", "Джибути", "Доминиканская республика", "Египет", "Замбия", "Западная Сахара", "Зимбабве", "Израиль", "Индия", "Индонезия", "Иордания", "Ирак", "Иран", "Ирландия", "Исландия", "Испания", "Италия", "Йемен", "Кабо-Верде", "Казахстан", "Камбоджа", "Камерун", "Канада", "Катар", "Кения", "Кипр", "Киргизия", "Кирибати", "Китай", "КНДР", "Колумбия", "Коморские острова", "Коста-Рика", "Кот-д'Ивуар", "Куба", "Кувейт", "Лаос", "Латвия", "Лесото", "Либерия", "Ливан", "Ливия", "Литва", "Лихтенштейн", "Люксембург", "Маврикий", "Мавритания", "Мадагаскар", "Македония", "Малави", "Малайзия", "Мали", "Мальдивы", "Мальта", "Марокко", "Мартиника", "Мексика", "Микронезия", "Мозамбик", "Молдавия", "Монако", "Монголия", "Мьянма", "Намибия", "Непал", "Нигер", "Нигерия", "Никарагуа", "Новая Зеландия", "Новая Каледония", "Норвегия", "ОАЭ", "Оман", "Пакистан", "Палестина", "Панама", "Папуа-Новая Гвинея", "Парагвай", "Перу", "Польша", "Португалия", "Пуэрто-Рико", "Республика Конго", "Республика Корея", "Россия", "Руанда", "Румыния", "Сальвадор", "Сан-Марино", "Сан-Томе и Принсипи", "Саудовская Аравия", "Свазиленд", "Сенегал", "Сент-Китс и Невис", "Сент-Люсия", "Сербия", "Сингапур", "Сирия", "Словакия", "Словения", "Соломоновы острова", "Сомали", "Судан", "Суринам", "США", "Сьерра-Леоне", "Таджикистан", "Таиланд", "Тайвань", "Танзания", "Того", "Тонга", "Тринидад и Тобаго", "Тунис", "Туркменистан", "Турция", "Уганда", "Узбекистан", "Украина", "Уругвай", "Фиджи", "Филиппины", "Финляндия", "Франция", "Французская Гвиана", "Хорватия", "Центральноафриканская Республика", "Чад", "Черногория", "Чехия", "Чили", "Швейцария", "Швеция", "Шри-Ланка", "Эквадор", "Экваториальная Гвинея", "Эритрея", "Эстония", "Эфиопия", "ЮАР", "Ямайка", "Япония"],
    input = document.querySelector('input'),
    autocompletе = document.querySelector('#list');

autocompletе.addEventListener('click', function (event) {//
if (event.target) {
     input.value = event.target.textContent;
    autocompletе.innerHTML = '';
}
});

input.addEventListener('keyup', () => {
    autocompletе.innerHTML = '';//очищаем автозаполнение
    let currentValue = input.value, //получаем текущее значение введенных символов
        length = currentValue.length, //количество введенных символов

        filter = countries.filter(function (item) {
            return item.slice(0, length).toLowerCase() == currentValue.toLowerCase();
        });

    if (length > 0) {
        console.log(filter);
        record(filter);
    }
});

function record(arr) {//выдача вариантов
    arr.forEach(function (item) {
        let newVariant = document.createElement('div');
        newVariant.textContent = item;
        newVariant.classList.add('pointer');
        autocompletе.style.position = 'absolute';
        autocompletе.style.right = '0';
        autocompletе.style.left = '0';
        autocompletе.appendChild(newVariant); 
    })
};