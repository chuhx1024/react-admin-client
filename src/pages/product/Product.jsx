import React, { Component } from 'react'
import {Switch, Route, Redirect} from "react-router-dom"
import ProductHome from './ProductHome'
import ProductDetail from './ProductDetail'
import ProductAddEdit from './ProductAddEdit'

export default class Product extends Component {
  render() {
    return (
      <Switch>
        <Route path="/product" exact component={ProductHome}></Route>
        <Route path="/product/detail" component={ProductDetail}></Route>
        <Route path="/product/add-edit" component={ProductAddEdit}></Route>
        <Redirect to="/product"></Redirect>
      </Switch>
      
    )
  }
}
