const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			}, 
			getCountries: async () => {
				let allCountries = [];
				try{ 
					const resp = await fetch(
						process.env.BACKEND_URL + "api/countries")
					const data = await resp.json()
 					allCountries = data; 
 					console.log(allCountries)
					return allCountries;   
				} catch(error) {
					console.log(error)
				}
			},
			getStates: async (countryId) => {
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}api/states?country_id=${countryId}`, {
						method: 'GET',
						headers: {
							'Content-Type': 'application/json'
						}
					});
					const data = await resp.json();
					console.log(data);
					return data;
				} catch(error) {
					console.log(error);
				}
			},
			getRoles: async () => {
				let allRoles = [];
				try{ 
					const resp = await fetch(
						process.env.BACKEND_URL + "api/roles")
					const data = await resp.json()
 					allRoles = data; 
 					console.log(allRoles)
					return allRoles;   
				} catch(error) {
					console.log(error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
