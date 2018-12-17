#!/usr/bin/env node

import chalk from 'chalk';
import * as clear from 'clear';
import * as figlet from 'figlet';
import * as inquirer from 'inquirer';
import { isValid, Coins, Socials, Personals } from 'checkr-lib';

const TITLE: string = 'Checkr-lib CLI';

const TYPE_COINS: string = "Coins";
const TYPE_SOCIALS: string = "Socials";
const TYPE_PERSONALS: string = "Personals";

const QUESTIONS_MENU: string = "MENU";

const MENU_MESSAGE: string = "Choose action:"
const MENU_CHECK_ID: string = 'Check ID';
const MENU_EXIT: string = 'Exit';

const MENU_CHECK_TYPE: string = "TYPE";
const MENU_CHECK_TYPE_MESSAGE: string = 'Which kind of identifier do you want to check validity?';
const MENU_CHECK_SUBTYPE: string = "SUBTYPE";
const MENU_CHECK_IDENTIFIER: string = "IDENTIFIER";
const MENU_CHECK_IDENTIFIER_MESSAGE: string = 'Which identifier do you want to check validity?'


const run = async () => {
  init();
  loopMenu();
};

run();

async function loopMenu() {
  console.log();
  let menuAnswer = await askMenu();
  let menuChoice = (menuAnswer as any)[QUESTIONS_MENU];
  switch (menuChoice) {
    case MENU_CHECK_ID:
      checkIdentifier(loopMenu);
      break;
    case MENU_EXIT:
      process.exit(0);
      break;
  }
}

function init() {
  // Clear terminal
  clear();
  console.log(
    chalk.yellow(
      figlet.textSync(TITLE, {
        horizontalLayout: 'full',
      }),
    ),
  );
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

async function checkIdentifier(menuCallback: Function) {
  let typeAnswer = await askType();
  let type: string = (typeAnswer as any).TYPE;

  let subTypeAnswer = await askSubType(type);
  let subType: string = (subTypeAnswer as any).SUBTYPE;

  let indentifierAnswer = await askIdentifier();
  let identifier: string = (indentifierAnswer as any).IDENTIFIER;

  checkValidity(getEnum(type, subType), identifier);
  menuCallback();
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

async function askSubType(type: string) {
  const QUESTIONS = [
    {
      name: MENU_CHECK_SUBTYPE,
      type: 'rawlist',
      message: `Which one of ${type} list?`,
      choices: getSublist(type),
    },
  ];
  return inquirer.prompt(QUESTIONS);
}

function getSublist(type: string) {
  switch (type) {
    case TYPE_COINS:
      return Object.keys(Coins);
    case TYPE_SOCIALS:
      return Object.keys(Socials);
    case TYPE_PERSONALS:
      return Object.keys(Personals);
  }
}

function getEnum(type: string, subtype: any): Coins | Socials | Personals | undefined {
  switch (type) {
    case TYPE_COINS:
      return Coins[subtype] as Coins;
    case TYPE_SOCIALS:
      return Socials[subtype] as Socials;
    case TYPE_PERSONALS:
      return Personals[subtype] as Personals;
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

function checkValidity(type: any, id: string) {
  try {
    let valid = isValid(type, id);
    let text = `${id} is ${valid ? 'valid' : 'invalid'} for the type ${type}`;
    console.log(chalk[valid ? 'green' : 'red'](text));
  } catch (err) {
    let error = 'An error occurred';
    if (err) {
      let errCodes: RegExpMatchArray | null = err.toString().match(/^Error\: (.*)$/);
       if (errCodes && errCodes[1]) {
        error = errCodes[1];
       }
    }
    console.log(chalk.red(error));
  }
}
