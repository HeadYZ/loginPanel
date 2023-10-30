import React, { useEffect, useReducer, useRef, useState } from 'react'

import Card from '../UI/Card/Card'
import Input from '../UI/Input/Input'
import classes from './Login.module.css'
import Button from '../UI/Button/Button'

const emailReducer = (state, action) => {
	if (action.type === 'USER_INPUT') {
		return { val: action.val, isValid: action.val.includes('@') }
	}
	if (action.type === 'INPUT_BLUR') {
		return { val: state.val, isValid: state.val.includes('@') }
	}

	return { val: '', isValid: false }
}

const passwordReducer = (state, action) => {
	if (action.type === 'USER_INPUT') {
		return { val: action.value, isValid: action.value.trim().length > 6 }
	}
	if (action.type === 'INPUT_BLUR') {
		return { val: state.val, isValid: state.val.trim().length > 6 }
	}

	return { val: '', isValid: false }
}

const Login = props => {
	const [formIsValid, setFormIsValid] = useState(false)

	const [emailState, dispatchEmail] = useReducer(emailReducer, { val: '', isValid: null })

	const [passwordState, dispatchPassword] = useReducer(passwordReducer, { val: '', isValid: null })

	const emailInputRef = useRef()
	const passwordInputRef = useRef()

	useEffect(() => {
		const identifier = setTimeout(() => {
			setFormIsValid(emailState.isValid && passwordState.isValid)
		}, 500)

		return () => {
			clearTimeout(identifier)
		}
	}, [emailState.isValid, passwordState.isValid])

	const emailChangeHandler = event => {
		dispatchEmail({ type: 'USER_INPUT', val: event.target.value })
	}

	const passwordChangeHandler = event => {
		dispatchPassword({ type: 'USER_INPUT', value: event.target.value })
	}

	const validateEmailHandler = () => {
		dispatchEmail({ type: 'INPUT_BLUR' })
	}

	const validatePasswordHandler = () => {
		dispatchPassword({ type: 'INPUT_BLUR' })
	}

	const submitHandler = event => {
		emailInputRef.current.focus()
		event.preventDefault()
		if (formIsValid) {
			props.onLogin(emailState.val, passwordState.val)
		} else if (!emailState.isValid) {
			emailInputRef.current.focus()
		} else {
			passwordInputRef.current.focus()
		}
	}
	return (
		<Card className={classes.login}>
			<form onSubmit={submitHandler}>
				<Input
					ref={emailInputRef}
					type='email'
					id='email'
					label={'E-Mail'}
					value={emailState.val}
					onChange={emailChangeHandler}
					onBlur={validateEmailHandler}
				/>
				<Input
					ref={passwordInputRef}
					type='password'
					id='password'
					label={'Password'}
					value={passwordState.val}
					onChange={passwordChangeHandler}
					onBlur={validatePasswordHandler}
				/>
				<div className={classes.actions}>
					<Button type='submit' className={classes.btn}>
						Login
					</Button>
				</div>
			</form>
		</Card>
	)
}

export default Login
