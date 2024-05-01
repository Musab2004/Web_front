import Dashboard from '@material-ui/icons/Dashboard'
import CategoryIcon from '@material-ui/icons/Category'
import CustomerIcon from '@material-ui/icons/Group'
import RiderIcon from '@material-ui/icons/DirectionsBike'
// core components/views for Admin layout
import DashboardPage from 'views/Dashboard/Dashboard.js'
import UserProfile from 'views/UserProfile/UserProfile.js'
import ShopIcon from '@material-ui/icons/Shop'
import ShoppingCartRoundedIcon from '@material-ui/icons/ShoppingCartRounded'

// Getx's Routes
//Customers
import Customers from 'views/Customers/Customers'
import ViewCustomer from 'views/Customers/ViewCustomer'
import UpdateCustomer from 'views/Customers/UpdateCustomer'
//Suppliers
import Suppliers from 'views/Supplier/Suppliers'
import ViewSupplier from 'views/Supplier/ViewSupplier'
import UpdateSupplier from 'views/Supplier/UpdateSupplier'
//Categories
import Categories from 'views/Categories/Categories'
// Roles
import Roles from 'views/Roles/Roles'
// Products
import Products from 'views/Products/Products'
import AddProduct from 'views/Products/AddProduct'
import UpdateProduct from 'views/Products/UpdateProducts'
// Purchases
import Purchases from 'views/Purchases/Purchases'
import PurchaseDetail from 'views/Purchases/PurchaseDetail'

//Unit
import Units from 'views/Units/Units'
//Discounts
import Discounts from 'views/Discounts/Discounts'
import { AcUnitOutlined, AndroidSharp, ContactSupportOutlined, MeetingRoomTwoTone, MoneyOffOutlined } from '@material-ui/icons'
import AddPurchase from 'views/Purchases/AddPurchase'
import Sales from 'views/Sales/Sales'
import SaleDetail from 'views/Sales/SaleDetails'
import Person from '@material-ui/icons/Person'
import Users from 'views/Users/Users'
import Cookies from 'js-cookie'
import { userState } from 'states/userState'



function determineFinalRoutes() {
  let user = userState.get()
  let finalRoutes = [
    {
      path: '/',
      name: 'Dashboard',
      rtlName: 'لوحة القيادة',
      icon: Dashboard,
      component: DashboardPage,
      layout: '/admin',
    },
    {
      path: '/user',
      name: 'User Profile',
      icon: Person,
      component: UserProfile,
      layout: '/admin',
      invisible: true
    },
  ];
  console.log(user)
  if (!user.permissions) {
    return finalRoutes
  }
  console.log(user)

  if (user.permissions.find(p => p === 'po.add')) {
    finalRoutes.push({
      path: '/purchases/add',
      name: 'Add Purchase Order',
      icon: ShoppingCartRoundedIcon,
      component: AddPurchase,
      layout: '/admin',
      invisible: true,
    })

  }
  if (user.permissions.find(p => p === 'po.add')) {
    finalRoutes.push({
      path: '/purchases',
      name: 'Purchases',
      icon: ShoppingCartRoundedIcon,
      component: Purchases,
      layout: '/admin',
    }, {
      path: '/purchases/view/:id',
      name: 'View Purchase Detail',
      icon: ShoppingCartRoundedIcon,
      component: PurchaseDetail,
      layout: '/admin',
      invisible: true,
    })
  }
  if (user.permissions.find(p => p === 'so.add')) {
    finalRoutes.push({
      path: '/sales',
      name: 'Sales',
      icon: ShoppingCartRoundedIcon,
      component: Sales,
      layout: '/admin',
    }, {
      path: '/sales/view/:id',
      name: 'View Sale Detail',
      icon: ShoppingCartRoundedIcon,
      component: SaleDetail,
      layout: '/admin',
      invisible: true,
    })
  }
  if (user.permissions.find(p => p === 'supplier.add')) {
    finalRoutes.push({
      path: '/suppliers',
      name: 'Suppliers',
      icon: ContactSupportOutlined,
      component: Suppliers,
      layout: '/admin',
    },
      {
        path: '/suppliers/:id',
        name: 'View Supplier',
        icon: RiderIcon,
        component: ViewSupplier,
        layout: '/admin',
        invisible: true,
      })
  }
  if (user.permissions.find(p => p === 'supplier.update')) {
    finalRoutes.push({
      path: '/suppliers/update/:id',
      name: 'Update Supplier',
      icon: RiderIcon,
      component: UpdateSupplier,
      layout: '/admin',
      invisible: true,
    })
  }
  if (user.permissions.find(p => p === 'customer.add')) {
    finalRoutes.push({
      path: '/customers',
      name: 'Customers',
      icon: CustomerIcon,
      component: Customers,
      layout: '/admin',
    },
      {
        path: '/customers/:id',
        name: 'View Customer',
        icon: RiderIcon,
        component: ViewCustomer,
        layout: '/admin',
        invisible: true,
      })
  }
  if (user.permissions.find(p => p === 'customer.update')) {
    finalRoutes.push({
      path: '/customers/update/:id',
      name: 'Update Customer',
      icon: RiderIcon,
      component: UpdateCustomer,
      layout: '/admin',
      invisible: true,
    })
  }
  if (user.permissions.find(p => p === 'product.add')) {
    finalRoutes.push({
      path: '/products',
      name: 'Products',
      icon: ShopIcon,
      component: Products,
      layout: '/admin',
    })
  }
  if (user.permissions.find(p => p === 'product.add')) {
    finalRoutes.push({
      path: '/products/add',
      name: 'Add Product',
      icon: CustomerIcon,
      component: AddProduct,
      layout: '/admin',
      invisible: true,
    }, {
      path: '/products/update/:id',
      name: 'Update Product',
      icon: CustomerIcon,
      component: UpdateProduct,
      layout: '/admin',
      invisible: true,
    })
  }
  if (user.permissions.find(p => p === 'category.add')) {
    finalRoutes.push({
      path: '/categories',
      name: 'Categories',
      icon: CategoryIcon,
      component: Categories,
      layout: '/admin',
    })
  }
  if (user.role === 'Admin') {
    finalRoutes.push({
      path: '/roles',
      name: 'Roles',
      icon: MeetingRoomTwoTone,
      component: Roles,
      layout: '/admin',
    })
  }

  if (user.role === 'Admin') {
    finalRoutes.push({
      path: '/users',
      name: 'Users',
      icon: Person,
      component: Users,
      layout: '/admin',
    })
  }
  if (user.permissions.find(p => p === 'unit.add')) {
    finalRoutes.push({
      path: '/units',
      name: 'Units',
      icon: AcUnitOutlined,
      component: Units,
      layout: '/admin',
    })
  }
  if (user.permissions.find(p => p === 'discount.add')) {
    finalRoutes.push({
      path: '/discounts',
      name: 'Discounts',
      icon: AcUnitOutlined,
      component: Discounts,
      layout: '/admin',
    })
  }

  return finalRoutes;

}

