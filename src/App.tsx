import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
// import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons'
// import { faCoffee } from '@fortawesome/free-solid-svg-icons'
// import Button, { ButtonSize, ButtonType } from './components/Button/button'
import Alert from './components/Alert/alert'
import Menu from './components/Menu/menu'
import SubMenu from './components/Menu/subMenu'
import MenuItem from './components/Menu/menuItem'
import Tabs from './components/Tab/tabs'
import TabItem from './components/Tab/tabItem'
import Icon from './components/Icon/icon'
import Transition from './components/Transition/transition'
import { Button } from './components/Button/button'

library.add(fas) // fas相当于solid风格下的所有图标都引入了
// library.add(faCheckSquare, faCoffee) //引入具体的
function App() {
	// const [show, setShow] = useState(false)
	const [title, setTitle] = useState('')
	const postData = {
		title: 'title1',
		name: '张三'
	}
	useEffect(() => {
		// axios
		// 	.get('https://jsonplaceholder.typicode.com/posts/1', {
		// 		headers: {
		// 			'X-Requested-With': 'XMLHttpRequest'
		// 		},
		// 		responseType: 'json'
		// 	})
		// 	.then((result) => {
		// 		console.info(result)
		// 		setTitle(result.data.title)
		// 	})
		axios
			.post('https://jsonplaceholder.typicode.com/posts', postData, {
				headers: {
					'X-Requested-With': 'XMLHttpRequest'
				},
				responseType: 'json'
			})
			.then((result) => {
				console.info(result)
				setTitle(result.data.title)
			})
	})

	return (
		<div className="App">
			<header className="App-header">
				<h1>{title}</h1>
				{/* <FontAwesomeIcon icon={faCoffee} size={'10x'} /> */}
				{/* <Icon icon="arrow-down" theme="primary" size={'sm'} />
				<Menu
					// mode={'vertical'}
					defaultIndex={'0'}
					defaultOpenSubMenus={['2']}
					onSelect={(index) => alert(index)}
				>
					<MenuItem>导航1</MenuItem>
					<MenuItem>导航2</MenuItem>
					<SubMenu title="下拉导航">
						<MenuItem>下拉一</MenuItem>
						<MenuItem>下拉二</MenuItem>
					</SubMenu>
					<MenuItem disabled>导航3</MenuItem>
				</Menu>
				<Tabs
					defaultIndex={0}
					// type="card"
					mode="vertical"
					onSelect={(index) => alert(index)}
				>
					<TabItem
						label={
							<span>
								<MenuItem>导航1</MenuItem>
							</span>
						}
					>
						第一个tabItem
					</TabItem>
					<TabItem label="card2">第二个tabItem</TabItem>
					<TabItem label="disabled" disabled>
						不允许操作的tabItem
					</TabItem>
				</Tabs> */}
				{/* <Button size={ButtonSize.Large} onClick={() => alert(2)}>
					Hello
				</Button>
				<Button disabled size={ButtonSize.Small} className="custom">
					Hello
				</Button>
				<Button disabled btnType={ButtonType.Danger}>
					Hello
				</Button>
				<Button btnType={ButtonType.Primary}>Hello</Button>
				<Button disabled btnType={ButtonType.Link}>
					Hello
				</Button> */}
				{/* <Alert title="this is alert!"></Alert>
				<Alert
					type="success"
					showClose={false}
					title="this is alert!"
					content="this is a long description"
				></Alert>
				<Button
					btnType="primary"
					size="lg"
					onClick={() => {
						setShow(!show)
					}}
				>
					Toggle
				</Button>
				<Transition in={show} animation="zoom-in-top" timeout={3000}>
					<div>
						<p>
							Edit <code>src/App.tsx</code> and save to reload.
						</p>
						<a
							className="App-link"
							href="https://reactjs.org"
							target="_blank"
							rel="noopener noreferrer"
						>
							Learn React
						</a>
					</div>
				</Transition>
				<Transition
					in={show}
					animation="zoom-in-top"
					timeout={3000}
					wrapper={true}
				>
					<Button btnType="primary" size="lg">
						a large button
					</Button>
				</Transition> */}
			</header>
		</div>
	)
}

export default App
