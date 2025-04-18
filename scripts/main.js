import { updateProfile } from "./handlers/naukriBot";

updateProfile()
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
