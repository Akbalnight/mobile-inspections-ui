const initAuth = JSON.parse(localStorage.getItem("auth"));

export const auth = (state = (initAuth ? initAuth : {}), action) => {
	switch (action.type) {
		case 'SET_USER':
			localStorage.setItem("auth", JSON.stringify(action.payload));
			// sessionStorage.setItem('auth', JSON.stringify(action.payload));
			return action.payload;
		default:
			return state;
	}
};
