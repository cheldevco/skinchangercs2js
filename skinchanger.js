// =======================================================
// JS-МОД: УПРАВЛЕНИЕ СКИНЧЕНДЖЕРОМ И ПРАНКАМИ ЧЕРЕЗ ЧАТ
// =======================================================

// Переменные для пранков
var isAimEnabled = false;
var isWhEnabled = false;

// Безопасная функция для вывода сочных игровых плашек
function ShowAlert(title, subtitle) {
    SendToConsole("ui_event 'show_survival_notice' '" + title + "' '" + subtitle + "'");
}

// Функция, которая читает всё, что пишется в чат игры
function OnPlayerChat(event) {
    // Переводим текст в нижний регистр, чтобы работало и капсом, и мелкими буквами
    var text = event.text.toLowerCase(); 

    // --- КOМАНДЫ ДЛЯ МЕНЮ НОЖЕЙ ---
    if (text === "!knife karambit" || text === "!керамбит") {
        SendToConsole("slot3; drop; ent_create weapon_knife_karambit");
        ShowAlert("=== СKИНЧЕНДЖЕР ===", "Выдан нож: КЕРАМБИТ");
    }
    else if (text === "!knife butterfly" || text === "!бабочка") {
        SendToConsole("slot3; drop; ent_create weapon_knife_butterfly");
        ShowAlert("=== СKИНЧЕНДЖЕР ===", "Выдан нож: БАБОЧКА");
    }
    else if (text === "!knife m9" || text === "!м9") {
        SendToConsole("slot3; drop; ent_create weapon_knife_m9_bayonet");
        ShowAlert("=== СKИНЧЕНДЖЕР ===", "Выдан нож: ШТЫК-НОЖ M9");
    }

    // --- КOМАНДЫ ДЛЯ СМЕНЫ АГЕНТОВ ---
    else if (text === "!agent fbi" || text === "!фбr") {
        SendToConsole("sub_model models/player/custom_player/legacy/ctm_fbi_variantf.vmdl");
        ShowAlert("=== СМЕНА АГЕНТА ===", "Выдан агент: FBI");
    }
    else if (text === "!agent sas" || text === "!сас") {
        SendToConsole("sub_model models/player/custom_player/legacy/ctm_sas_variantf.vmdl");
        ShowAlert("=== СМЕНА АГЕНТА ===", "Выдан агент: SAS");
    }

    // --- КOМАНДЫ ДЛЯ ПРАНКОВ (АИМ И ВХ) ---
    else if (text === "!aim" || text === "!аим") {
        isAimEnabled = !isAimEnabled;
        var status = isAimEnabled ? "ВКЛЮЧЕН" : "ВЫКЛЮЧЕН";
        ShowAlert("=== ПРАНК АИМ ===", "Режим авто-наведения: " + status);
        if (isAimEnabled) { StartAimLoop(); }
    }
    else if (text === "!wh" || text === "!вх") {
        isWhEnabled = !isWhEnabled;
        if (isWhEnabled) {
            SendToConsole("r_drawothermodels 2");
            ShowAlert("=== ПРАНК ВХ ===", "Подсветка стен: ВКЛЮЧЕНА");
        } else {
            SendToConsole("r_drawothermodels 1");
            ShowAlert("=== ПРАНК ВХ ===", "Подсветка стен: ВЫКЛЮЧЕНА");
        }
    }
    
    // --- СПРАВКА / ПОМОЩЬ ---
    else if (text === "!help" || text === "!команды" || text === "!menu") {
        ShowAlert("=== КОМАНДЫ В ЧАТ ===", "!керамбит | !бабочка | !м9 | !аим | !вх");
    }
}

// Постоянный цикл для работы Аим-магнита (стягивает ботов к прицелу)
function StartAimLoop() {
    if (isAimEnabled) {
        SendToConsole("ent_teleport cs_bot");
        // Повторяем проверку каждые 0.1 секунды
        DoUniqueStringTimeAsync(0.1, function() { StartAimLoop(); });
    }
}

// Заставляем игру слушать событие чата и передавать данные в нашу функцию
ListenToGameEvent("player_chat", OnPlayerChat, null);

// Выводим стартовую плашку-инструкцию при загрузке
ShowAlert("=== ЧАТ-МОД ЗАГРУЖЕН ===", "Напиши в чат !menu или !команды");
