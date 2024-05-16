import  {create}  from "zustand";

const useAuthStore = create((set) => ({
	user: JSON.parse(localStorage.getItem("user-info")),  //initial_state
	login: (user) => set({ user }), //action 1
	logout: () => set({ user: null }),  // action 2
	setUser: (user) => set({ user }), // action 3
}));

export default useAuthStore;