import Cookies from 'js-cookie';
import { newRidgeState } from 'react-ridge-state'

// create user state
export const userState = newRidgeState({},
    {
        onSet: (newState) => {
            try {
                Cookies.set("user", JSON.stringify(newState));
            } catch (e) { }
        },
    })

function setInitialState() {
    try {
        const item = Cookies.get('user');
        if (item) {
            const initialState = JSON.parse(item);
            userState.set(initialState);
        }
    } catch (e) { }
}

// run function as application starts
setInitialState();