// const dashboardRoutes = [
//   {
//     path: '/',
//     name: 'Dashboard',
//     rtlName: 'لوحة القيادة',
//     icon: Dashboard,
//     component: DashboardPage,
//     layout: '/admin',
//   },
//   {
//     path: '/user',
//     name: 'User Profile',
//     icon: Person,
//     component: UserProfile,
//     layout: '/admin',
//     invisible: true
//   },
//   {
//     path: '/roles',
//     name: 'Roles',
//     icon: MeetingRoomTwoTone,
//     component: Roles,
//     layout: '/admin',
//   },
//   {
//     path: '/users',
//     name: 'Users',
//     icon: Person,
//     component: Users,
//     layout: '/admin',
//   },
//   {
//     path: '/categories',
//     name: 'Categories',
//     icon: CategoryIcon,
//     component: Categories,
//     layout: '/admin',
//   },
//   {
//     path: '/units',
//     name: 'Units',
//     icon: AcUnitOutlined,
//     component: Units,
//     layout: '/admin',
//   },
//   {
//     path: '/discounts',
//     name: 'Discounts',
//     icon: AcUnitOutlined,
//     component: Discounts,
//     layout: '/admin',
//   },
//   {
//     path: '/products',
//     name: 'Products',
//     icon: ShopIcon,
//     component: Products,
//     layout: '/admin',
//   },
//   {
//     path: '/products/add',
//     name: 'Add Product',
//     icon: CustomerIcon,
//     component: AddProduct,
//     layout: '/admin',
//     invisible: true,
//   },
//   {
//     path: '/products/update/:id',
//     name: 'Update Product',
//     icon: CustomerIcon,
//     component: UpdateProduct,
//     layout: '/admin',
//     invisible: true,
//   },
//   {
//     path: '/customers',
//     name: 'Customers',
//     icon: CustomerIcon,
//     component: Customers,
//     layout: '/admin',
//   },
//   {
//     path: '/customers/update/:id',
//     name: 'Update Customer',
//     icon: RiderIcon,
//     component: UpdateCustomer,
//     layout: '/admin',
//     invisible: true,
//   },
//   {
//     path: '/customers/:id',
//     name: 'View Customer',
//     icon: RiderIcon,
//     component: ViewCustomer,
//     layout: '/admin',
//     invisible: true,
//   },
//   {
//     path: '/suppliers',
//     name: 'Suppliers',
//     icon: ContactSupportOutlined,
//     component: Suppliers,
//     layout: '/admin',
//   },
//   {
//     path: '/suppliers/update/:id',
//     name: 'Update Supplier',
//     icon: RiderIcon,
//     component: UpdateSupplier,
//     layout: '/admin',
//     invisible: true,
//   },
//   {
//     path: '/suppliers/:id',
//     name: 'View Supplier',
//     icon: RiderIcon,
//     component: ViewSupplier,
//     layout: '/admin',
//     invisible: true,
//   },
//   {
//     path: '/purchases',
//     name: 'Purchases',
//     icon: ShoppingCartRoundedIcon,
//     component: Purchases,
//     layout: '/admin',
//   },
//   {
//     path: '/purchases/add',
//     name: 'Add Purchase Order',
//     icon: ShoppingCartRoundedIcon,
//     component: AddPurchase,
//     layout: '/admin',
//     invisible: true,
//   },
//   {
//     path: '/purchases/view/:id',
//     name: 'View Purchase Detail',
//     icon: ShoppingCartRoundedIcon,
//     component: PurchaseDetail,
//     layout: '/admin',
//     invisible: true,
//   },
//   {
//     path: '/sales',
//     name: 'Sales',
//     icon: ShoppingCartRoundedIcon,
//     component: Sales,
//     layout: '/admin',
//   },
//   {
//     path: '/sales/view/:id',
//     name: 'View Sale Detail',
//     icon: ShoppingCartRoundedIcon,
//     component: SaleDetail,
//     layout: '/admin',
//     invisible: true,
//   },
// ]

const dashboardRoutes = determineFinalRoutes();

export default determineFinalRoutes;
