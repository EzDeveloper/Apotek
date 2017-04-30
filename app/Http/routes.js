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

//Ingredient Routing
Route.get('/ingredient','IngredientController.index')
Route.get('/ingredient/:id','IngredientController.show')
Route.delete('/ingredient/:id','IngredientController.destroy')
<<<<<<< HEAD


//Medicine Routing
Route.get('/medicine/:id/create','IngredientController.create')
Route.post('/medicine/:id/create','IngredientController.store')
=======
>>>>>>> 23732e6888dce4af6589d289838e67daf1a02e84

Route.on('/admin').render('base');
