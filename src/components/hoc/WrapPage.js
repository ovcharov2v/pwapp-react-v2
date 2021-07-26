import React, { useEffect } from 'react'
import {useDispatch} from 'react-redux'
import {clearMessage} from '../../store/slices/message'

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

export default WrapPage;