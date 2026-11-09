import { openUserMenu } from "./utils.mjs";
import { checkAuth } from "./auth.svelte.ts";

checkAuth()

openUserMenu(".user__button");
