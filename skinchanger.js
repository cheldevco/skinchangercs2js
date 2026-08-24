// =======================================================
// JS-МОД: СКИНЧЕНДЖЕР И ПРАНКИ С ИГРОВЫМИ ПЛАШКАМИ
// =======================================================

let currentMenu = "main";
let isAimEnabled = false;
let isWhEnabled = false;

// Функция, которая вызывает крупные анимированные плашки игры
function ShowAlert(title, subtitle) {
    // Используем скрытую команду движка для вывода турнирных и игровых оповещений
    // Параметры передают заголовок и подзаголовок прямо на экран
    Engine.ExecuteClientCmd("ui_event 'show_survival_notice' '" + title + "' '" + subtitle + "'");
}

// Обновление меню
function UpdateMenu() {
    if (currentMenu === "main") {
        ShowAlert("=== ГЛАВНОЕ МЕНЮ ===", "[1] НОЖИ  |  [2] АГЕНТЫ  |  [3] ПРАНКИ");
    } 
    else if (currentMenu === "knives") {
        ShowAlert("== СKИНЧЕНДЖЕР НОЖЕЙ ===", "[1] КЕРАМБИТ  |  [2] БАБОЧКА  |  [3] М9  |  [G] НАЗАД");
    } 
    else if (currentMenu === "agents") {
        ShowAlert("=== ВЫБОР АГЕНТА ===", "[1] FBI  |  [2] SAS  |  [3] PHOENIX  |  [G] НАЗАД");
    } 
    else if (currentMenu === "pranks") {
        let aimStatus = isAimEnabled ? "ВКЛ" : "ВЫКЛ";
        let whStatus = isWhEnabled ? "ВКЛ" : "ВЫКЛ";
        ShowAlert("=== ПРАНК ФУНКЦИИ ===", "[1] АИМ [" + aimStatus + "]  |  [2] ВХ [" + whStatus + "]  |  [G] НАЗАД");
    }
}

// Перехват нажатий кнопок
function OnPlayerCommand(event) {
    let cmd = event.command;

    // Кнопка НАЗАД (выброс оружия / G)
    if (cmd === "drop" && currentMenu !== "main") {
        currentMenu = "main";
        UpdateMenu();
        return;
    }

    // Главная страница
    if (currentMenu === "main") {
        if (cmd === "slot1") { currentMenu = "knives"; UpdateMenu(); }
        if (cmd === "slot2") { currentMenu = "agents"; UpdateMenu(); }
        if (cmd === "slot3") { currentMenu = "pranks"; UpdateMenu(); }
    } 
    // Меню ножей
    else if (currentMenu === "knives") {
        if (cmd === "slot1") { Engine.ExecuteClientCmd("slot3; drop; give weapon_knife_karambit"); }
        if (cmd === "slot2") { Engine.ExecuteClientCmd("slot3; drop; give weapon_knife_butterfly"); }
        if (cmd === "slot3") { Engine.ExecuteClientCmd("slot3; drop; give weapon_knife_m9_bayonet"); }
    } 
    // Меню агентов
    else if (currentMenu === "agents") {
        if (cmd === "slot1") { Engine.ExecuteClientCmd("sub_model models/player/custom_player/legacy/ctm_fbi_variantf.vmdl"); }
        if (cmd === "slot2") { Engine.ExecuteClientCmd("sub_model models/player/custom_player/legacy/ctm_sas_variantf.vmdl"); }
        if (cmd === "slot3") { Engine.ExecuteClientCmd("sub_model models/player/custom_player/legacy/tm_phoenix_varianti.vmdl"); }
    } 
    // Меню пранков (Аим и ВХ)
    else if (currentMenu === "pranks") {
        if (cmd === "slot1") {
            isAimEnabled = !isAimEnabled;
            UpdateMenu();
        }
        if (cmd === "slot2") {
            isWhEnabled = !isWhEnabled;
            if (isWhEnabled) {
                Engine.ExecuteClientCmd("r_drawothermodels 2");
            } else {
                Engine.ExecuteClientCmd("r_drawothermodels 1");
            }
            UpdateMenu();
        }
    }
}

// Цикл для работы Аим-магнита
function AimThinkLoop() {
    if (isAimEnabled) {
        Engine.ExecuteClientCmd("ent_teleport cs_bot"); 
    }
    ScriptSetTimer(0.1, AimThinkLoop); 
}

// Стартовый запуск
AimThinkLoop();
UpdateMenu();
