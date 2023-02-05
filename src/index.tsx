import ReactDOM from 'react-dom/client';
import App from './components/app/App';
import './styles/style.scss';
import { store } from './redux/store';
import { Provider } from "react-redux";


const rootElem = document.getElementById('root');

if (rootElem) {
  const root = ReactDOM.createRoot(rootElem)

  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
}

