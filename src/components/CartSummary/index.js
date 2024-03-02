// Write your code here
import './index.css'
import CartContext from '../../context/CartContext'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const ItemsInCart = cartList.length

      const getTotalAmount = () => {
        const sumAmount = cartList.map(
          product => product.price * product.quantity,
        )
        const totalAmount = sumAmount.reduce(
          (accumulator, price) => accumulator + price,
        )
        return totalAmount
      }

      return (
        <div className="summary-container">
          <h1 className="total-price">
            Order Total:{' '}
            <span className="total-amount">Rs {getTotalAmount()}/-</span>
          </h1>
          <p className="items-text">
            {ItemsInCart}
            {ItemsInCart > 1 ? ' items' : ' item'} in cart
          </p>
          <button className="checkout-button" type="button">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)
export default CartSummary
