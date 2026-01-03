import { reactive } from "vue";

export interface User {
  name: string;
  id: string;
  email: string;
  phone: string;
  photoUrl: string;
}

const storedUser = localStorage.getItem("user");

export const userStore = reactive({
  user: storedUser ? (JSON.parse(storedUser) as User) : null,

  setUser(userData: User) {
    this.user = userData;
    localStorage.setItem("user", JSON.stringify(userData));
  },

  logout() {
    this.user = null;
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
  },
});
