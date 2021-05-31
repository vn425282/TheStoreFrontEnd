import React from 'react';
import { Menu, Icon, Badge } from 'antd';
import { withRouter, Link } from 'react-router-dom';
import { useSelector } from "react-redux";

function RightMenu(props) {
  const user = useSelector(state => state.user);

  const logoutHandler = () => {
    window.localStorage.clear();
    props.history.push("/login");
  };

  if (user.userData && !user.userData.data) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          <a href="/login">Signin</a>
        </Menu.Item>
        <Menu.Item key="app">
          <Link to="/register">About</Link>
        </Menu.Item>
      </Menu>
    )
  } else {
    let upload = <Menu.Item key="upload"><a href="/product/upload">Upload</a></Menu.Item>;
    console.log(user.userData);
    if(user.userData && user.userData.data.role === 0) {
      upload = <></>;
    }
    return (
      <Menu mode={props.mode}>

        <Menu.Item key="history">
          <a href="/history">History</a>
        </Menu.Item>
        
        {upload}
        
        <Menu.Item key="cart" style={{ paddingBottom: 3 }}>
          <Badge count={user.userData && user.userData.data.cart.length}>
            <a href="/user/cart" style={{ marginRight: -22 , color:'#667777'}}>
              <Icon type="shopping-cart" style={{ fontSize: 30, marginBottom: 3 }} />
            </a>
          </Badge>
        </Menu.Item>

        <Menu.Item key="logout">
          <a onClick={logoutHandler}>Logout</a>
        </Menu.Item>
      </Menu>
    )
  }
}

export default withRouter(RightMenu);

