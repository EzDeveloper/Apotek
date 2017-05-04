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

Route.resource('user','UserController')
Route.resource('role','RoleController')

Route.resource('stock','StockController');
Route.get('/stock/:id/add','StockController.add')
Route.post('/stock/:id/add','StockController.increase')


//Route.delete('/medicine/:id/create/:ingredient_id','IngredientController.destroy')

//Ingredient Routing
Route.get('/ingredient','IngredientController.index')
Route.get('/ingredient/:id','IngredientController.show')


//Medicine Routing
Route.get('/medicine/:id/ingredient','IngredientController.create')
Route.post('/medicine/:id/ingredient/create','IngredientController.store')


Route.post('/medicine/:id','MedicineController.ready')
Route.get('/medicine','MedicineController.newMedicine')
Route.get('/medicine/create','MedicineController.create')
Route.post('/medicine','MedicineController.store')
Route.get('/medicine/report','MedicineController.index')

//Pharmacist Stock
Route.get('/medicine/stock','StockController.showPharmacistStock')



//Customer
Route.resource('customer','CustomerController')


//Transaction


Route.on('/admin').render('base');
