#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
const clear = require("clear");
const figlet = require("figlet");
const inquirer = require("inquirer");
const checkr_lib_1 = require("checkr-lib");
const TITLE = 'Checkr-lib CLI';
const TYPE_COINS = "Coins";
const TYPE_SOCIALS = "Socials";
const TYPE_PERSONALS = "Personals";
const QUESTIONS_MENU = "MENU";
const MENU_MESSAGE = "Choose action:";
const MENU_CHECK_ID = 'Check ID';
const MENU_EXIT = 'Exit';
const MENU_CHECK_TYPE = "TYPE";
const MENU_CHECK_TYPE_MESSAGE = 'Which kind of identifier do you want to check validity?';
const MENU_CHECK_SUBTYPE = "SUBTYPE";
const MENU_CHECK_IDENTIFIER = "IDENTIFIER";
const MENU_CHECK_IDENTIFIER_MESSAGE = 'Which identifier do you want to check validity?';
const run = () => __awaiter(this, void 0, void 0, function* () {
    init();
    loopMenu();
});
run();
function loopMenu() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log();
        let menuAnswer = yield askMenu();
        let menuChoice = menuAnswer[QUESTIONS_MENU];
        switch (menuChoice) {
            case MENU_CHECK_ID:
                checkIdentifier(loopMenu);
                break;
            case MENU_EXIT:
                process.exit(0);
                break;
        }
    });
}
function init() {
    // Clear terminal
    clear();
    console.log(chalk_1.default.yellow(figlet.textSync(TITLE, {
        horizontalLayout: 'full',
    })));
}
function askMenu() {
    const QUESTIONS = [
        {
            name: QUESTIONS_MENU,
            type: 'list',
            message: MENU_MESSAGE,
            choices: [MENU_CHECK_ID, MENU_EXIT],
        },
    ];
    return inquirer.prompt(QUESTIONS);
}
function checkIdentifier(menuCallback) {
    return __awaiter(this, void 0, void 0, function* () {
        let typeAnswer = yield askType();
        let type = typeAnswer.TYPE;
        let subTypeAnswer = yield askSubType(type);
        let subType = subTypeAnswer.SUBTYPE;
        let indentifierAnswer = yield askIdentifier();
        let identifier = indentifierAnswer.IDENTIFIER;
        checkValidity(getEnum(type, subType), identifier);
        menuCallback();
    });
}
function askType() {
    const QUESTIONS = [
        {
            name: MENU_CHECK_TYPE,
            type: 'list',
            message: MENU_CHECK_TYPE_MESSAGE,
            choices: [TYPE_COINS, TYPE_SOCIALS, TYPE_PERSONALS],
        },
    ];
    return inquirer.prompt(QUESTIONS);
}
function askSubType(type) {
    return __awaiter(this, void 0, void 0, function* () {
        const QUESTIONS = [
            {
                name: MENU_CHECK_SUBTYPE,
                type: 'rawlist',
                message: `Which one of ${type} list?`,
                choices: getSublist(type),
            },
        ];
        return inquirer.prompt(QUESTIONS);
    });
}
function getSublist(type) {
    switch (type) {
        case TYPE_COINS:
            return Object.keys(checkr_lib_1.Coins);
        case TYPE_SOCIALS:
            return Object.keys(checkr_lib_1.Socials);
        case TYPE_PERSONALS:
            return Object.keys(checkr_lib_1.Personals);
    }
}
function getEnum(type, subtype) {
    switch (type) {
        case TYPE_COINS:
            return checkr_lib_1.Coins[subtype];
        case TYPE_SOCIALS:
            return checkr_lib_1.Socials[subtype];
        case TYPE_PERSONALS:
            return checkr_lib_1.Personals[subtype];
    }
}
function askIdentifier() {
    const QUESTIONS = [
        {
            name: MENU_CHECK_IDENTIFIER,
            type: 'input',
            message: MENU_CHECK_IDENTIFIER_MESSAGE,
        },
    ];
    return inquirer.prompt(QUESTIONS);
}
function checkValidity(type, id) {
    try {
        let valid = checkr_lib_1.isValid(type, id);
        let text = `${id} is ${valid ? 'valid' : 'invalid'} for the type ${type}`;
        console.log(chalk_1.default[valid ? 'green' : 'red'](text));
    }
    catch (err) {
        let error = 'An error occurred';
        if (err) {
            console.log('toString ', err.toString());
            let errCodes = err.toString().match(/^Error\: (.*)$/);
            if (errCodes && errCodes[1]) {
                error = errCodes[1];
            }
        }
        console.log(chalk_1.default.red(error));
    }
}
//# sourceMappingURL=index.js.map