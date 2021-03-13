import React from 'react'
import Button, { ButtonSize, ButtonType } from './components/Button/button'
import Alert, { AlertType } from './components/Alert/alert'
import Menu from './components/Menu/menu'
import SubMenu from './components/Menu/subMenu'
import MenuItem from './components/Menu/menuItem'
function App() {
	return (
		<div className="App">
			<header className="App-header">
				<Menu
					mode={'vertical'}
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
					<MenuItem>导航3</MenuItem>
				</Menu>
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
				</Button>
				<Alert title="this is alert!"></Alert>
				<Alert
					type={AlertType.Success}
					showClose={false}
					title="this is alert!"
					content="this is a long description"
				></Alert> */}
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
			</header>
		</div>
	)
}

export default App
