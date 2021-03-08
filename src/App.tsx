import React from 'react'
import Button, { ButtonSize, ButtonType } from './components/Button/button'
import Alert, { AlertType } from './components/Alert/alert'
function App() {
	return (
		<div className="App">
			<header className="App-header">
				<Button size={ButtonSize.Large} onClick={() => alert(2)}>
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
				></Alert>
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
