import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item
  incrementCartItemQuantity = (id, quantity) => {
    if (quantity > 0) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachItem => {
          if (eachItem.id === id) {
            return {...eachItem, quantity: eachItem.quantity + 1}
          }
          return eachItem
        }),
      }))
    }
  }

  decrementCartItemQuantity = (id, quantity) => {
    const {cartList} = this.state
    if (quantity > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachItem => {
          if (eachItem.id === id) {
            return {...eachItem, quantity: eachItem.quantity - 1}
          }
          return eachItem
        }),
      }))
    } else {
      const deleteList = cartList.filter(item => item.id !== id)
      this.setState({cartList: deleteList})
    }
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const removedItemList = cartList.filter(item => item.id !== id)
    this.setState({cartList: removedItemList})
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  addCartItem = product => {
    const {cartList} = this.state

    //   TODO: Update the code here to implement addCartItem
    const productId = product.id
    const productQuantity = product.quantity

    const checkIfExits = cartList.find(eachItem => eachItem.id === productId)

    if (checkIfExits === undefined) {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    } else {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachItem => {
          if (eachItem.id === productId) {
            return {
              ...eachItem,
              quantity: eachItem.quantity + productQuantity,
            }
          }
          return eachItem
        }),
      }))
    }
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
