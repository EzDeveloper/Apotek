'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route')

Route.on('/').render('login')
Route.resource('customer','CustomerController')
Route.resource('user','UserController')
Route.resource('role','RoleController')
Route.resource('stock','StockController');
Route.get('stock/:id/add','StockController.add')
Route.post('stock/:id/add','StockController.increase')

Route.on('/admin').render('base');
