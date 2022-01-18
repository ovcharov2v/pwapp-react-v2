import React, { useEffect } from 'react'
import {useDispatch} from 'react-redux'
import {clearMessage} from '../../store/slices/message'
import PropTypes from "prop-types";

const WrapPage = (Component) => {  
  const PageWrapper = () => {    
    const dispatch = useDispatch()

    useEffect(()=>{
      dispatch(clearMessage())
    },[])

    return (
      <Component dispatch={dispatch}/>    
    );
  }

  return PageWrapper
}

WrapPage.protoTypes = {
  Component: PropTypes.element.isRequired
}

export default WrapPage;