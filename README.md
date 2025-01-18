# Crimpy boulder app

This project aims to create a boulder app to track personal improvements.

## Tec

- [react native](https://reactnative.dev/) for the app in the mobile folder
- [pocketbase](https://pocketbase.io/) for database in the pocketbase folder


### Development

This project also contains a containerfile for a development container with android. It can be found in the `.container` file.
It contains all the required libraries for developing with this stack. It can be used with docker, toolboox, podman, ...


### Starting the app

- Enter the container e.g. `toolbox enter CrimpyContainerTbx`
- Enter the  mobile folder `cd mobile/`
- Install libraries with `npm install`
- Start with `npm start`

This will start expo and you can connect your phone with it. For the android emulator, run `npm run emulator` in the container. Then press `a` in the expo terminal. To connect the app to the locally running pocketbase, you have to reverse ports with `npm run connect`.

### Starting pocketbase

- Enter the pocketbase folder `cd pocketbase/`
- Start it with `./pocketbase serve`

You should be able to enter the GUI under the given address.

### Types

Types are shared between pocketbase and the app with [zod-pocketbase](https://zod-pocketbase.vercel.app/). Changing the types or the schema should take place in pocketbase. You can use the admin gui or write a migration file. Follow this steps to get the changes trough:

- Start pocketbase (see above)
- Make changes in gui
- Make sure you are in the pocketbase directory
- Write migrations with `./pocketbase migrate collections` and follow the instructions
- Change to the mobile directory `cd ../mobile`
- Generate the schema with `npx zod-pocketbase`

