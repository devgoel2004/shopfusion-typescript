import {Button} from '@mui/material';
import './Header.css';
import React, {useState, useEffect} from 'react';
import image from '../../../assets/images/ecommerce.png'
import { Link,useNavigate } from 'react-router-dom';

type HeaderProps = {
    isAuthenticated: boolean,
}
export const Header = ({isAuthenticated}:HeaderProps)=>{
    const navigate = useNavigate();
    const[keyword, setKeyword] = useState<string>("");

    const searchSubmitHandler = (e: React.FormEvent<HTMLFormElement>):void=>{
        e.preventDefault();
        if(keyword.trim()){
            navigate(`/shopfusion/products/${keyword}`);
        }else{
            navigate(`/shopfusion/products`);
        }
    }
    const[isActive, setIsActive] = useState<boolean>(false);
    const toggleActiveClass = ():void=>{
        setIsActive(!isActive);
    }
    const removeActive = ():void=>{
        setIsActive(true);
    }
    useEffect(()=>{
        const handleResize = ()=>{
            if(window.innerWidth > 780){
                removeActive();
            }
        };
        window.addEventListener("resize", handleResize);
        handleResize();
        return ()=>{
            window.removeEventListener("resize",handleResize);
        }
    },[]);
    return <>
    <>
      <div className="Header-section-1">
        <div className="heading">
          <i
            onClick={toggleActiveClass}
            className="fa-solid fa-bars"
            id="bar-icon"></i>
          <Link to="/shopfusion/">
            <img src={image} alt="Shop" />
            <b>Shop</b>
            <span>Fusion</span>
          </Link>
        </div>
        <div className="searchbox">
          <form onSubmit={searchSubmitHandler}>
            <input
              type="text"
              placeholder="Search..."
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value)}
            />
            <button type="submit">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
        </div>
        <div className="list">
          <ul>
            <li>About Us</li>
            <li>Blog</li>
            <li>Contact Us</li>
            <li>Help & Support</li>
          </ul>
        </div>
        <div className="icons">
          <a href="https://www.instagram.com/__dev__goel__/">
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a href="https://www.instagram.com/__dev__goel__/">
            <i className="fa-brands fa-facebook"></i>
          </a>
          <a href="https://x.com/devgoel12072004">
            <i className="fa-brands fa-twitter"></i>
          </a>
        </div>
      </div>
      <div className={isActive ? `Header-section-2` : `Header-section-3`}>
        <div className="Categories">
          <span style={{ fontSize: "large" }}>
            <Link to="/shopfusion/products">
              <i className="fa-solid fa-list" style={{ padding: "4px" }}></i>
              Products
            </Link>
          </span>
          <span id="hide">
            <i className="fa-solid fa-arrow-down"></i>
            Rs
          </span>
          <span id="hide">
            <i className="fa-solid fa-arrow-down"></i>
            English
          </span>
        </div>
        <div className="Categories">
          <span>
            <Link
              to={
                isAuthenticated ? "/shopfusion/account" : "/shopfusion/login"
              }>
              <i className="fa-solid fa-user"></i>
              {isAuthenticated ? " Account" : " Sign In"}
            </Link>
          </span>
          <span>
            <i className="fa-solid fa-bag-shopping"></i> Favourite
          </span>
          <span>
            <Link to="/shopfusion/cart">
              <i className="fa-solid fa-bag-shopping"></i> Cart
            </Link>
          </span>
        </div>
      </div>
    </>
    </>
}