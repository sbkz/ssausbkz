import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';



import closeIcon from '../../../resources/icons/loginModal/closeIcon.svg';

import './LoginModal.scss';
import './LoginModal-media.scss';
import { closeLoginModal, login, logout, onFormChange, registration } from '../../../store/loginSlice';
import Spinner from '../../spinner/Spinner';
import { deleteItem } from '../../../store/basketSlice';

const LoginModal = () => {

    const {isModalActive, isAuth, user, messageError, authError, enterLoading, role} = useAppSelector(state => state.loginStates)
    const dispatch = useAppDispatch()
    

    //email
    const [emailValue, setEmailValue] = useState('');
    const [emailRequired, setEmailRequired] = useState(true);
    //password
    const [passwordValue, setPasswordValue] = useState('');
    const [passwordRequired, setPasswordRequired] = useState(true);
    //repeatpassword    
    const [repeatPasswordValue, setRepeatPasswordValue] = useState('');
    const [repeatPasswordRequired, setRepeatPasswordRequired] = useState(true)
    //login or registration
    const [isRegistartionForm, setRegistartionForm] = useState(false);


    //handlers
    const onRepeatPasswordChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setRepeatPasswordValue(e.target.value.trim())
        setRepeatPasswordRequired(true)
    }
    const onEmailChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setEmailValue(e.target.value.trim())
        setEmailRequired(true)
    }
    const onPasswordChange:React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setPasswordValue(e.target.value.trim());
        setPasswordRequired(true)
    }
    const onRegistartionForm = () => {
        setRegistartionForm(!isRegistartionForm)
        dispatch(onFormChange())
    }
    const onCloseModal = () => {
        dispatch(closeLoginModal())
    }
    const onLogout: React.MouseEventHandler<HTMLButtonElement> = () => {
        onCloseModal()
        dispatch(logout())
        dispatch(deleteItem('all'))
        setRegistartionForm(false)
        clearInputs()
    }
    const onSubmitClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        const authDto = {
            email: emailValue,
            password: passwordValue
        }
        if(validateInputs()){
            if(isRegistartionForm){
                if(passwordValue === repeatPasswordValue){
                    dispatch(registration(authDto))
                    clearInputs()
                }else {
                    setPasswordRequired(false)
                    setRepeatPasswordRequired(false)
                }
            }else{
                dispatch(login(authDto))
                clearInputs()
            }
        }
    }


    const validateInputs = () => {
        if(isRegistartionForm){
            if(passwordValue && emailValue){
                return true
            }else {
                (passwordValue === '')? setPasswordRequired(false) : setPasswordRequired(true);
                (emailValue === '')? setEmailRequired(false): setEmailRequired(true);
                return false
            }
        }else{
            if( passwordValue  && emailValue ){
                return true
            }else {
                (passwordValue === '')? setPasswordRequired(false) : setPasswordRequired(true);
                (emailValue === '')? setEmailRequired(false): setEmailRequired(true);
                return false
            }
        }
    }


    const clearInputs = () => {
            if(!authError){
                setEmailRequired(true)
                setPasswordRequired(true)
                setEmailValue('')
                setPasswordValue('')
                if(isRegistartionForm){
                    setRepeatPasswordRequired(true)
                    setRepeatPasswordValue('')
                }
                }
    }


    return(
        <div 
        className="loginModal__wrapper" 
        onClick={onCloseModal}
        style={{
            display: isModalActive? "flex": "none",
        }}
        >
            <div className="loginModal" onClick={(e) => e.stopPropagation()}>
                <img src={closeIcon} alt="closeModal" className="loginModal__close" onClick={onCloseModal}/>
                {
                     isAuth ?
                        <>
                            <div className='loginModal__greeting'>Привет,<br /> <span>{user.email}</span>!</div>
                            {role === 'admin'? <Link onClick={() => dispatch(closeLoginModal())} className='loginModal__adminLink' to='/adminpanel'>Админ панель</Link> : ''}
                            <div className='loginModal__logout_wrapper'>
                                <button className='loginModal__logout' onClick={onLogout}>Выйти</button>
                            </div>
                        </>
                    :
                    <>
                        {enterLoading ? 
                        <div style={{marginTop: '20px'}}><Spinner /> </div>
                        : 
                        <>
                            <div className="loginModal__title">{isRegistartionForm ? "Регистрация" : "Войти"}</div>
                            <form className='loginModal__form'>
                                {authError ? <div className='loginModal__validate-warning'>{messageError}</div> : ''}
                                <div className="loginModal__form_inputDiv">
                                    <input
                                        type="email"
                                        className={emailRequired ? "loginModal__form_input" : "loginModal__form_input loginModal__form_input-redBorder"}
                                        placeholder="Почта"
                                        value={emailValue}
                                        onChange={onEmailChange}
                                    />
                                </div>
                                <div className="loginModal__form_inputDiv">
                                    <input
                                        type="password"
                                        className={passwordRequired ? "loginModal__form_input" : "loginModal__form_input loginModal__form_input-redBorder"}
                                        placeholder="Пароль"
                                        value={passwordValue}
                                        onChange={onPasswordChange}
                                    />
                                </div>
                                {isRegistartionForm && 
                                <div className="loginModal__form_inputDiv">
                                    <input
                                        type="password"
                                        className={repeatPasswordRequired ? "loginModal__form_input" : "loginModal__form_input loginModal__form_input-redBorder"}
                                        placeholder="Повторите пароль"
                                        value={repeatPasswordValue}
                                        onChange={onRepeatPasswordChange}
                                    />
                                </div>
                                }
                            </form>
                            <button className='loginModal__form_button' onClick={onSubmitClick}>
                                {isRegistartionForm ? "Зарегистрироваться" : "Войти"}
                            </button>
                            <div className="loginModal__form_registration">
                                <div onClick={onRegistartionForm}>{isRegistartionForm ? "Войти" : "Регистрация"}</div>
                            </div>
                        </>
                        }
                    </>
                }
            
            </div> 
        </div>
    )
}
export default LoginModal