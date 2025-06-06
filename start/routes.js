'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
    Route.get('balance', 'WalletController.getBalance')
    Route.get('history', 'WalletController.getHistory')
}).prefix('api/v3/wallet').middleware('auth').middleware('session')


Route.group(() => {
    Route.get('category', 'WalletController.getCategory')
}).prefix('api/v3/wallet')