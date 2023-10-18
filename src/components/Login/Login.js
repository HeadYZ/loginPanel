import React, { useEffect, useReducer, useState } from 'react'

import Card from '../UI/Card/Card'
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

	useEffect(() => {
		console.log('juz nie dziala')
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
		event.preventDefault()
		if (!formIsValid) return
		props.onLogin(emailState.val, passwordState.val)
	}

	return (
		<Card className={classes.login}>
			<form onSubmit={submitHandler}>
				<div className={`${classes.control} ${emailState.isValid === false ? classes.invalid : ''}`}>
					<label htmlFor='email'>E-Mail</label>
					<input
						type='email'
						id='email'
						value={emailState.val}
						onChange={emailChangeHandler}
						onBlur={validateEmailHandler}
					/>
				</div>
				<div className={`${classes.control} ${passwordState.isValid === false ? classes.invalid : ''}`}>
					<label htmlFor='password'>Password</label>
					<input
						type='password'
						id='password'
						value={passwordState.val}
						onChange={passwordChangeHandler}
						onBlur={validatePasswordHandler}
					/>
				</div>
				<div className={classes.actions}>
					<Button type='submit' className={classes.btn} disabled={!formIsValid}>
						Login
					</Button>
				</div>
			</form>
		</Card>
	)
}

export default Login
