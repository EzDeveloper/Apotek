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

Route.on('/login').render('login')
Route.post('/login','AuthController.login')

Route.group('auth-route', function() {
	Route.resource('user','UserController')
	Route.resource('role','RoleController')
}).middleware('auth')


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
//Route.get('/customer/:id/detail','CustomerController.detail')


//Transaction
Route.get('/transaction','TransactionController.index')
Route.get('/transaction/detail/:id','TransactionController.show')
Route.get('/transaction/list','TransactionController.list')
Route.get('/transaction/list/create','TransactionController.create')
Route.post('/transaction/list/create','TransactionController.store')
Route.get('/transaction/list/:id','TransactionController.view')

Route.put('/transaction/:id','TransactionController.add')

Route.post('/transaction/list/:id','TransactionController.pay')

//Admin VIEW Sales
Route.get('/sales','TransactionController.sales')
Route.get('/detail/:id','TransactionController.detail')



Route.on('/admin').render('base');
