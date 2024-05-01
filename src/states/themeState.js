import Cookies from 'js-cookie';
import { newRidgeState } from 'react-ridge-state'

// create theme state
export const themeState = newRidgeState('cupcake',
    {
        onSet: (newState) => {
            try {
                Cookies.set("theme", JSON.stringify(newState));
            } catch (e) { }
        },
    })

function setInitialState() {
    try {
        const item = Cookies.get('theme');
        if (item) {
            const initialState = JSON.parse(item);
            themeState.set(initialState);
        }
    } catch (e) { }
}

// run function as application starts
setInitialState();
