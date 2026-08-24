// =======================================================
// JS-МОД: СКИНЧЕНДЖЕР И ПРАНКИ ЧЕРЕЗ ФУНКЦИИ (БЕЗ БЛОКИРОВОК)
// =======================================================

var isAimEnabled = false;
var isWhEnabled = false;

// Безопасная функция для вывода сочных игровых плашек
function ShowAlert(title, subtitle) {
    SendToConsole("ui_event 'show_survival_notice' '" + title + "' '" + subtitle + "'");
}

// Функции для ножей
function SetKarambit() {
    SendToConsole("slot3; drop; ent_create weapon_knife_karambit");
    ShowAlert("=== СKИНЧЕНДЖЕР ===", "Выдан нож: КЕРАМБИТ");
}

function SetButterfly() {
    SendToConsole("slot3; drop; ent_create weapon_knife_butterfly");
    ShowAlert("=== СKИНЧЕНДЖЕР ===", "Выдан нож: БАБОЧКА");
}

function SetM9() {
    SendToConsole("slot3; drop; ent_create weapon_knife_m9_bayonet");
    ShowAlert("=== СKИНЧЕНДЖЕР ===", "Выдан нож: ШТЫК-НОЖ M9");
}

// Функции для агентов
function SetAgentFBI() {
    SendToConsole("sub_model models/player/custom_player/legacy/ctm_fbi_variantf.vmdl");
    ShowAlert("=== СМЕНА АГЕНТА ===", "Выдан агент: FBI");
}

function SetAgentSAS() {
    SendToConsole("sub_model models/player/custom_player/legacy/ctm_sas_variantf.vmdl");
    ShowAlert("=== СМЕНА АГЕНТА ===", "Выдан агент: SAS");
}

// Функции для пранков
function ToggleAim() {
    isAimEnabled = !isAimEnabled;
    var status = isAimEnabled ? "ВКЛЮЧЕН" : "ВЫКЛЮЧЕН";
    ShowAlert("=== ПРАНК АИМ ===", "Режим авто-наведения: " + status);
    if (isAimEnabled) { StartAimLoop(); }
}

function ToggleWH() {
    isWhEnabled = !isWhEnabled;
    if (isWhEnabled) {
        SendToConsole("r_drawothermodels 2");
        ShowAlert("=== ПРАНК ВХ ===", "Подсветка стен: ВКЛЮЧЕНА");
    } else {
        SendToConsole("r_drawothermodels 1");
        ShowAlert("=== ПРАНК ВХ ===", "Подсветка стен: ВЫКЛЮЧЕНА");
    }
}

// Цикл для работы Аима
function StartAimLoop() {
    if (isAimEnabled) {
        SendToConsole("ent_teleport cs_bot");
        DoUniqueStringTimeAsync(0.1, function() { StartAimLoop(); });
    }
}

// Показываем стартовую плашку при загрузке конфига
ShowAlert("=== МОД ЗАРЯЖЕН ===", "Команды в консоли: k, b, m9, aim, wh");
