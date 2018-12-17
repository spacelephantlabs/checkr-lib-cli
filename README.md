# checkr-lib-cli

## Description
`checkr-lib-cli` is a javascript CLI to check digital identifiers validity.


## How to install
checkr-lib-cli is available on npm. It can be installed as global library: `yarn global add checkr-lib-cli`

## How to use
After installed `checkr-lib-cli` globaly, run it with this simple command: `checkr`

Now, you can use it!

### Menu

#### Check ID
Start checking ID

##### Choose Type
- Coins:  Coin identifiers (token, coin)
- Socials: Social identifiers
- Personals: Personal identifiers

##### Choose Sub-type
Choose specific sub-type

##### Identifier
Check specific identifier validity

#### Exit
Exit `checkr-lib-cli`

## How to uninstall
`yarn global remove checkr-lib-cli`

## How to build

(Node version >=8.0.0 required)

1. `yarn`
2. `yarn build`
3. `yarn start`

Remove built files : `yarn clean`

Remove built files AND `node_modules` : `yarn cleanAll`