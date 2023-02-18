import React, { Component } from 'react'
import CategoryList from './CategoryList';
import Navi from './Navi';
import ProductList from './ProductList';
import { Container, Row, Col } from 'reactstrap'


export default class App extends Component {

  componentDidMount(){
    this.getProducts();
  }

  state={currentCategory: "", products: []}

  changeCategory = (category) => {
    this.setState({currentCategory:category.categoryName});
    this.getProducts(category.seoUrl)
  };

  getProducts = seoUrl => {
    let url = "http://localhost:3000/products";
    if(seoUrl){
      url += "/" + seoUrl;
    }
    fetch(url)
    .then(response=>response.json())
    .then(data=>this.setState({products:data}));;
  
  }


   

   render() {
    let productInfo = {title:"ProductList"};
    let categoryInfo = {title:"CategoryList"};
    return (
      <div>
        <Container>
          <Row >
            <Navi />
          </Row>
          <Row>
            <Col xs="3">
              <CategoryList currentCategory={this.state.currentCategory} changeCategory={this.changeCategory} info={categoryInfo}/>
            </Col>
            <Col xs="9">
              <ProductList products={this.state.products} currentCategory={this.state.currentCategory} changeCategory={this.changeCategory} info={productInfo}/>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
};